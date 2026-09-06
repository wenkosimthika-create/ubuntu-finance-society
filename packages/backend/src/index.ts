import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth';
import groupRoutes from './routes/groups';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Compliance banner
app.use((req, res, next) => {
  res.set('X-Compliance-Notice', 'Ubuntu Finance Society does not hold, manage, invest, lend or transfer funds. Ubuntu Finance Society is a record-keeping and governance platform.');
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Ubuntu Finance Society API is running' });
});

// Compliance endpoint
app.get('/api/compliance', (req, res) => {
  res.json({
    message: 'Ubuntu Finance Society does not hold, manage, invest, lend or transfer funds.',
    description: 'Ubuntu Finance Society is a record-keeping and governance platform.',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
  logger.info('Ubuntu Finance Society API running');
});

export default app;
