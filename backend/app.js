import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import connectDB from './config/db.js';
connectDB()

//importing routes
import userRoutes from './routes/userRoutes.js'
import healthTipsRoutes from './routes/healthTipsRoutes.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


//routes
app.use('/api/user', userRoutes)
app.use('/api/healthtips', healthTipsRoutes)


export default app; 