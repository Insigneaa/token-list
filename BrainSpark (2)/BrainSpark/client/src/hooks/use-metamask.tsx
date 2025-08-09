import { useState, useCallback, useEffect } from 'react';

interface MetaMaskAccount {
  address: string;
  balance?: string;
}

interface UseMetaMaskReturn {
  account: MetaMaskAccount | null;
  isConnecting: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  isMetaMaskInstalled: boolean;
}

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (eventName: string, handler: (accounts: string[]) => void) => void;
      removeListener: (eventName: string, handler: (accounts: string[]) => void) => void;
      isMetaMask?: boolean;
    };
  }
}

export function useMetaMask(): UseMetaMaskReturn {
  const [account, setAccount] = useState<MetaMaskAccount | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isMetaMaskInstalled = typeof window !== 'undefined' && 
    typeof window.ethereum !== 'undefined' && 
    window.ethereum.isMetaMask === true;

  const connect = useCallback(async () => {
    if (!isMetaMaskInstalled) {
      setError('MetaMask is not installed. Please install MetaMask to continue.');
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const accounts = await window.ethereum!.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        const address = accounts[0];
        
        // Get balance
        const balance = await window.ethereum!.request({
          method: 'eth_getBalance',
          params: [address, 'latest'],
        });

        const balanceInEth = (parseInt(balance, 16) / 1e18).toFixed(4);
        
        setAccount({
          address,
          balance: balanceInEth,
        });
      }
    } catch (err: any) {
      setError(err.message || 'Failed to connect to MetaMask');
      console.error('MetaMask connection error:', err);
    } finally {
      setIsConnecting(false);
    }
  }, [isMetaMaskInstalled]);

  const disconnect = useCallback(() => {
    setAccount(null);
    setError(null);
  }, []);

  // Handle account changes
  useEffect(() => {
    if (!isMetaMaskInstalled) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        setAccount(null);
      } else if (account && accounts[0] !== account.address) {
        // Account changed, reconnect
        setAccount({ address: accounts[0] });
      }
    };

    window.ethereum!.on('accountsChanged', handleAccountsChanged);

    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, [isMetaMaskInstalled, account]);

  return {
    account,
    isConnecting,
    error,
    connect,
    disconnect,
    isMetaMaskInstalled,
  };
}
