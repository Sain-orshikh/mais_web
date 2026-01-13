import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getAllActivities, getRecentActivities } from "../controller/activity.controller.js";

const router = express.Router();

router.get("/", protectRoute, getAllActivities);
router.get("/recent", protectRoute, getRecentActivities);

export default router;
