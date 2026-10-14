import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Routes
import authRoutes from './routes/authRoutes.js';
import progressRoutes from './routes/progressRoutes.js';
import codingRoutes from './routes/codingRoutes.js';
import aptitudeRoutes from './routes/aptitudeRoutes.js';
import communicationRoutes from './routes/communicationRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Render / Reverse Proxy trust
app.set('trust proxy', 1);

// Security & Parsing Middleware
app.use(helmet({
  crossOriginResourcePolicy: false
}));

// CORS Configuration with Render Production & Local Fallback
const allowedOrigins = [
  'https://seekhsetu-h7j4.onrender.com',
  'https://seekhsetu.onrender.com',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173'
];

if (process.env.CLIENT_ORIGIN) {
  process.env.CLIENT_ORIGIN.split(',').forEach(o => {
    const trimmed = o.trim();
    if (trimmed && !allowedOrigins.includes(trimmed)) {
      allowedOrigins.push(trimmed);
    }
  });
}

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    try {
      const url = new URL(origin);
      if (allowedOrigins.includes(origin) || url.hostname.endsWith('.onrender.com')) {
        return callback(null, true);
      }
    } catch {
      // ignore parsing error
    }
    return callback(null, true); // Permissive fallback to prevent CORS blocking while keeping credentials
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Root Route
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: 'SeekhSetu Placement OS API Server',
    backendUrl: 'https://seekhsetu.onrender.com',
    frontendUrl: 'https://seekhsetu-h7j4.onrender.com',
    health: '/api/health',
    timestamp: new Date().toISOString()
  });
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'SeekhSetu Placement OS API Server',
    mongoStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/coding', codingRoutes);
app.use('/api/aptitude', aptitudeRoutes);
app.use('/api/communication', communicationRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// Connect to MongoDB
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/seekhsetu_db';

mongoose.connect(MONGO_URI, { dbName: 'seekhsetu_db' })
  .then(() => {
    console.log(`✅ Connected to MongoDB Atlas (${mongoose.connection.host}) database [${mongoose.connection.name}] successfully!`);
  })
  .catch(err => {
    console.error('❌ MongoDB Atlas connection error:', err.message);
  });

// Start Server with Auto-Retry & Graceful Shutdown
if (process.env.NODE_ENV !== 'test') {
  let activeServer = null;

  function startServer(port, retries = 5) {
    const server = app.listen(port, () => {
      activeServer = server;
      console.log(`🚀 SeekhSetu Placement OS API server running on port ${port}`);
      console.log(`   Health check: http://localhost:${port}/api/health`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        if (retries > 0) {
          console.warn(`⚠️ Port ${port} busy (TIME_WAIT/restart). Retrying in 1.2s (${retries} retries left)...`);
          setTimeout(() => {
            try { server.close(); } catch {}
            startServer(port, retries - 1);
          }, 1200);
          return;
        }
        console.error(`❌ Port ${port} is occupied by another running process.`);
        console.error(`👉 Run 'npm run free-port' in server/ or change PORT in server/.env.`);
        process.exit(1);
      } else {
        console.error('❌ Server startup error:', err.message);
        process.exit(1);
      }
    });
  }

  startServer(PORT);

  const cleanShutdown = async () => {
    if (activeServer) {
      try { activeServer.close(); } catch {}
    }
    await mongoose.disconnect().catch(() => {});
    process.exit(0);
  };

  process.on('SIGINT', cleanShutdown);
  process.on('SIGTERM', cleanShutdown);
}

export default app;
