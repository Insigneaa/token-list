import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Settings, 
  Zap, 
  Activity, 
  Database,
  Wifi,
  Plus,
  X
} from 'lucide-react';

interface FloatingActionButtonProps {
  onAction?: (action: string) => void;
}

export function FloatingActionButton({ onAction }: FloatingActionButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const actions = [
    { icon: Brain, label: 'Neural Boost', action: 'neural-boost', color: 'bg-neon-cyan hover:bg-neon-cyan/80' },
    { icon: Activity, label: 'Analytics', action: 'analytics', color: 'bg-neon-purple hover:bg-neon-purple/80' },
    { icon: Database, label: 'Data Sync', action: 'data-sync', color: 'bg-neon-green hover:bg-neon-green/80' },
    { icon: Wifi, label: 'Network', action: 'network', color: 'bg-neural-gold hover:bg-neural-gold/80' },
    { icon: Settings, label: 'Settings', action: 'settings', color: 'bg-neon-pink hover:bg-neon-pink/80' },
  ];

  const handleAction = (action: string) => {
    onAction?.(action);
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action Buttons */}
      <div className={`transition-all duration-300 ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <div className="flex flex-col-reverse space-y-reverse space-y-3 mb-4">
          {actions.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="glass-effect px-3 py-1 rounded-full bg-black/40 backdrop-blur">
                <span className="text-white text-sm font-orbitron whitespace-nowrap">
                  {item.label}
                </span>
              </div>
              <Button
                size="sm"
                onClick={() => handleAction(item.action)}
                className={`rounded-full w-12 h-12 ${item.color} hover:scale-110 transition-all duration-200 neon-glow`}
                data-testid={`fab-${item.action}`}
              >
                <item.icon size={20} />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Main FAB */}
      <Button
        size="lg"
        onClick={() => setIsExpanded(!isExpanded)}
        className={`rounded-full w-16 h-16 transition-all duration-300 transform hover:scale-110 ${
          isExpanded 
            ? 'bg-red-600 hover:bg-red-700 rotate-45' 
            : 'bg-gradient-to-r from-neon-cyan to-neon-purple hover:shadow-lg hover:shadow-neon-cyan/30'
        } neon-glow animate-glow-pulse`}
        data-testid="fab-main"
      >
        {isExpanded ? <X size={24} /> : <Plus size={24} />}
      </Button>

      {/* Pulse Rings */}
      {!isExpanded && (
        <>
          <div className="absolute inset-0 rounded-full bg-neon-cyan animate-ping opacity-20" />
          <div className="absolute inset-0 rounded-full bg-neon-purple animate-ping opacity-10" style={{ animationDelay: '0.5s' }} />
        </>
      )}
    </div>
  );
}