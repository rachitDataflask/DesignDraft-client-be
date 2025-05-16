import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(201).json({ message: `${email} successfully registered` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: `User ${email} not found` });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    console.log("user ID ________", user._id);
    res
      .status(200)
      .json({ message: "Login successful", token, email: user.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { signup, login };
