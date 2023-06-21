import express from 'express'
import { requireSignIn } from '../middlewares/authMiddleware'
import { createProductController } from '../controllers/productController'

const router = express.Router()

// routes 
// create product 
router.post('/create-product',requireSignIn,createProductController)

export default router