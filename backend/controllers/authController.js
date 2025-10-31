// import User from "../models/User.js";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });
// };

// //  Register User
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const user = await User.create({ name, email, password });
//     res.status(201).json({
//       _id: user.id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user.id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// //  Login User
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (user && (await bcrypt.compare(password, user.password))) {
//       res.json({
//         _id: user.id,
//         name: user.name,
//         email: user.email,
//         token: generateToken(user.id),
//       });
//     } else {
//       res.status(400).json({ message: "Invalid credentials" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// //  Get User Profile (Protected)
// export const getUserProfile = async (req, res) => {
//   const user = await User.findById(req.user.id).select("-password");
//   res.json(user);
// };

import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// UPDATE: Add role to the token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//  Register User
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // The 'role' will be 'user' by default (from the schema)
    const user = await User.create({ name, email, password });
    
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role, // UPDATE: Send role back
      token: generateToken(user.id, user.role), // UPDATE: Pass role to token
    });
  } catch (error) {
    // Pass error to global error handler
    next(error); 
  }
};

//  Login User
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    
    // Now this check will work because the password is hashed
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role, // UPDATE: Send role back
        token: generateToken(user.id, user.role), // UPDATE: Pass role to token
      });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
     // Pass error to global error handler
    next(error);
  }
};

//  Get User Profile (Protected)
export const getUserProfile = async (req, res) => {
  // req.user is set by your 'protect' middleware
  const user = await User.findById(req.user.id).select("-password");
  res.json(user); // This will now include the 'role' field
};
