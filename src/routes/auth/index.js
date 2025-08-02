const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
} = require('../../controllers/auth/controller');
const isAdmin = require('../../middlewares/isAdmin');

const authMiddleware = require('../../middlewares/authMiddleware');

// Public
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected
router.get('/users', authMiddleware, isAdmin, getAllUsers);
router.delete('/users/:id', authMiddleware, deleteUser);

module.exports = router;
