import express from "express";
import { getItemController } from "../controllers/itemController.js";

const router = express.Router();

//routes
// Method - GET
router.get("/get-item", getItemController);

export default router;
