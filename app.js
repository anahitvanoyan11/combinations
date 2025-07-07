import express from 'express';
import dotenv from 'dotenv';
import { db } from './db/connection.js';
import combinationRoutes from './routes/combinations.routes.js';
import { isCelebrateError } from 'celebrate';

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/api/combination', combinationRoutes);

// 🎯 Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  if (isCelebrateError(err)) {
    // Access the body validation details
    const [segment, validation] = Array.from(err.details.entries())[0];  
    const errorMessage = validation.details.map(d => d.message).join(', ');

    return res.status(400).json({
      success: false,
      message: errorMessage
    });
  }

  next(err);
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    const connection = await db.getConnection();
    await connection.ping(); // ✅ ping to confirm DB is reachable
    connection.release();    // release back to pool

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