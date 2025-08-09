import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Cpu, Database, Network, Zap, TrendingUp, Brain, Settings, Monitor, Wifi, ShoppingCart } from 'lucide-react';
import { UniswapButton } from './uniswap-button';

interface DashboardMetric {
  label: string;
  value: string;
  change: number;
  unit: string;
  icon: any;
  color: string;
}

interface SystemMetrics {
  neurons: number;
  connections: number;
  power: number;
  efficiency: number;
  latency: number;
  uptime: number;
}

export function InteractiveDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [autoOptimize, setAutoOptimize] = useState(false);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    neurons: 15000,
    connections: 45000,
    power: 87,
    efficiency: 92,
    latency: 8,
    uptime: 156,
  });
  const [metrics, setMetrics] = useState<DashboardMetric[]>([
    { label: 'CPU Usage', value: '67', change: 2.1, unit: '%', icon: Cpu, color: 'neon-cyan' },
    { label: 'Memory', value: '8.2', change: -0.5, unit: 'GB', icon: Database, color: 'neon-purple' },
    { label: 'Network', value: '1.2', change: 5.3, unit: 'GB/s', icon: Network, color: 'neon-green' },
    { label: 'Processing', value: '94.7', change: 1.8, unit: '%', icon: Activity, color: 'neural-gold' },
  ]);

  const [neuralActivity, setNeuralActivity] = useState(Array.from({ length: 20 }, () => Math.random() * 100));

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: (parseFloat(metric.value) + (Math.random() - 0.5) * 2).toFixed(1),
        change: (Math.random() - 0.5) * 10,
      })));

      setNeuralActivity(prev => [
        ...prev.slice(1),
        Math.random() * 100,
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className="font-orbitron font-bold text-2xl md:text-3xl text-neon-cyan neon-text">
          Neural Dashboard
        </h2>
        <p className="text-gray-400 mt-2">Monitor real-time network performance</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 glass-effect">
          <TabsTrigger value="overview" className="font-orbitron" data-testid="tab-overview">
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="metrics" className="font-orbitron" data-testid="tab-metrics">
            Métricas
          </TabsTrigger>
          <TabsTrigger value="activity" className="font-orbitron" data-testid="tab-activity">
            Atividade
          </TabsTrigger>
          <TabsTrigger value="neural" className="font-orbitron" data-testid="tab-neural">
            <Brain className="mr-1 h-4 w-4" />
            Neural
          </TabsTrigger>
          <TabsTrigger value="control" className="font-orbitron" data-testid="tab-control">
            <Settings className="mr-1 h-4 w-4" />
            Controle
          </TabsTrigger>
          <TabsTrigger value="trade" className="font-orbitron" data-testid="tab-trade">
            <ShoppingCart className="mr-1 h-4 w-4" />
            Trade
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <Card key={index} className="glass-effect border-gray-700 hover:border-neon-cyan/50 transition-all cursor-pointer" data-testid={`metric-card-${index}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    {metric.label}
                  </CardTitle>
                  <metric.icon className={`h-4 w-4 text-${metric.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {metric.value}{metric.unit}
                  </div>
                  <div className="flex items-center space-x-1 text-xs">
                    <TrendingUp className={`h-3 w-3 ${metric.change > 0 ? 'text-neon-green' : 'text-red-400'}`} />
                    <span className={metric.change > 0 ? 'text-neon-green' : 'text-red-400'}>
                      {metric.change > 0 ? '+' : ''}{metric.change.toFixed(1)}%
                    </span>
                    <span className="text-gray-400">vs última hora</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="glass-effect border-gray-700">
            <CardHeader>
              <CardTitle className="font-orbitron text-neon-purple">Status do Sistema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Neural Processing</span>
                <Badge className="bg-neon-green/20 text-neon-green">Online</Badge>
              </div>
              <Progress value={87} className="h-2" />
              <div className="flex justify-between text-sm text-gray-400">
                <span>87% eficiência</span>
                <span>23 nós ativos</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-effect border-gray-700">
              <CardHeader>
                <CardTitle className="font-orbitron text-neon-cyan">Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Throughput</span>
                    <span className="text-neon-cyan">2.3 TH/s</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Latency</span>
                    <span className="text-neon-green">12ms</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Success Rate</span>
                    <span className="text-neural-gold">99.7%</span>
                  </div>
                  <Progress value={99.7} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-gray-700">
              <CardHeader>
                <CardTitle className="font-orbitron text-neon-purple">Recursos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-neon-cyan">156</div>
                    <div className="text-xs text-gray-400">Nós Conectados</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-neon-green">2.1M</div>
                    <div className="text-xs text-gray-400">Conexões Ativas</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-neural-gold">847k</div>
                    <div className="text-xs text-gray-400">Transações</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-neon-purple">99.9%</div>
                    <div className="text-xs text-gray-400">Uptime</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card className="glass-effect border-gray-700">
            <CardHeader>
              <CardTitle className="font-orbitron text-neon-green">Atividade Neural</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-32 flex items-end space-x-1">
                {neuralActivity.map((value, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-gradient-to-t from-neon-green to-neon-cyan rounded-t"
                    style={{ height: `${value}%` }}
                    data-testid={`activity-bar-${index}`}
                  />
                ))}
              </div>
              <div className="mt-4 flex justify-between items-center">
                <Button size="sm" className="bg-neon-green hover:bg-neon-green/80" data-testid="button-boost-activity">
                  <Zap className="mr-1 h-4 w-4" />
                  Boost Neural Activity
                </Button>
                <div className="text-sm text-gray-400">
                  Atualizada há {Math.floor(Math.random() * 60)} segundos
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="neural" className="space-y-6">
          {/* Neural Network Visualization */}
          <Card className="glass-effect border-neon-cyan/20">
            <CardHeader>
              <CardTitle className="font-orbitron text-neon-cyan flex items-center">
                <Brain className="mr-2" size={20} />
                Rede Neural Interativa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Neurônios Ativos</span>
                    <Button 
                      size="sm" 
                      className="bg-neon-cyan hover:bg-neon-cyan/80"
                      onClick={() => setSystemMetrics(prev => ({...prev, neurons: prev.neurons + Math.floor(Math.random() * 100)}))}
                      data-testid="button-boost-neurons"
                    >
                      <Zap className="mr-1 h-3 w-3" />
                      Boost
                    </Button>
                  </div>
                  <Progress value={(systemMetrics.neurons % 1000) / 10} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Conexões Sinápticas</span>
                    <Button 
                      size="sm" 
                      className="bg-neon-purple hover:bg-neon-purple/80"
                      onClick={() => setSystemMetrics(prev => ({...prev, connections: prev.connections + Math.floor(Math.random() * 50)}))}
                      data-testid="button-boost-connections"
                    >
                      <Network className="mr-1 h-3 w-3" />
                      Amplificar
                    </Button>
                  </div>
                  <Progress value={(systemMetrics.connections % 500) / 5} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Frequência Neural</span>
                    <Badge className="bg-neon-green/20 text-neon-green">
                      {(Math.random() * 100).toFixed(1)} Hz
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-orbitron text-neon-green">Padrões Detectados</h4>
                  <div className="space-y-2">
                    {['Reconhecimento Visual', 'Processamento Linguístico', 'Análise Preditiva', 'Otimização Quântica'].map((pattern, index) => (
                      <div key={index} className="flex items-center justify-between p-2 glass-effect rounded">
                        <span className="text-sm text-gray-300">{pattern}</span>
                        <div className={`w-2 h-2 rounded-full ${index % 2 === 0 ? 'bg-neon-green' : 'bg-neon-purple'} animate-pulse`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Neural Data Stream */}
          <Card className="glass-effect border-neon-purple/20">
            <CardHeader>
              <CardTitle className="font-orbitron text-neon-purple">Stream de Dados Neural</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-32 overflow-hidden relative">
                <div className="absolute inset-0 flex flex-col space-y-1 animate-scroll">
                  {Array.from({ length: 20 }, (_, i) => (
                    <div key={i} className="flex items-center space-x-4 text-xs font-mono">
                      <span className="text-neon-cyan">[{new Date().toLocaleTimeString()}]</span>
                      <span className="text-gray-400">Neural packet #{1000 + i}</span>
                      <span className="text-neon-green">✓ Processed</span>
                      <span className="text-neural-gold">{(Math.random() * 100).toFixed(2)}ms</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="control" className="space-y-6">
          {/* System Controls */}
          <Card className="glass-effect border-neural-gold/20">
            <CardHeader>
              <CardTitle className="font-orbitron text-neural-gold flex items-center">
                <Settings className="mr-2" size={20} />
                Controles do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button 
                  className="h-16 bg-neon-green hover:bg-neon-green/80 flex flex-col items-center justify-center"
                  onClick={() => setSystemMetrics(prev => ({...prev, power: Math.min(100, prev.power + 10)}))}
                  data-testid="button-boost-power"
                >
                  <Zap size={20} />
                  <span className="text-xs mt-1">Aumentar Potência</span>
                </Button>

                <Button 
                  className="h-16 bg-neon-cyan hover:bg-neon-cyan/80 flex flex-col items-center justify-center"
                  onClick={() => setSystemMetrics(prev => ({...prev, efficiency: Math.min(100, prev.efficiency + 5)}))}
                  data-testid="button-optimize"
                >
                  <Cpu size={20} />
                  <span className="text-xs mt-1">Otimizar Rede</span>
                </Button>

                <Button 
                  className="h-16 bg-neon-purple hover:bg-neon-purple/80 flex flex-col items-center justify-center"
                  onClick={() => setSystemMetrics(prev => ({...prev, latency: Math.max(1, prev.latency - 2)}))}
                  data-testid="button-reduce-latency"
                >
                  <Network size={20} />
                  <span className="text-xs mt-1">Reduzir Latência</span>
                </Button>

                <Button 
                  className="h-16 bg-neon-pink hover:bg-neon-pink/80 flex flex-col items-center justify-center"
                  onClick={() => {
                    setSystemMetrics(prev => ({
                      ...prev,
                      neurons: prev.neurons + 500,
                      connections: prev.connections + 250,
                      power: Math.min(100, prev.power + 15)
                    }));
                  }}
                  data-testid="button-neural-surge"
                >
                  <Brain size={20} />
                  <span className="text-xs mt-1">Surto Neural</span>
                </Button>

                <Button 
                  className="h-16 bg-neural-gold hover:bg-neural-gold/80 flex flex-col items-center justify-center"
                  onClick={() => setSystemMetrics(prev => ({...prev, uptime: prev.uptime + 1}))}
                  data-testid="button-extend-uptime"
                >
                  <Monitor size={20} />
                  <span className="text-xs mt-1">Estender Uptime</span>
                </Button>

                <Button 
                  className="h-16 bg-gradient-to-r from-neon-cyan to-neon-purple hover:from-neon-cyan/80 hover:to-neon-purple/80 flex flex-col items-center justify-center"
                  onClick={() => {
                    // Reset all metrics to random values
                    setSystemMetrics({
                      neurons: Math.floor(Math.random() * 10000) + 5000,
                      connections: Math.floor(Math.random() * 50000) + 25000,
                      power: Math.floor(Math.random() * 30) + 70,
                      efficiency: Math.floor(Math.random() * 20) + 80,
                      latency: Math.floor(Math.random() * 10) + 5,
                      uptime: Math.floor(Math.random() * 100) + 50,
                    });
                  }}
                  data-testid="button-randomize"
                >
                  <Wifi size={20} />
                  <span className="text-xs mt-1">Reconfigurar</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Controls */}
          <Card className="glass-effect border-neon-green/20">
            <CardHeader>
              <CardTitle className="font-orbitron text-neon-green">Controles Avançados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Auto-otimização Neural</span>
                  <Button 
                    size="sm" 
                    variant={autoOptimize ? "default" : "outline"}
                    className={autoOptimize ? "bg-neon-green" : "border-neon-green text-neon-green"}
                    onClick={() => setAutoOptimize(!autoOptimize)}
                    data-testid="button-auto-optimize"
                  >
                    {autoOptimize ? 'Ativo' : 'Inativo'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Monitoramento Contínuo</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-neon-cyan text-neon-cyan"
                    data-testid="button-continuous-monitoring"
                  >
                    Ativo
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Backup Automático</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-neon-purple text-neon-purple"
                    data-testid="button-auto-backup"
                  >
                    Configurar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trade" className="space-y-6">
          <UniswapButton />
        </TabsContent>
      </Tabs>
    </div>
  );
}