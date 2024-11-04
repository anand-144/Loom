import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Function to create JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Route for user login
const loginUser = async (req, res) => {
   try {

    const {email,password} = req.body;

    const user = await userModel.findOne({email});
    
    if (!user) {
        return res.json({success:false, message:"User doesn't exists"})
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
        const token = createToken(user._id)
        res.json({success:true,token})
    }

    else {
        res.json({success:false, message: "Invalid Credentail"})
    }

   } catch (error) {
    console.error('Error during registration:', error);
    res.json({ success: false, message: "Error registering user", error: error.message });
   }
};

// Route for user registration
const registerUser = async (req, res) => {
    try {
        console.log('Received registration request:', req.body);
        const { name, email, password } = req.body;

        console.log('Checking if user exists...');
        const exists = await userModel.findOne({ email });
        console.log('User check complete:', exists);

        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({ name, email, password: hashedPassword });
        const user = await newUser.save();

        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.error('Error during registration:', error);
        res.json({ success: false, message: "Error registering user", error: error.message });
    }
};

// Route for admin login
const adminLogin = async (req, res) => {
    // Admin login logic here
    res.json({ message: "Admin Login API Working" });
};

// Exporting functions
export { loginUser, registerUser, adminLogin };
