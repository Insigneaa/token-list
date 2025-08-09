import { Box, Wallet, Network, Smartphone, Shield, Rocket } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Box,
      title: '3D Neural Visualization',
      description: 'Immersive 3D brain models with real-time neural pathway visualization and interactive particle systems.',
      color: 'neon-cyan',
      hoverColor: 'hover:border-neon-cyan',
    },
    {
      icon: Wallet,
      title: 'MetaMask Integration',
      description: 'Seamless Web3 wallet connection with secure blockchain transactions and NFT minting capabilities.',
      color: 'neon-purple',
      hoverColor: 'hover:border-neon-purple',
    },
    {
      icon: Network,
      title: 'AI Neural Networks',
      description: 'Advanced machine learning algorithms with distributed processing across decentralized nodes.',
      color: 'neon-green',
      hoverColor: 'hover:border-neon-green',
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Responsive 3D experience with touch controls and mobile-optimized neural network interactions.',
      color: 'neural-gold',
      hoverColor: 'hover:border-neural-gold',
    },
    {
      icon: Shield,
      title: 'Secure Protocol',
      description: 'Military-grade encryption with decentralized security protocols and smart contract auditing.',
      color: 'neon-pink',
      hoverColor: 'hover:border-neon-pink',
    },
    {
      icon: Rocket,
      title: 'Lightning Fast',
      description: 'Optimized WebGL rendering with GPU acceleration for smooth 60fps neural network animations.',
      color: 'neon-cyan',
      hoverColor: 'hover:border-neon-cyan',
    },
  ];

  const getGradientClass = (index: number) => {
    const gradients = [
      'from-neon-cyan to-neon-purple',
      'from-neon-purple to-neon-pink',
      'from-neon-green to-neural-gold',
      'from-neural-gold to-neon-cyan',
      'from-neon-pink to-neon-purple',
      'from-neon-cyan to-neon-green',
    ];
    return gradients[index % gradients.length];
  };

  return (
    <section id="features" className="py-20 relative" data-testid="features-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-orbitron font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            <span className="text-neon-purple neon-text">Neural</span>{' '}
            <span className="text-neon-cyan neon-text">Features</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Cutting-edge technology meets decentralized intelligence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`glass-effect rounded-2xl p-8 group ${feature.hoverColor} transition-all duration-300 transform hover:scale-105 hover-lift animate-slide-up hologram-effect`}
              style={{ animationDelay: `${index * 0.1}s` }}
              data-testid={`feature-card-${index}`}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${getGradientClass(index)} rounded-2xl flex items-center justify-center mb-6 group-hover:animate-pulse`}>
                <feature.icon className="text-2xl text-white" size={32} />
              </div>
              
              <h3 className={`font-orbitron font-bold text-xl mb-4 text-${feature.color}`}>
                {feature.title}
              </h3>
              
              <p className="text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
