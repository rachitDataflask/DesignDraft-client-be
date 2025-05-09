import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
dbConnect();

const app = express();

//Middleware
app.use(express.json());

//Routes
app.use("/auth", authRoutes);

//Start the server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
