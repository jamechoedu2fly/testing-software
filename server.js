import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import categoryRoute from "./routes/categoryRoute.js";
import questionRoute from "./routes/questionRoute.js";
import authRoute from "./routes/authRoute.js";
import riaseccategoryroute from "./routes/riaseccategoryroute.js";
import cors from "cors";
import path from "path";

// config
dotenv.config();

// rest api
const app = express();

// database config
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/uploads", express.static(path.resolve("./uploads")));

// routers
app.use("/api/auth", authRoute);
app.use("/api/category", categoryRoute);
app.use("/api/question", questionRoute);

// RISSEC MODEL
app.use("/api/riasec/category", riaseccategoryroute);

// rest api's
app.get("/", (req, res) => {
  res.send("Welcome to jamecho");
});

// PORT
const PORT = process.env.PORT || 10000;

//listening
app.listen(PORT, () => {
  console.log(
    `Server running on ${process.env.DEV_MODE} mode at port ${PORT} 😎`
  );
});
