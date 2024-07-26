import express from "express";
import {
  addItemController,
  getItemController,
  editItemController,
} from "../controllers/itemController.js";

const router = express.Router();

//routes

// Method - GET
router.get("/get-item", getItemController);

// Method - Post
router.post("/add-item", addItemController);

// Method - PUT
router.put("/edit-item", editItemController);
export default router;
