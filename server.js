import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import "colors";
import connectdb from "./config/db.js";
import router from "./routes/itemRoutes.js";
// dotenv config
dotenv.config();

// connect db
connectdb();

//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extends: false }));
app.use(morgan("dev"));

// routes
app.use("/api/items", router);

//port
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(`Server Running On http://localhost:${PORT}`.bgCyan.black);
});