import express from "express";
import {
  addItemController,
  getItemController,
  editItemController,
  deleteItemController,
} from "../controllers/itemController.js";

const router = express.Router();

//routes

// Method - GET
router.get("/get-item", getItemController);

// Method - Post
router.post("/add-item", addItemController);

// Method - PUT
router.put("/edit-item", editItemController);

// Method - Delete
router.post("/delete-item", deleteItemController);

export default router;
