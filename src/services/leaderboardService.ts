import { Connection, PublicKey } from '@solana/web3.js';
import { SOLANA_CONSTANTS } from '../utils/constants';

interface Depositor {
  address: string;
  amount: number;
  lastDeposit: number;
}

interface CacheEntry {
  depositors: Depositor[];
  timestamp: number;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
let cache: CacheEntry | null = null;

async function fetchTransactionWithRetry(
  connection: Connection,
  signature: string,
  retries = 3
): Promise<any> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const tx = await connection.getParsedTransaction(signature, {
        maxSupportedTransactionVersion: 0,
        commitment: 'confirmed'
      });
      
      if (tx) return tx;
      
      // If no transaction found and not last attempt, wait before retry
      if (attempt < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
      }
    } catch (error) {
      // If it's not the last attempt, wait and retry
      if (attempt < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
        continue;
      }
      // On last attempt, log error but don't throw
      console.warn(`Failed to fetch transaction ${signature} after ${retries} attempts`);
      return null;
    }
  }
  return null;
}

export async function getTopDepositors(
  connection: Connection,
  limit: number = 3
): Promise<Depositor[]> {
  try {
    // Check cache first
    if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
      return cache.depositors.slice(0, limit);
    }

    const signatures = await connection.getSignaturesForAddress(
      SOLANA_CONSTANTS.INCUBATOR_WALLET,
      { limit: 1000 },
      'confirmed'
    );

    const depositors = new Map<string, Depositor>();

    // Process transactions in smaller batches to avoid rate limits
    const batchSize = 10;
    for (let i = 0; i < signatures.length; i += batchSize) {
      const batch = signatures.slice(i, i + batchSize);
      
      const transactions = await Promise.all(
        batch.map(({ signature, blockTime }) => 
          fetchTransactionWithRetry(connection, signature)
            .then(tx => ({ tx, blockTime }))
        )
      );

      for (const txData of transactions) {
        if (!txData?.tx?.meta) continue;

        const { meta, transaction } = txData.tx;
        const preBalances = meta.preTokenBalances || [];
        const postBalances = meta.postTokenBalances || [];

        // Find deposits by checking incubator balance changes
        const preIncubatorBalance = preBalances.find(
          b => b.owner === SOLANA_CONSTANTS.INCUBATOR_WALLET.toString() &&
               b.mint === SOLANA_CONSTANTS.USDT_MINT.toString()
        )?.uiTokenAmount.uiAmount || 0;

        const postIncubatorBalance = postBalances.find(
          b => b.owner === SOLANA_CONSTANTS.INCUBATOR_WALLET.toString() &&
               b.mint === SOLANA_CONSTANTS.USDT_MINT.toString()
        )?.uiTokenAmount.uiAmount || 0;

        // If there was a deposit
        if (postIncubatorBalance > preIncubatorBalance) {
          // Find the sender's address (first signer that's not the incubator)
          const senderAddress = transaction.message.accountKeys.find(key => 
            key.pubkey.toString() !== SOLANA_CONSTANTS.INCUBATOR_WALLET.toString() &&
            key.signer
          )?.pubkey.toString();

          if (senderAddress) {
            const depositAmount = postIncubatorBalance - preIncubatorBalance;
            const currentDepositor = depositors.get(senderAddress) || {
              address: senderAddress,
              amount: 0,
              lastDeposit: 0
            };

            depositors.set(senderAddress, {
              ...currentDepositor,
              amount: currentDepositor.amount + depositAmount,
              lastDeposit: Math.max(currentDepositor.lastDeposit, txData.blockTime || 0)
            });
          }
        }
      }

      // Add delay between batches to respect rate limits
      if (i + batchSize < signatures.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    // Sort by amount and get top depositors
    const sortedDepositors = Array.from(depositors.values())
      .sort((a, b) => b.amount - a.amount || b.lastDeposit - a.lastDeposit)
      .slice(0, limit);

    // Update cache
    cache = {
      depositors: sortedDepositors,
      timestamp: Date.now()
    };

    return sortedDepositors;
  } catch (error) {
    console.error('Error fetching top depositors:', error);
    // Return cached data if available, even if expired
    if (cache) {
      return cache.depositors.slice(0, limit);
    }
    // If no cache available, return empty array instead of throwing
    return [];
  }
}