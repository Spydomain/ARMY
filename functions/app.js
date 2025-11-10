import express from 'express';
import cors from 'cors';
import passport from './config/passport.js';
import authRoutes from './routes/auth.js';
import questionRoutes from './routes/questions.js';
import testRoutes from './routes/tests.js';
import userRoutes from './routes/users.js';
import { notFound, errorHandler } from './middleware/error.js';

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'https://fgetestplatform.netlify.app',
    'http://localhost:3000',
    'http://localhost:5173',
    'https://<YOUR_FIREBASE_APP_ID>.web.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(passport.initialize());

// Log requests for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;
