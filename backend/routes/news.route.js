import express from "express";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });
import { 
    createNews, 
    deleteNews, 
    fetchAllNews, 
    fetchNews, 
    updateNews,
    submitForApproval,
    approveNews,
    rejectNews
} from "../controller/news.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { optionalAuth } from "../middleware/optionalAuth.js";

const router = express.Router();

// Public routes (with optional auth to allow admin filtering)
router.get("/fetch/:id", fetchNews);
router.get("/fetch", optionalAuth, fetchAllNews);

// Protected routes (auth required)
router.post("/create", protectRoute, upload.single("image"), createNews);
router.put("/update/:id", protectRoute, upload.single("image"), updateNews);
router.delete("/delete/:id", protectRoute, deleteNews);

// Approval workflow routes
router.put("/:id/submit", protectRoute, submitForApproval);
router.put("/:id/approve", protectRoute, approveNews);
router.put("/:id/reject", protectRoute, rejectNews);

export default router;
