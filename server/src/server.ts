import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import allRoutes from "./routes/index";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

connectDB();

app.use("/api", allRoutes);

app.listen(PORT, () =>
  console.log("Server has started on port http://localhost:8080")
);