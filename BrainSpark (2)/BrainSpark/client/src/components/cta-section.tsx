import { Button } from '@/components/ui/button';
import { Brain, MessageCircle } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-20 relative" data-testid="cta-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-orbitron font-bold text-3xl md:text-5xl mb-6">
          <span className="text-neon-purple neon-text">Join the</span><br />
          <span className="text-neon-cyan neon-text">Neural Revolution</span>
        </h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Be part of the future of decentralized AI. Connect your wallet and start exploring the neural network today.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-green px-12 py-4 rounded-full font-orbitron font-bold text-lg hover:shadow-2xl hover:shadow-neon-cyan/30 transition-all duration-300 transform hover:scale-110 animate-glow-pulse"
            data-testid="button-launch-neural-interface"
          >
            <Brain className="mr-3" size={20} />
            Launch Neural Interface
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="glass-effect px-12 py-4 rounded-full font-orbitron font-bold text-lg border-2 border-neon-green hover:bg-neon-green/10 transition-all duration-300"
            data-testid="button-join-community"
          >
            <MessageCircle className="mr-3" size={20} />
            Join Community
          </Button>
        </div>
      </div>
    </section>
  );
}
