import { Button } from '@/components/ui/button';
import { ThreeBrain } from './three-brain';
import { NeuralParticles } from './neural-particles';
import { Github, Zap, Brain, Wallet, Menu, X, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useMetaMask } from '@/hooks/use-metamask';

export function HeroSection() {
  const [stats, setStats] = useState({
    neurons: 10847,
    connections: 2300000,
    nodes: 156,
  });

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        neurons: prev.neurons + Math.floor(Math.random() * 10),
        connections: prev.connections + Math.floor(Math.random() * 1000),
        nodes: prev.nodes + Math.floor(Math.random() * 2),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  const [isNeuralBoostActive, setIsNeuralBoostActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { account, connect, disconnect, isConnecting } = useMetaMask();

  const handleNeuralBoost = () => {
    setIsNeuralBoostActive(true);
    setTimeout(() => setIsNeuralBoostActive(false), 3000);
  };

  const handleWalletClick = () => {
    if (account) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Integrated Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 glass-effect border-b border-neon-cyan/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Brain className="text-neon-cyan animate-glow-pulse" size={32} />
              <span className="font-orbitron font-bold text-2xl neon-text bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
                NEUROX
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-neon-cyan transition-colors font-orbitron">Features</a>
              <a href="#analytics" className="text-gray-300 hover:text-neon-purple transition-colors font-orbitron">Analytics</a>
              <a href="#dashboard" className="text-gray-300 hover:text-neon-green transition-colors font-orbitron">Dashboard</a>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Wallet Button */}
              <Button
                onClick={handleWalletClick}
                disabled={isConnecting}
                className={`font-semibold transition-all duration-300 font-orbitron hover-lift interactive-glow ${
                  account 
                    ? 'bg-green-600 hover:bg-green-700 animate-glow-pulse animate-bounce-in' 
                    : 'bg-gradient-to-r from-neon-purple to-neon-cyan hover:shadow-lg hover:shadow-neon-cyan/50 animate-glow-pulse'
                }`}
                data-testid="button-connect-wallet"
              >
                <Wallet className="mr-2" size={20} />
                {isConnecting 
                  ? 'Connecting...' 
                  : account 
                    ? `${account.address.slice(0, 6)}...${account.address.slice(-4)}`
                    : 'Connect Wallet'
                }
              </Button>

              {/* Mobile Menu Button */}
              <Button
                className="md:hidden glass-effect border-neon-cyan/20"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 space-y-4 animate-slide-up">
              <a href="#features" className="block text-gray-300 hover:text-neon-cyan transition-colors font-orbitron">Features</a>
              <a href="#analytics" className="block text-gray-300 hover:text-neon-purple transition-colors font-orbitron">Analytics</a>
              <a href="#dashboard" className="block text-gray-300 hover:text-neon-green transition-colors font-orbitron">Dashboard</a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Content with padding for navigation */}
      <div className="flex-1 flex items-center justify-center pt-20">
        {/* Interactive Neural Particles Background */}
        <NeuralParticles 
          className="opacity-30" 
          particleCount={isNeuralBoostActive ? 100 : 50}
          speed={isNeuralBoostActive ? 2 : 1}
        />
        
        {/* Static Animated Background Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`particle ${isNeuralBoostActive ? 'animate-pulse' : ''}`}
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 20}%`,
                animationDelay: `${i}s`,
              }}
            />
          ))}
        </div>

      {/* Neural Connection Lines */}
      <div className="neural-connection" style={{ top: '25%', left: '15%', width: '200px', transform: 'rotate(45deg)' }} />
      <div className="neural-connection" style={{ top: '75%', right: '15%', width: '150px', transform: 'rotate(-30deg)' }} />
      <div className="neural-connection" style={{ top: '50%', left: '5%', width: '180px', transform: 'rotate(15deg)' }} />

        {/* Main Content */}
        <div className="relative w-full max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 z-10 relative">
            <div className="space-y-4">
              <h1 className="font-orbitron font-black text-4xl md:text-6xl lg:text-7xl leading-tight">
                <span className="text-neon-cyan neon-text">NEURAL</span><br />
                <span className="text-neon-purple neon-text">EVOLUTION</span><br />
                <span className="text-neon-green neon-text">3.0</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-lg">
                Experience the future of decentralized AI with immersive 3D neural networks powered by blockchain technology.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-neon-cyan to-neon-purple px-8 py-4 rounded-full font-orbitron font-bold text-lg hover:shadow-2xl hover:shadow-neon-cyan/30 transition-all duration-300 transform hover:scale-105 animate-glow-pulse"
                data-testid="button-enter-neural-space"
              >
                Enter Neural Space
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="glass-effect px-8 py-4 rounded-full font-orbitron font-bold text-lg border-neon-green hover:bg-neon-green/10 transition-all duration-300"
                data-testid="button-view-code"
              >
                <Github className="mr-2" size={20} />
                View Code
              </Button>
              <Button 
                onClick={handleNeuralBoost}
                size="lg"
                className={`px-8 py-4 rounded-full font-orbitron font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                  isNeuralBoostActive 
                    ? 'bg-neural-gold animate-pulse' 
                    : 'bg-gradient-to-r from-neural-gold to-neon-pink hover:shadow-lg hover:shadow-neural-gold/30'
                }`}
                data-testid="button-neural-boost"
              >
                <Zap className="mr-2" size={20} />
                Neural Boost
              </Button>
              
              <Button
                onClick={() => {
                  if (!account) {
                    alert('Conecte sua carteira MetaMask primeiro!');
                    return;
                  }
                  // Open Uniswap with NEUROX token parameters
                  const uniswapUrl = 'https://app.uniswap.org/#/swap?outputCurrency=ETH&inputCurrency=0xA0b86a33E6441c8ba3cc8bb83db4D4c72f1b9f83&chain=mainnet';
                  window.open(uniswapUrl, '_blank', 'noopener,noreferrer');
                }}
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-8 py-4 rounded-full font-orbitron font-bold text-lg transition-all duration-300 transform hover:scale-105"
                data-testid="button-buy-neurox"
              >
                <ShoppingCart className="mr-2" size={20} />
                Comprar NEUROX
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="font-orbitron font-bold text-2xl text-neon-cyan neon-text" data-testid="stat-neurons">
                  {formatNumber(stats.neurons)}
                </div>
                <div className="text-sm text-gray-400">Active Neurons</div>
              </div>
              <div className="text-center">
                <div className="font-orbitron font-bold text-2xl text-neon-purple neon-text" data-testid="stat-connections">
                  {formatNumber(stats.connections)}
                </div>
                <div className="text-sm text-gray-400">Connections</div>
              </div>
              <div className="text-center">
                <div className="font-orbitron font-bold text-2xl text-neon-green neon-text" data-testid="stat-nodes">
                  {stats.nodes}
                </div>
                <div className="text-sm text-gray-400">Network Nodes</div>
              </div>
            </div>
          </div>

            {/* 3D Brain Container */}
            <div className="relative">
              <ThreeBrain className="w-full h-96 md:h-[500px] lg:h-[600px] animate-float" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
