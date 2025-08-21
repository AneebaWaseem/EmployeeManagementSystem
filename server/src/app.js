import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//static folder for file access
app.use("/uploads", express.static("uploads")); 

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);  

export default app;
