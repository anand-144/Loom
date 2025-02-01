import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Function to create JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET , {expiresIn: "7d"});
};

// Route for user login
const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier can be email or contact
    let user;

    // Check if the identifier is an email or contact
    if (validator.isEmail(identifier)) {
      user = await userModel.findOne({ email: identifier });
    } else if (validator.isMobilePhone(identifier, "any")) {
      user = await userModel.findOne({ contact: identifier });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid email or contact",
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      return res.status(200).json({
        success: true,
        token,
        user: { name: user.name, email: user.email, contact: user.contact },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      success: false,
      message: "Error during login",
      error: error.message,
    });
  }
};

// Route for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, contact, password } = req.body;

    // Check if user exists by email or contact
    const emailExists = await userModel.findOne({ email });
    const contactExists = await userModel.findOne({ contact });

    if (emailExists || contactExists) {
      return res.status(400).json({
        success: false,
        message: "User with this email or contact already exists",
      });
    }

    // Validate email and contact
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }
    if (!validator.isMobilePhone(contact, "any")) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact number format",
      });
    }

    // Validate password
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // Hash password and save user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      contact,
      password: hashedPassword,
    });
    const user = await newUser.save();

    const token = createToken(user._id);
    return res.status(201).json({
      success: true,
      token,
      user: { name: user.name, email: user.email, contact: user.contact },
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    });
  }
};

// Route for admin login
const adminLogin = async (req, res) => {
  try {
      const { email, password } = req.body;

      if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
          // Create a token with the email as the payload
          const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" }); // Add expiration time for better security
          res.status(200).json({ success: true, token });
      } else {
          res.status(401).json({ success: false, message: "Invalid Credentials" });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
  }
};


// Exporting functions
export { loginUser, registerUser, adminLogin };
