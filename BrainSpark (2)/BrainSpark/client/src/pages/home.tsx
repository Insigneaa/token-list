import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { FeaturesSection } from '@/components/features-section';
import { AnalyticsSection } from '@/components/analytics-section';
import { InteractiveDashboard } from '@/components/interactive-dashboard';
import { CTASection } from '@/components/cta-section';
import { Footer } from '@/components/footer';
import { FloatingActionButton } from '@/components/floating-action-button';
import { SoundEffects } from '@/components/sound-effects';
import { SettingsModal } from '@/components/settings-modal';
import { useState } from 'react';

export default function Home() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleFloatingAction = (action: string) => {
    switch (action) {
      case 'settings':
        setIsSettingsOpen(true);
        break;
      case 'neural-boost':
        // Trigger neural boost effect
        window.dispatchEvent(new CustomEvent('neural-boost'));
        break;
      case 'analytics':
        // Scroll to analytics section
        document.querySelector('[data-testid="analytics-section"]')?.scrollIntoView({ 
          behavior: 'smooth' 
        });
        break;
      case 'data-sync':
        // Show data sync animation
        console.log('Data sync initiated');
        break;
      case 'network':
        // Show network status
        console.log('Network diagnostics');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <main>
        <HeroSection />
        <FeaturesSection />
        <AnalyticsSection />
        <section id="dashboard" className="py-20">
          <InteractiveDashboard />
        </section>
        <CTASection />
      </main>
      <Footer />
      
      {/* Interactive Elements */}
      <FloatingActionButton onAction={handleFloatingAction} />
      <SoundEffects enabled={soundEnabled} />
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </div>
  );
}
