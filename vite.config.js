import dotenv from 'dotenv';
dotenv.config();
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import handler from './api/generate.js';

// Custom plugin to serve the /api/generate serverless function in Vite dev mode!
function apiDevPlugin() {
  return {
    name: 'api-dev-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/generate' || req.url.startsWith('/api/generate?')) {
          if (req.method === 'OPTIONS') {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-gemini-key');
            res.statusCode = 200;
            res.end();
            return;
          }

          let bodyData = '';
          req.on('data', chunk => { bodyData += chunk; });
          req.on('end', async () => {
            req.body = bodyData;
            // Provide helpers for vercel serverless handler compatibility
            res.status = function(code) { this.statusCode = code; return this; };
            res.json = function(data) {
              this.setHeader('Content-Type', 'application/json');
              this.end(JSON.stringify(data));
              return this;
            };
            try {
              await handler(req, res);
            } catch (err) {
              console.error("Vite API Dev Server Error:", err);
              res.status(500).json({ error: err.message });
            }
          });
          return;
        }
        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), apiDevPlugin()],
  server: {
    port: 5173,
    open: false
  }
});
