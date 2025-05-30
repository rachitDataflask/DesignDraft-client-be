import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import qeRoutes from "./routes/qeRoutes.js";
import calculations from "./routes/calculationRoutes.js"

dotenv.config();
dbConnect();

const app = express();

//Middleware
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api", projectRoutes);
app.use("/api", qeRoutes);
app.use("/api",calculations)

//Start the server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
