// backend/routes/discountRoute.js
import express from "express";
import { getDiscount, updateDiscount } from "../controllers/discountController.js";
import adminAuth from "../middleware/adminAuth.js"; // Protects admin routes

const router = express.Router();

// Public endpoint: get current discount settings
router.get("/", getDiscount);

// Admin-only endpoint: update discount settings
router.put("/", adminAuth, updateDiscount);

export default router;
