import express from "express";
import upload from "../middleware/upload.js";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// multiple fields handle karne ke liye
router.post(
  "/register",
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "cv", maxCount: 1 }
  ]),
  register
);


// Login
router.post("/login", login);

export default router;
