import User from "../models/User";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};
//Controller for user registration
// POST: /api/users/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check if required fields are present
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    //Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser._id);

    return res
      .status(201)
      .json({ message: "User created successfully!", token, user: newUser });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Controller for user login
// POST: /api/users/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    //check password
    if (!user.comparePassword(password)) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    //return success message
    const token = generateToken(user._id);
    user.password = undefined;

    return res
      .status(200)
      .json({ message: "User login successful", token, user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
//Controller for getting user by ID
// GET: /api/users/data
export const getUserById = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // return user
    user.password = undefined;
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
