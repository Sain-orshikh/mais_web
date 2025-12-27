import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { 
    getAllEvents, 
    getEvent, 
    createEvent, 
    updateEvent, 
    deleteEvent 
} from "../controller/event.controller.js";

const router = express.Router();

// All event routes require authentication
router.get("/", protectRoute, getAllEvents);
router.get("/:id", protectRoute, getEvent);
router.post("/", protectRoute, createEvent);
router.put("/:id", protectRoute, updateEvent);
router.delete("/:id", protectRoute, deleteEvent);

export default router;
