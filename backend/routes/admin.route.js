import express from "express";
import { getAllAdmins, createAdmin, deleteAdmin } from "../controller/admin.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getAllAdmins);
router.post("/", protectRoute, createAdmin);
router.delete("/:id", protectRoute, deleteAdmin);

export default router;
