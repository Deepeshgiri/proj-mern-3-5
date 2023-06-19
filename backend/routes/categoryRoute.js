import express from "express";
import { requireSignIn } from "./../middlewares/authMiddleware.js";
import { createCategoryController } from "../controllers/categoryController.js";

const router = express.Router();
// routes
router.post("/create-category", requireSignIn, createCategoryController);

export default router;
