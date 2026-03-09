import express from 'express';
import authRoutes from './src/routes/authRoutes.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './src/lib/db.js';
import messageRoutes from './src/routes/messageRoutes.js';
import cors from 'cors';
import { app, server } from './src/lib/socket.js';

dotenv.config();

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests from any localhost port (Vite auto-assigns ports)
        if (!origin || origin.startsWith('http://localhost')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
app.use(express.json({ limit: '5mb' }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    connectDB();
});
