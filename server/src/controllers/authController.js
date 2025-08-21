import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    console.log("BODY ===>", req.body);
console.log("FILES ===>", req.files);

    const { fullName, email, role, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Files path
    const profilePic = req.files?.profilePic ? req.files.profilePic[0].path : null;
    const cv = req.files?.cv ? req.files.cv[0].path : null;

    // User create
    const user = await User.create({
      fullName,
      email,
      role,
      password: hashedPassword,
      profilePic,
      cv
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find User
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // 2. Password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // 3. JWT token generate
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
        cv: user.cv,
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};