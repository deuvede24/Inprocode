import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { testConnection } from './db';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import recipeRoutes from './routes/recipeRoutes';
import commentRoutes from './routes/commentRoutes';
import favoriteRoutes from './routes/favoriteRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/recipes', recipeRoutes);
app.use('/comments', commentRoutes);
app.use('/favorites', favoriteRoutes);

const startServer = async () => {
  try {
    await testConnection();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();


