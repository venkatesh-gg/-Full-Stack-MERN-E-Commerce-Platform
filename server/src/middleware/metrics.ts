import { Express, Request, Response } from 'express';
import promClient from 'prom-client';

// Create Prometheus Registry
const register = new promClient.Registry();

// Collect default Node.js metrics
promClient.collectDefaultMetrics({
  register,
  eventLoopMonitoringPrecision: 10 // or remove this line entirely
});


// Custom HTTP request duration metric
const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10],
});

// Custom HTTP request total counter
const httpRequestTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

// MongoDB active connection gauge
const mongoConnections = new promClient.Gauge({
  name: 'mongodb_connections_active',
  help: 'Number of active MongoDB connections',
});

// Register custom metrics
register.registerMetric(httpRequestDuration);
register.registerMetric(httpRequestTotal);
register.registerMetric(mongoConnections);

export const setupMetrics = (app: Express) => {
  // Middleware to collect request metrics
  app.use((req: Request, res: Response, next) => {
    const start = Date.now();

    res.on('finish', () => {
      const duration = (Date.now() - start) / 1000;
      const route = req.route?.path || req.path;

      httpRequestDuration.labels(req.method, route, res.statusCode.toString()).observe(duration);
      httpRequestTotal.labels(req.method, route, res.statusCode.toString()).inc();
    });

    next();
  });

  // Expose /metrics endpoint
  app.get('/metrics', async (req: Request, res: Response) => {
    try {
      res.set('Content-Type', register.contentType);
      res.end(await register.metrics());
    } catch (error: any) {
      console.error('Error serving metrics:', error);
      res.status(500).end(error.message || 'Error generating metrics');
    }
  });
};

export { register, mongoConnections };
