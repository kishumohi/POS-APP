import express from "express";
import {
  addItemController,
  getItemController,
} from "../controllers/itemController.js";

const router = express.Router();

//routes
// Method - GET
router.get("/get-item", getItemController);
router.post("/add-item", addItemController);

export default router;
