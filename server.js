import express from "express";
import dotenv from "dotenv";
import connectDB from './config/db.js';
import categoryRoute from "./routes/categoryRoute.js"
import questionRoute from "./routes/questionRoute.js"
import cors from "cors";

// config
dotenv.config();

// rest api
const app = express();

// database config
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// routers
app.use("/api/category", categoryRoute)
app.use("/api/question", questionRoute)

// rest api's
app.get("/", (req, res) => {
    res.send("Welcome to jamecho");
});

// PORT
const PORT = process.env.PORT || 8080;

//listening
app.listen(PORT, (req, res) => {
    console.log(
        `Server running on ${process.env.DEV_MODE} mode at port ${PORT} 😎`
    );
});
