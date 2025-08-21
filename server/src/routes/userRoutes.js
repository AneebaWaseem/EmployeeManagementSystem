import express from "express";
import upload from "../middleware/upload.js";
import { getUsers, getUserById, updateUser, deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);                // Get all users
router.get("/:id", getUserById);          // Get single user
router.put(
  "/:id",
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "cv", maxCount: 1 }
  ]),
  updateUser
);
router.delete("/:id", deleteUser);        // Delete user

export default router;
