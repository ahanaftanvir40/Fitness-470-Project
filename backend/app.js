import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import connectDB from './config/db.js';
connectDB()

//importing routes
import userRoutes from './routes/userRoutes.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


//routes
app.use('/api', userRoutes)


export default app; 