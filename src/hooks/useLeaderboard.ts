import { useState, useEffect, useCallback, useRef } from 'react';
import { Connection } from '@solana/web3.js';
import { SolanaConnectionManager } from '../utils/solanaConnection';
import { getTopDepositors } from '../services/leaderboardService';

interface Depositor {
  address: string;
  amount: number;
  lastDeposit: number;
}

export function useLeaderboard(limit: number = 3) {
  const [topDepositors, setTopDepositors] = useState<Depositor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef<boolean>(true);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const retryCountRef = useRef<number>(0);
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 2000;
  const UPDATE_INTERVAL = 30000;

  const fetchLeaderboard = useCallback(async (isRetry: boolean = false) => {
    if (!mountedRef.current) return;

    try {
      const connectionManager = SolanaConnectionManager.getInstance();
      
      const depositors = await connectionManager.executeWithRetry(async (connection: Connection) => {
        return getTopDepositors(connection, limit);
      });
      
      if (mountedRef.current) {
        setTopDepositors(depositors);
        setError(null);
        retryCountRef.current = 0;
      }
    } catch (err: any) {
      console.error('Leaderboard fetch error:', err);
      
      if (mountedRef.current) {
        if (!isRetry && retryCountRef.current < MAX_RETRIES) {
          retryCountRef.current++;
          timeoutRef.current = setTimeout(
            () => fetchLeaderboard(true),
            RETRY_DELAY * Math.pow(2, retryCountRef.current)
          );
          return;
        }
        setError('Failed to fetch leaderboard');
      }
    } finally {
      if (mountedRef.current) {
        setIsLoading(false);
        
        // Schedule next update
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          fetchLeaderboard();
        }, UPDATE_INTERVAL);
      }
    }
  }, [limit]);

  useEffect(() => {
    mountedRef.current = true;
    fetchLeaderboard();

    return () => {
      mountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [fetchLeaderboard]);

  return { topDepositors, isLoading, error };
}