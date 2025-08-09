import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useMetaMask } from '@/hooks/use-metamask';
import { Wallet, ExternalLink, AlertCircle } from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { connect, isConnecting, error, isMetaMaskInstalled } = useMetaMask();

  const handleConnect = async () => {
    await connect();
    if (!error) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-effect border-neon-cyan/20 max-w-md">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto">
            <Wallet className="text-6xl text-neon-cyan animate-pulse mx-auto mb-4" size={64} />
          </div>
          <DialogTitle className="font-orbitron font-bold text-2xl text-neon-cyan">
            Connect MetaMask
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <p className="text-gray-300 text-center">
            Connect your MetaMask wallet to access the neural network and participate in the decentralized AI ecosystem.
          </p>
          
          {error && (
            <div className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <AlertCircle className="text-red-400" size={20} />
              <span className="text-red-400 text-sm">{error}</span>
            </div>
          )}
          
          <div className="space-y-4">
            {isMetaMaskInstalled ? (
              <Button
                onClick={handleConnect}
                disabled={isConnecting}
                className="w-full bg-gradient-to-r from-neon-cyan to-neon-purple hover:shadow-lg hover:shadow-neon-cyan/30 transition-all duration-300 font-orbitron"
                data-testid="button-connect-metamask"
              >
                <Wallet className="mr-2" size={20} />
                {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
              </Button>
            ) : (
              <Button
                asChild
                className="w-full bg-gradient-to-r from-neon-cyan to-neon-purple hover:shadow-lg hover:shadow-neon-cyan/30 transition-all duration-300 font-orbitron"
                data-testid="button-install-metamask"
              >
                <a href="https://metamask.io" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2" size={20} />
                  Install MetaMask
                </a>
              </Button>
            )}
            
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full glass-effect border-gray-600 hover:bg-white/10 transition-all duration-300 font-orbitron"
              data-testid="button-cancel-modal"
            >
              Cancel
            </Button>
          </div>
          
          {!isMetaMaskInstalled && (
            <p className="text-sm text-gray-500 text-center">
              Don't have MetaMask?{' '}
              <a 
                href="https://metamask.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neon-cyan hover:underline"
                data-testid="link-metamask-download"
              >
                Download here
              </a>
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
