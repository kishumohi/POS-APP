import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/userController.js";

const router = express.Router();

//routes

// Method - GET
router.post("/login", loginController);

// Method - Post
router.post("/register", registerController);

export default router;
