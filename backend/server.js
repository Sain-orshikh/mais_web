import path from "path";
import express from "express";
import dotenv from "dotenv";
import {v2 as cloudinary} from "cloudinary";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";

import newsRoutes from "./routes/news.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import eventRoutes from "./routes/event.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import activityRoutes from "./routes/activity.route.js";
import connectMongoDB from "./db/connectMongoDB.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Configure Cloudinary with WEBP B credentials for news
cloudinary.config({
    cloud_name: process.env.VITE_CLOUDINARY_ALUMNI_WEBP_B_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_ALUMNI_WEBP_B_API_KEY,
    api_secret: process.env.CLOUDINARY_ALUMNI_WEBP_B_API_SECRET,
}); 

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration - allow frontend to access backend
const allowedOrigins = [
    "http://localhost:3000",
    "https://mongolaspiration.edu.mn",
    "http://mongolaspiration.edu.mn",
    "https://www.mongolaspiration.com",
    "http://www.mongolaspiration.com",
    "https://mongolaspiration.com",
    "http://mongolaspiration.com",
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            return callback(new Error('CORS policy violation'), false);
        }
        return callback(null, true);
    },
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
}));

app.use(express.json({limit: "5mb"})); // to parse req.body
app.use(express.urlencoded({ extended: true })); // to parse form data
app.use(cookieParser());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/activities', activityRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'MAIS News Backend Server Running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
});
