import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import blockchainRoutes from './routes/blockchainRoutes.mjs';
import authRoutes from './routes/authRoutes.mjs';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', blockchainRoutes);

export default app;
