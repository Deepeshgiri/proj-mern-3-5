import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getAllProducts,
  getSingleProduct,
  productPhotoController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
const router = express.Router();

// routes
// create product
router.post(
  "/create-product",
  requireSignIn,
  formidable(),
  createProductController
);

// get all products
router.get("/get-products", getAllProducts);

// get single products
router.get("/get-products/:slug", getSingleProduct);

// get photo
router.get("/product-photo/:pid", productPhotoController);

// delete product
router.delete("/delete-product/:pid",requireSignIn, deleteProductController);

// update product
router.put("/update-product/:pid",requireSignIn,updateProductController);

export default router;
