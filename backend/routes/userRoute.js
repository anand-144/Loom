import express from 'express';
import { loginUser, registerUser, adminLogin } from '../controllers/userController.js';
import userModel from '../models/userModel.js';

const router = express.Router();

// User routes
router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/admin/login', adminLogin);

// New route: List users (be cautious with privacy/security)
router.get('/list', async (req, res) => {
  try {
    const users = await userModel.find({}, { password: 0 }); // Exclude sensitive fields
    res.json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
