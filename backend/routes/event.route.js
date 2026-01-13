import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { optionalAuth } from "../middleware/optionalAuth.js";
import { 
    getAllEvents, 
    getEvent, 
    createEvent, 
    updateEvent, 
    deleteEvent 
} from "../controller/event.controller.js";

const router = express.Router();

// GET routes allow public access for homepage, but provide admin context if authenticated
router.get("/", optionalAuth, getAllEvents);
router.get("/:id", optionalAuth, getEvent);

// Write operations require authentication
router.post("/", protectRoute, createEvent);
router.put("/:id", protectRoute, updateEvent);
router.delete("/:id", protectRoute, deleteEvent);

export default router;
