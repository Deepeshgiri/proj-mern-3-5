import express from "express";
import {
  registrationController,
  loginController,
  testController,
} from "../controllers/authController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";
// router object
const router = express.Router();

//routing
// registration || method POST
router.post("/register", registrationController);

// login // post
router.post("/login", loginController);

// private route
router.get("/test",requireSignIn ,testController);

// protected user route
router.get("/user-auth",requireSignIn,(req,res)=>{
   res.status(200).send({ok:true});
});

// protected admin route
router.get("/admin-auth",requireSignIn,(req,res)=>{
  res.status(200).send({ok:true});
});

export default router;
