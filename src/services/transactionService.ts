import { Connection, PublicKey } from '@solana/web3.js';
import { SOLANA_CONSTANTS } from '../utils/constants';

interface TokenTransfer {
  amount: number;
  timestamp: number;
  signature: string;
  type: 'deposit' | 'withdrawal';
}

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
      
      // If no transaction found, wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
    } catch (error) {
      if (attempt === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
    }
  }
  return null;
}

export async function getTransactionHistory(
  connection: Connection,
  walletAddress: string,
  limit = 100
): Promise<TokenTransfer[]> {
  try {
    const walletPubkey = new PublicKey(walletAddress);
    const signatures = await connection.getSignaturesForAddress(
      walletPubkey,
      { limit },
      'confirmed'
    );

    const transfers: TokenTransfer[] = [];
    const processedTxs = new Set<string>();

    // Process transactions in smaller batches
    const batchSize = 10;
    for (let i = 0; i < signatures.length; i += batchSize) {
      const batch = signatures.slice(i, i + batchSize);
      
      const transactions = await Promise.allSettled(
        batch.map(({ signature }) => fetchTransactionWithRetry(connection, signature))
      );

      for (let j = 0; j < transactions.length; j++) {
        const result = transactions[j];
        if (result.status === 'rejected' || !result.value) continue;

        const tx = result.value;
        if (!tx?.meta || processedTxs.has(tx.signature)) continue;
        processedTxs.add(tx.signature);

        const postBalances = tx.meta.postTokenBalances || [];
        const preBalances = tx.meta.preTokenBalances || [];

        for (let k = 0; k < postBalances.length; k++) {
          const post = postBalances[k];
          const pre = preBalances.find(b => b.accountIndex === post.accountIndex);

          if (post.mint === SOLANA_CONSTANTS.USDT_MINT.toString()) {
            const preAmount = pre?.uiTokenAmount.uiAmount || 0;
            const postAmount = post.uiTokenAmount.uiAmount || 0;
            const difference = postAmount - preAmount;

            if (difference !== 0) {
              transfers.push({
                amount: Math.abs(difference),
                timestamp: tx.blockTime ? tx.blockTime * 1000 : Date.now(),
                signature: tx.signature,
                type: difference > 0 ? 'deposit' : 'withdrawal'
              });
            }
          }
        }
      }

      // Add delay between batches to respect rate limits
      if (i + batchSize < signatures.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    return transfers.sort((a, b) => b.timestamp - a.timestamp);
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    return [];
  }
}

export async function calculateBalanceFromTransactions(
  connection: Connection,
  walletAddress: string
): Promise<number> {
  try {
    const transfers = await getTransactionHistory(connection, walletAddress);
    
    return transfers.reduce((balance, transfer) => {
      return balance + (transfer.type === 'deposit' ? transfer.amount : -transfer.amount);
    }, 0);
  } catch (error) {
    console.error('Error calculating balance from transactions:', error);
    return 0;
  }
}