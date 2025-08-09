import { useRef, useEffect, useState, useCallback } from 'react';
import { Brain, Play, Pause, RotateCcw, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface ThreeBrainProps {
  className?: string;
}

interface InteractionState {
  isPlaying: boolean;
  rotationSpeed: number;
  particleCount: number;
  brainScale: number;
  pulseIntensity: number;
}

export function ThreeBrain({ className = "" }: ThreeBrainProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [interactions, setInteractions] = useState<InteractionState>({
    isPlaying: true,
    rotationSpeed: 1,
    particleCount: 1000,
    brainScale: 1,
    pulseIntensity: 1,
  });
  const [isControlsVisible, setIsControlsVisible] = useState(false);
  const sceneRef = useRef<any>(null);
  const brainRef = useRef<any>(null);
  const particlesRef = useRef<any>(null);

  useEffect(() => {
    let animationId: number;
    let scene: any, camera: any, renderer: any, brain: any;

    const initThreeJS = async () => {
      try {
        // Dynamically import Three.js to reduce bundle size
        const THREE = await import('three').then(module => module.default || module);
        
        if (!mountRef.current) return;

        // Scene setup
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
          75,
          mountRef.current.clientWidth / mountRef.current.clientHeight,
          0.1,
          1000
        );
        
        renderer = new THREE.WebGLRenderer({ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.setClearColor(0x000000, 0);
        mountRef.current.appendChild(renderer.domElement);

        // Create brain-like geometry
        const brainGeometry = new THREE.SphereGeometry(2, 32, 32);
        
        // Create custom shader material for neon effect
        const brainMaterial = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            colorA: { value: new THREE.Color(0x00F5FF) }, // neon-cyan
            colorB: { value: new THREE.Color(0x8A2BE2) }, // neon-purple
          },
          vertexShader: `
            varying vec2 vUv;
            varying vec3 vPosition;
            uniform float time;
            
            void main() {
              vUv = uv;
              vPosition = position;
              
              // Add some vertex displacement for brain-like effect
              vec3 newPosition = position;
              newPosition += normal * sin(time + position.x * 5.0) * 0.1;
              newPosition += normal * sin(time + position.y * 3.0) * 0.05;
              
              gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
            }
          `,
          fragmentShader: `
            uniform float time;
            uniform vec3 colorA;
            uniform vec3 colorB;
            varying vec2 vUv;
            varying vec3 vPosition;
            
            void main() {
              float noise = sin(vPosition.x * 5.0 + time) * sin(vPosition.y * 3.0 + time) * 0.5 + 0.5;
              vec3 color = mix(colorA, colorB, noise);
              
              // Add glow effect
              float fresnel = pow(1.0 - dot(normalize(vPosition), vec3(0.0, 0.0, 1.0)), 2.0);
              color += fresnel * 0.5;
              
              gl_FragColor = vec4(color, 0.8 + noise * 0.2);
            }
          `,
          transparent: true,
          wireframe: false,
        });

        brain = new THREE.Mesh(brainGeometry, brainMaterial);
        brainRef.current = brain;
        scene.add(brain);

        // Add particles for neural connections
        const particleCount = 1000;
        const particleGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        const color = new THREE.Color();
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3] = (Math.random() - 0.5) * 10;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

          // Random neon colors
          const colorChoice = Math.random();
          if (colorChoice < 0.33) {
            color.set(0x00F5FF); // neon-cyan
          } else if (colorChoice < 0.66) {
            color.set(0x8A2BE2); // neon-purple
          } else {
            color.set(0x00FF41); // neon-green
          }

          colors[i * 3] = color.r;
          colors[i * 3 + 1] = color.g;
          colors[i * 3 + 2] = color.b;
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particleMaterial = new THREE.PointsMaterial({
          size: 0.05,
          vertexColors: true,
          transparent: true,
          opacity: 0.6,
        });

        const particles = new THREE.Points(particleGeometry, particleMaterial);
        particlesRef.current = particles;
        scene.add(particles);
        sceneRef.current = { scene, camera, renderer, brain, particles };

        // Position camera
        camera.position.z = 5;

        // Animation loop
        let startTime = Date.now();
        const animate = () => {
          animationId = requestAnimationFrame(animate);

          const time = (Date.now() - startTime) * 0.001;
          
          // Update brain material
          if (brain && brain.material.uniforms) {
            brain.material.uniforms.time.value = time;
          }

          // Rotate brain based on interaction state
          if (brain && interactions.isPlaying) {
            brain.rotation.x += 0.005 * interactions.rotationSpeed;
            brain.rotation.y += 0.01 * interactions.rotationSpeed;
            brain.scale.setScalar(interactions.brainScale + Math.sin(time * interactions.pulseIntensity) * 0.1);
          }

          // Animate particles based on interaction state
          if (particles && interactions.isPlaying) {
            particles.rotation.y += 0.002 * interactions.rotationSpeed;
            const positions = particles.geometry.attributes.position.array as Float32Array;
            
            for (let i = 0; i < positions.length; i += 3) {
              positions[i + 1] += Math.sin(time + positions[i]) * 0.001 * interactions.pulseIntensity;
            }
            particles.geometry.attributes.position.needsUpdate = true;
          }

          renderer.render(scene, camera);
        };

        // Simulate loading progress
        let progress = 0;
        const loadingInterval = setInterval(() => {
          progress += Math.random() * 20;
          setLoadingProgress(Math.min(progress, 100));
          
          if (progress >= 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
              setIsLoaded(true);
              animate();
            }, 500);
          }
        }, 100);

        // Handle window resize
        const handleResize = () => {
          if (!mountRef.current) return;
          
          camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        };

        // Mouse interaction
        const handleMouseMove = (event: MouseEvent) => {
          if (!brain || !interactions.isPlaying) return;
          const rect = mountRef.current?.getBoundingClientRect();
          if (!rect) return;
          
          const x = (event.clientX - rect.left) / rect.width * 2 - 1;
          const y = -(event.clientY - rect.top) / rect.height * 2 + 1;
          
          brain.rotation.x = y * 0.3;
          brain.rotation.y = x * 0.3;
        };

        // Touch interaction for mobile
        const handleTouchMove = (event: TouchEvent) => {
          if (!brain || !interactions.isPlaying) return;
          event.preventDefault();
          const touch = event.touches[0];
          const rect = mountRef.current?.getBoundingClientRect();
          if (!rect) return;
          
          const x = (touch.clientX - rect.left) / rect.width * 2 - 1;
          const y = -(touch.clientY - rect.top) / rect.height * 2 + 1;
          
          brain.rotation.x = y * 0.3;
          brain.rotation.y = x * 0.3;
        };

        window.addEventListener('resize', handleResize);
        mountRef.current?.addEventListener('mousemove', handleMouseMove);
        mountRef.current?.addEventListener('touchmove', handleTouchMove, { passive: false });
        
        return () => {
          window.removeEventListener('resize', handleResize);
          mountRef.current?.removeEventListener('mousemove', handleMouseMove);
          mountRef.current?.removeEventListener('touchmove', handleTouchMove);
          clearInterval(loadingInterval);
        };

      } catch (error) {
        console.error('Three.js initialization error:', error);
        setIsLoaded(true); // Show fallback
      }
    };

    initThreeJS();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (renderer && mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, [interactions]);

  const togglePlayback = useCallback(() => {
    setInteractions(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, []);

  const resetBrain = useCallback(() => {
    if (brainRef.current) {
      brainRef.current.rotation.x = 0;
      brainRef.current.rotation.y = 0;
      brainRef.current.scale.setScalar(1);
    }
    setInteractions({
      isPlaying: true,
      rotationSpeed: 1,
      particleCount: 1000,
      brainScale: 1,
      pulseIntensity: 1,
    });
  }, []);

  const updateRotationSpeed = useCallback((value: number[]) => {
    setInteractions(prev => ({ ...prev, rotationSpeed: value[0] }));
  }, []);

  const updateBrainScale = useCallback((value: number[]) => {
    setInteractions(prev => ({ ...prev, brainScale: value[0] }));
    if (brainRef.current) {
      brainRef.current.scale.setScalar(value[0]);
    }
  }, []);

  const updatePulseIntensity = useCallback((value: number[]) => {
    setInteractions(prev => ({ ...prev, pulseIntensity: value[0] }));
  }, []);

  return (
    <div 
      className={`relative w-full h-full rounded-3xl glass-effect overflow-hidden ${className}`}
      style={{
        background: 'radial-gradient(ellipse at center, rgba(0, 245, 255, 0.1) 0%, rgba(10, 10, 10, 1) 70%)'
      }}
      onMouseEnter={() => setIsControlsVisible(true)}
      onMouseLeave={() => setIsControlsVisible(false)}
    >
      <div ref={mountRef} className="w-full h-full" />
      
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Brain className="text-8xl text-neon-cyan animate-pulse-slow neon-text mx-auto" />
            <p className="text-neon-cyan font-orbitron">Loading Neural Network...</p>
            <div className="w-32 h-1 bg-gray-800 rounded-full mx-auto overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <div className="text-sm text-gray-400">{Math.round(loadingProgress)}%</div>
          </div>
        </div>
      )}

      {isLoaded && (
        <>
          {/* Status Indicator */}
          <div className="absolute bottom-4 right-4 text-center space-y-2">
            <div className="text-sm text-gray-400">Hover to interact</div>
            <div className="flex items-center justify-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${interactions.isPlaying ? 'bg-neon-green animate-pulse' : 'bg-gray-500'}`} />
              <span className={`font-orbitron text-xs ${interactions.isPlaying ? 'text-neon-green' : 'text-gray-400'}`}>
                Neural Network {interactions.isPlaying ? 'Active' : 'Paused'}
              </span>
            </div>
          </div>

          {/* Interactive Controls */}
          <div className={`absolute top-4 left-4 space-y-4 transition-all duration-300 ${isControlsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}>
            <div className="glass-effect rounded-xl p-4 space-y-3 bg-black/20 border border-neon-cyan/20">
              {/* Playback Controls */}
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  onClick={togglePlayback}
                  className={`${interactions.isPlaying ? 'bg-neon-green' : 'bg-neon-cyan'} hover:scale-105 transition-all`}
                  data-testid="button-toggle-playback"
                >
                  {interactions.isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </Button>
                <Button
                  size="sm"
                  onClick={resetBrain}
                  className="bg-neon-purple hover:scale-105 transition-all"
                  data-testid="button-reset-brain"
                >
                  <RotateCcw size={16} />
                </Button>
                <Button
                  size="sm"
                  className="bg-neural-gold hover:scale-105 transition-all"
                  data-testid="button-neural-boost"
                >
                  <Zap size={16} />
                </Button>
              </div>

              {/* Speed Control */}
              <div className="space-y-2">
                <label className="text-xs text-neon-cyan font-orbitron">Velocidade</label>
                <Slider
                  value={[interactions.rotationSpeed]}
                  onValueChange={updateRotationSpeed}
                  min={0}
                  max={3}
                  step={0.1}
                  className="w-32"
                />
                <span className="text-xs text-gray-400">{interactions.rotationSpeed.toFixed(1)}x</span>
              </div>

              {/* Scale Control */}
              <div className="space-y-2">
                <label className="text-xs text-neon-purple font-orbitron">Tamanho</label>
                <Slider
                  value={[interactions.brainScale]}
                  onValueChange={updateBrainScale}
                  min={0.5}
                  max={2}
                  step={0.1}
                  className="w-32"
                />
                <span className="text-xs text-gray-400">{(interactions.brainScale * 100).toFixed(0)}%</span>
              </div>

              {/* Pulse Control */}
              <div className="space-y-2">
                <label className="text-xs text-neon-green font-orbitron">Pulso</label>
                <Slider
                  value={[interactions.pulseIntensity]}
                  onValueChange={updatePulseIntensity}
                  min={0}
                  max={3}
                  step={0.1}
                  className="w-32"
                />
                <span className="text-xs text-gray-400">{interactions.pulseIntensity.toFixed(1)}x</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
