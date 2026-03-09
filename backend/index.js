//const express = require('express');
import express from 'express';
import authRoutes from './src/routes/authRoutes.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {connectDB} from './src/lib/db.js';
import { protectRoute } from './src/middleware/protectRoute.js';
import messageRoutes from './src/routes/messageRoutes.js';
import cors from 'cors';


const app = express();
dotenv.config();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth" , authRoutes);
app.use("/api/messages" , messageRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    connectDB();
});
