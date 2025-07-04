import express from 'express';
import dotenv from 'dotenv';
import { db } from './db.js';
import combinationRoutes from './routes/combinations.routes.js';

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/api/combination', combinationRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await db.connect();
    console.log('✅ Connected to MySQL');

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ DB connection error:', err);
    process.exit(1);
  }
};

startServer();