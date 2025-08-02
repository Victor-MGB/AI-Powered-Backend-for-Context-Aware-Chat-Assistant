const jwt = require("jsonwebtoken");
const User = require("../../model/User");
const bcrypt = require("bcryptjs");

// generate jwt token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// register controller
exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists", token: null });
    }

    // create new user
    const newUser = new User({ email, password });
    await newUser.save();

    // generate token
    const token = generateToken(newUser);
    res.status(201).json({
      message: "User registered successfully",
      token,
      newUser,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// login controller
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // generate token
    const token = generateToken(user);
    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET all users (admin-only recommended)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // exclude passwords
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};

// DELETE user by ID (admin or user themselves)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Optional: Check if requesting user is admin or owns account
    if (req.user.role !== 'admin' && req.user.id !== id) {
      return res.status(403).json({ message: "Not authorized to delete this user" });
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error: error.message });
  }
};