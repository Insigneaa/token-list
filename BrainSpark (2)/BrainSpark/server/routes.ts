import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint for neural network stats (could be expanded for real blockchain data)
  app.get('/api/neural-stats', (req, res) => {
    res.json({
      neurons: 10847 + Math.floor(Math.random() * 100),
      connections: 2300000 + Math.floor(Math.random() * 10000),
      nodes: 156 + Math.floor(Math.random() * 10),
      networkSpeed: `${(1.2 + Math.random() * 0.5).toFixed(1)} TH/s`,
      activeConnections: 847291 + Math.floor(Math.random() * 1000),
      processingPower: (95 + Math.random() * 4).toFixed(1),
    });
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}
