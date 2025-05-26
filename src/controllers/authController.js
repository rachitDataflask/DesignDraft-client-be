import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      username,
      password: hashPassword,
    });
    await newUser.save();

    res
      .status(201)
      .json({ message: `${email} ${username} successfully registered` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res.status(400).json({ message: `User ${identifier} not found` });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      email: user.email,
      username: user.username,
      user_id: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { signup, login };
