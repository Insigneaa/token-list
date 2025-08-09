import { useEffect, useRef } from 'react';

interface SoundEffectsProps {
  enabled?: boolean;
}

export function SoundEffects({ enabled = true }: SoundEffectsProps) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const soundsRef = useRef<{ [key: string]: AudioBuffer }>({});

  useEffect(() => {
    if (!enabled) return;

    // Initialize Web Audio API
    const initAudio = async () => {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // Generate synthetic sounds
        const createTone = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
          const sampleRate = audioContextRef.current!.sampleRate;
          const numSamples = Math.floor(sampleRate * duration);
          const buffer = audioContextRef.current!.createBuffer(1, numSamples, sampleRate);
          const data = buffer.getChannelData(0);

          for (let i = 0; i < numSamples; i++) {
            const t = i / sampleRate;
            let sample = 0;
            
            switch (type) {
              case 'sine':
                sample = Math.sin(2 * Math.PI * frequency * t);
                break;
              case 'square':
                sample = Math.sign(Math.sin(2 * Math.PI * frequency * t));
                break;
              case 'sawtooth':
                sample = 2 * (frequency * t - Math.floor(frequency * t + 0.5));
                break;
            }
            
            // Apply envelope
            const envelope = Math.exp(-t * 3);
            data[i] = sample * envelope * 0.1;
          }
          
          return buffer;
        };

        // Create different sounds
        soundsRef.current = {
          click: createTone(800, 0.1, 'sine'),
          hover: createTone(600, 0.05, 'sine'),
          success: createTone(1200, 0.3, 'sine'),
          neural: createTone(400, 0.5, 'sawtooth'),
          boost: createTone(1600, 0.2, 'square'),
        };
      } catch (error) {
        console.warn('Web Audio API not supported:', error);
      }
    };

    initAudio();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [enabled]);

  const playSound = (soundName: string, volume: number = 0.1) => {
    if (!enabled || !audioContextRef.current || !soundsRef.current[soundName]) return;

    try {
      const source = audioContextRef.current.createBufferSource();
      const gainNode = audioContextRef.current.createGain();
      
      source.buffer = soundsRef.current[soundName];
      gainNode.gain.value = volume;
      
      source.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      source.start();
    } catch (error) {
      console.warn('Error playing sound:', error);
    }
  };

  // Expose play function globally
  useEffect(() => {
    (window as any).playSoundEffect = playSound;
    
    return () => {
      delete (window as any).playSoundEffect;
    };
  }, [playSound]);

  // Add event listeners for interactive sounds
  useEffect(() => {
    if (!enabled) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest && target.closest('button')) {
        playSound('click', 0.05);
      }
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest && target.closest('button, .glass-effect')) {
        playSound('hover', 0.03);
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('mouseenter', handleHover, true);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mouseenter', handleHover, true);
    };
  }, [enabled, playSound]);

  return null;
}

// Helper function to play sounds from components
export const playGlobalSound = (soundName: string, volume?: number) => {
  if ((window as any).playSoundEffect) {
    (window as any).playSoundEffect(soundName, volume);
  }
};