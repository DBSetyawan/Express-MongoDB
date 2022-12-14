import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import menuRoutes from "./routes";
import { generateToken } from './api/utils/jwt.utils';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  console.log('JWT', generateToken());
}


const PORT: string | number = process.env.PORT || 3349;

app.use(cors());
app.use(express.json());
app.use(menuRoutes);

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.zapo9.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
mongoose
  .connect(uri)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    throw error;
  });