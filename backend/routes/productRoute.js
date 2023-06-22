import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController } from "../controllers/productController.js";
import formidable from "express-formidable";
const router = express.Router();

// routes
// create product
router.post(
  "/create-product",
  requireSignIn,
  formidable,
  createProductController
);

export default router;
