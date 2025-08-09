import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Volume2, Eye, Zap, Palette, Save } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Settings {
  audio: {
    enabled: boolean;
    volume: number;
    neuralSounds: boolean;
  };
  visual: {
    particleCount: number;
    animationSpeed: number;
    glowIntensity: number;
    autoRotate: boolean;
  };
  performance: {
    highQuality: boolean;
    reducedMotion: boolean;
    powerSaver: boolean;
  };
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [settings, setSettings] = useState<Settings>({
    audio: {
      enabled: true,
      volume: 50,
      neuralSounds: true,
    },
    visual: {
      particleCount: 1000,
      animationSpeed: 1,
      glowIntensity: 1,
      autoRotate: true,
    },
    performance: {
      highQuality: true,
      reducedMotion: false,
      powerSaver: false,
    },
  });

  const updateSetting = (category: keyof Settings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('neurox-settings', JSON.stringify(settings));
    onClose();
    // Apply settings globally
    window.dispatchEvent(new CustomEvent('neurox-settings-update', { detail: settings }));
  };

  const resetToDefaults = () => {
    setSettings({
      audio: {
        enabled: true,
        volume: 50,
        neuralSounds: true,
      },
      visual: {
        particleCount: 1000,
        animationSpeed: 1,
        glowIntensity: 1,
        autoRotate: true,
      },
      performance: {
        highQuality: true,
        reducedMotion: false,
        powerSaver: false,
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-effect border-neon-purple/20 max-w-2xl max-h-[80vh] overflow-auto">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto">
            <Settings className="text-6xl text-neon-purple animate-spin" size={48} style={{ animationDuration: '8s' }} />
          </div>
          <DialogTitle className="font-orbitron font-bold text-2xl text-neon-purple">
            Neural Settings
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="visual" className="w-full">
          <TabsList className="grid w-full grid-cols-3 glass-effect">
            <TabsTrigger value="visual" className="font-orbitron" data-testid="settings-tab-visual">
              <Eye className="mr-2 h-4 w-4" />
              Visual
            </TabsTrigger>
            <TabsTrigger value="audio" className="font-orbitron" data-testid="settings-tab-audio">
              <Volume2 className="mr-2 h-4 w-4" />
              Audio
            </TabsTrigger>
            <TabsTrigger value="performance" className="font-orbitron" data-testid="settings-tab-performance">
              <Zap className="mr-2 h-4 w-4" />
              Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="visual" className="space-y-4">
            <Card className="glass-effect border-gray-700">
              <CardHeader>
                <CardTitle className="text-neon-cyan font-orbitron">Configurações Visuais</CardTitle>
                <CardDescription>Customize the 3D experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-orbitron text-neon-cyan">Contagem de Partículas</label>
                    <span className="text-neon-green">{settings.visual.particleCount}</span>
                  </div>
                  <Slider
                    value={[settings.visual.particleCount]}
                    onValueChange={(value) => updateSetting('visual', 'particleCount', value[0])}
                    min={100}
                    max={2000}
                    step={50}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-orbitron text-neon-purple">Velocidade da Animação</label>
                    <span className="text-neon-green">{settings.visual.animationSpeed}x</span>
                  </div>
                  <Slider
                    value={[settings.visual.animationSpeed]}
                    onValueChange={(value) => updateSetting('visual', 'animationSpeed', value[0])}
                    min={0.1}
                    max={3}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-orbitron text-neon-green">Intensidade do Brilho</label>
                    <span className="text-neon-green">{settings.visual.glowIntensity}x</span>
                  </div>
                  <Slider
                    value={[settings.visual.glowIntensity]}
                    onValueChange={(value) => updateSetting('visual', 'glowIntensity', value[0])}
                    min={0.1}
                    max={2}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-orbitron text-neural-gold">Rotação Automática</label>
                  <Switch
                    checked={settings.visual.autoRotate}
                    onCheckedChange={(checked) => updateSetting('visual', 'autoRotate', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audio" className="space-y-4">
            <Card className="glass-effect border-gray-700">
              <CardHeader>
                <CardTitle className="text-neon-purple font-orbitron">Configurações de Áudio</CardTitle>
                <CardDescription>Control sound effects and feedback</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-orbitron text-neon-purple">Efeitos Sonoros</label>
                  <Switch
                    checked={settings.audio.enabled}
                    onCheckedChange={(checked) => updateSetting('audio', 'enabled', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-orbitron text-neon-cyan">Volume</label>
                    <span className="text-neon-green">{settings.audio.volume}%</span>
                  </div>
                  <Slider
                    value={[settings.audio.volume]}
                    onValueChange={(value) => updateSetting('audio', 'volume', value[0])}
                    min={0}
                    max={100}
                    step={5}
                    className="w-full"
                    disabled={!settings.audio.enabled}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-orbitron text-neon-green">Sons Neurais</label>
                  <Switch
                    checked={settings.audio.neuralSounds}
                    onCheckedChange={(checked) => updateSetting('audio', 'neuralSounds', checked)}
                    disabled={!settings.audio.enabled}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card className="glass-effect border-gray-700">
              <CardHeader>
                <CardTitle className="text-neon-green font-orbitron">Performance</CardTitle>
                <CardDescription>Optimize for your device</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-orbitron text-neon-green">Alta Qualidade</label>
                    <p className="text-xs text-gray-400">Máximo visual quality</p>
                  </div>
                  <Switch
                    checked={settings.performance.highQuality}
                    onCheckedChange={(checked) => updateSetting('performance', 'highQuality', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-orbitron text-neural-gold">Movimento Reduzido</label>
                    <p className="text-xs text-gray-400">Para sensibilidade de movimento</p>
                  </div>
                  <Switch
                    checked={settings.performance.reducedMotion}
                    onCheckedChange={(checked) => updateSetting('performance', 'reducedMotion', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-orbitron text-neon-cyan">Modo Economia</label>
                    <p className="text-xs text-gray-400">Conserva bateria</p>
                  </div>
                  <Switch
                    checked={settings.performance.powerSaver}
                    onCheckedChange={(checked) => updateSetting('performance', 'powerSaver', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-4">
          <Button 
            variant="outline" 
            onClick={resetToDefaults}
            className="glass-effect border-gray-600 hover:bg-red-500/10 hover:border-red-500"
            data-testid="button-reset-defaults"
          >
            Resetar Padrões
          </Button>
          <div className="space-x-2">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="glass-effect border-gray-600"
              data-testid="button-cancel-settings"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-gradient-to-r from-neon-cyan to-neon-purple font-orbitron"
              data-testid="button-save-settings"
            >
              <Save className="mr-2 h-4 w-4" />
              Salvar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}