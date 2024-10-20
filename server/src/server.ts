import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from "morgan";
import connectDB from './config/db';
import allRoutes from "./routes/index";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(morgan("tiny"));

const PORT = process.env.PORT || 8080;

connectDB();

app.use("/api", allRoutes);

app.listen(PORT, () =>
  console.log("Server has started on port 8080")
);