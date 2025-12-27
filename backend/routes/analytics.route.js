import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { 
    trackView,
    getDashboardStats,
    getTopNews,
    getViewsOverTime,
    getRecentActivity,
    getPageBreakdown
} from "../controller/analytics.controller.js";

const router = express.Router();

// Public route - track views (no auth needed)
router.post("/track", trackView);

// Protected routes - require authentication
router.get("/stats", protectRoute, getDashboardStats);
router.get("/top-news", protectRoute, getTopNews);
router.get("/views-over-time", protectRoute, getViewsOverTime);
router.get("/recent-activity", protectRoute, getRecentActivity);
router.get("/page-breakdown", protectRoute, getPageBreakdown);

export default router;
