# Backend Create

## [A] - install dependancy

```
npm i express cors morgan colors dotenv nodemon
```

## [B] - Server Setup

### Env Variable List

```
PORT=8080
MONGO_URI=
```

```
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import "colors";
// dotenv config
dotenv.config();

//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extends: false }));
app.use(morgan("dev"));

// routes
app.use("/", (rq, res) => {
  res.send("<h1>POS Backend</h1>");
});

//port
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(`Server Running On http://localhost:${PORT}`);
});

```
