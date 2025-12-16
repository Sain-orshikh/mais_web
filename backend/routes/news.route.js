import express from "express";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });
import { 
    createNews, 
    deleteNews, 
    fetchAllNews, 
    fetchNews, 
    updateNews
} from "../controller/news.controller.js";

const router = express.Router();

router.get("/fetch/:id", fetchNews);
router.get("/fetch", fetchAllNews);
router.post("/create", upload.single("image"), createNews);
router.put("/update/:id", upload.single("image"), updateNews);
router.delete("/delete/:id", deleteNews);

export default router;
