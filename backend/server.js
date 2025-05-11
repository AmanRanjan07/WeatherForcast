const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// ========== Security Middleware ==========
app.use(helmet()); // Security headers
app.use(compression()); // Compress responses

// ========== CORS Configuration ==========
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ========== Body Parsing Middleware ==========
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ========== Logging Middleware ==========
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// ========== Rate Limiting ==========
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    success: false,
    message: 'Too many requests, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false
});

app.use(limiter);

// ========== Environment Variable Check ==========
const REQUIRED_ENV_VARS = ['MONGO_URI', 'PORT', 'JWT_SECRET'];  // ✅ fixed MONGODB_URI → MONGO_URI
REQUIRED_ENV_VARS.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing environment variable: ${key}`);
    process.exit(1);
  }
});

// ========== MongoDB Connection ==========
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {  // ✅ fixed MONGODB_URI → MONGO_URI
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB connected successfully at ${new Date().toISOString()}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`👤 Host: ${conn.connection.host}`);

    // Handle connection errors after initial connection
    mongoose.connection.on('error', err => {
      console.error(`❌ MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected');
    });

  } catch (err) {
    console.error(`❌ MongoDB connection failed: ${err.message}`);
    process.exit(1);
  }
};

// ========== Routes ==========
const authRoutes = require('./routes/auth');
const weatherRoutes = require('./routes/weather');

// ========== Route Mounting ==========
app.use('/api/auth', authRoutes);
app.use('/api/weather', weatherRoutes);

// ========== Health Check Route ==========
app.get('/health', (req, res) => {
  res.json({
    status: 'success',
    message: '🛠️ Weather API Server is running...',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// ========== 404 Handler ==========
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// ========== Global Error Handler ==========
app.use((err, req, res, next) => {
  console.error(`🔥 Server Error:`, err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong on the server';

  res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// ========== Server Start ==========
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`⏰ Started at: ${new Date().toISOString()}`);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! 💥 Shutting down...');
    console.error(err);
    server.close(() => {
      process.exit(1);
    });
  });
});

// ========== Graceful Shutdown ==========
process.on('SIGINT', async () => {
  console.log('\n🛑 Gracefully shutting down...');
  await mongoose.disconnect();
  console.log('✅ MongoDB connection closed');
  process.exit(0);
});
