import { useState, useEffect } from 'react';

export function AnalyticsSection() {
  const [networkStats, setNetworkStats] = useState({
    speed: '1.2 TH/s',
    connections: 847291,
    power: 95.7,
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkStats(prev => ({
        speed: `${(parseFloat(prev.speed) + (Math.random() - 0.5) * 0.1).toFixed(1)} TH/s`,
        connections: prev.connections + Math.floor(Math.random() * 100) - 50,
        power: Math.min(Math.max(prev.power + (Math.random() - 0.5) * 2, 85), 99.9),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="analytics" className="py-20 relative" data-testid="analytics-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-effect rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-orbitron font-bold text-3xl md:text-4xl mb-6">
                <span className="text-neon-green neon-text">Real-time</span><br />
                <span className="text-neon-cyan neon-text">Network Analytics</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Monitor neural network performance with live data visualization and AI-powered insights.
              </p>
              
              {/* Network Stats */}
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 glass-effect rounded-xl">
                  <span className="font-orbitron text-neon-cyan">Network Speed</span>
                  <span className="text-neon-green font-bold" data-testid="network-speed">
                    {networkStats.speed}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 glass-effect rounded-xl">
                  <span className="font-orbitron text-neon-purple">Active Connections</span>
                  <span className="text-neon-pink font-bold" data-testid="network-connections">
                    {networkStats.connections.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 glass-effect rounded-xl">
                  <span className="font-orbitron text-neural-gold">Processing Power</span>
                  <span className="text-neon-cyan font-bold" data-testid="network-power">
                    {networkStats.power.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Data Visualization Placeholder */}
            <div className="relative">
              <div className="w-full h-80 glass-effect rounded-2xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    {[0, 0.5, 1].map((delay, index) => (
                      <div
                        key={index}
                        className="w-16 h-16 border-4 rounded-full animate-spin border-t-transparent"
                        style={{ 
                          animationDelay: `${delay}s`,
                          borderColor: index === 0 ? 'var(--neon-cyan)' : 
                                     index === 1 ? 'var(--neon-purple)' : 'var(--neon-green)'
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-neon-cyan font-orbitron">Neural Data Processing...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
