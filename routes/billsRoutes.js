import express from "express";
import {
  addBillsController,
  getBillsController,
} from "../controllers/billsController.js";

const router = express.Router();

//routes

// Method - Post
router.post("/add-bills", addBillsController);
router.get("/get-bills", getBillsController);

export default router;
