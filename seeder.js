import mongoose from "mongoose";
import dotenv from "dotenv";
import ItemsModel from "./models/item.Model.js";
import items from "./utils/data.js";

import connectdb from "./config/db.js";
import("colors");
// config
dotenv.config();
connectdb();

// function seeder
const importData = async () => {
  try {
    await ItemsModel.deleteMany();
    const itemsData = await ItemsModel.insertMany(items);
    console.log(`All Items Added`.bgGreen.black);
    process.exit();
  } catch (error) {
    console.log(`${error}`.bgRed.inverse);
    process.exit(1);
  }
};

importData();
