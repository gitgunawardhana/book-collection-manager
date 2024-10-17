import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>
  console.log("Server has started on port http://localhost:8080")
);