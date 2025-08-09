import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { WalletModal } from './wallet-modal';
import { useMetaMask } from '@/hooks/use-metamask';
import { Brain, Menu, X, Check, Wallet } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export function Navigation() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { account, disconnect } = useMetaMask();
  const isMobile = useIsMobile();

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleWalletClick = () => {
    if (account) {
      disconnect();
    } else {
      setIsWalletModalOpen(true);
    }
  };

  const navLinks = [
    { href: "#", label: "Neural Network" },
    { href: "#", label: "Technology" },
    { href: "#", label: "Community" },
    { href: "#", label: "Docs" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Brain className="text-neon-cyan text-2xl" />
              <h1 className="font-orbitron font-bold text-xl neon-text text-neon-cyan">
                NEUROX
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            {!isMobile && (
              <div className="hidden md:flex items-center space-x-8">
                {navLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.href} 
                    className="hover:text-neon-cyan transition-colors"
                    data-testid={`nav-link-${link.label.toLowerCase().replace(' ', '-')}`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
            
            <div className="flex items-center space-x-4">
              {/* Wallet Button */}
              <Button
                onClick={handleWalletClick}
                className={`font-semibold transition-all duration-300 font-orbitron hover-lift interactive-glow ${
                  account 
                    ? 'bg-green-600 hover:bg-green-700 animate-glow-pulse animate-bounce-in' 
                    : 'bg-gradient-to-r from-neon-purple to-neon-cyan hover:shadow-lg hover:shadow-neon-cyan/50 animate-glow-pulse'
                }`}
                data-testid="button-connect-wallet"
              >
                {account ? (
                  <>
                    <Check className="mr-2" size={16} />
                    {truncateAddress(account.address)}
                  </>
                ) : (
                  <>
                    <Wallet className="mr-2" size={16} />
                    Connect MetaMask
                  </>
                )}
              </Button>

              {/* Mobile Menu Button */}
              {isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden text-neon-cyan"
                  data-testid="button-mobile-menu"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobile && isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-700/50">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.href} 
                    className="hover:text-neon-cyan transition-colors px-2 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-testid={`mobile-nav-link-${link.label.toLowerCase().replace(' ', '-')}`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      <WalletModal 
        isOpen={isWalletModalOpen} 
        onClose={() => setIsWalletModalOpen(false)} 
      />
    </>
  );
}
