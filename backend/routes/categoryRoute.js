import express from "express";
import { requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();
// routes
// create category
router.post("/create-category", createCategoryController);

// update category
router.put("/update-category/:id",updateCategoryController);

// getAll categories
router.get("/get-category", categoryController);

// get single categories
router.get("/single-category/:slug", singleCategoryController);

// delete categories
router.delete("/delete-category/:id", deleteCategoryController);

export default router;
