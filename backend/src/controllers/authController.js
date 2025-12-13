const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// @desc    Register new user (mock for testing without MongoDB)
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log(`🔓 Mock registration for: ${name} (${email})`);

    // Mock user creation (no database)
    const mockUser = {
      id: 'mock-user-' + Date.now(),
      name: name || 'Test User',
      email: email || 'test@example.com',
      role: 'user',
      avatar: 'https://via.placeholder.com/150',
    };

    // Generate mock token
    const token = 'mock-jwt-token-' + Date.now();

    res.status(201).json({
      success: true,
      token,
      user: mockUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Login user (mock for testing without MongoDB)
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(`🔓 Mock login for: ${email}`);

    // Mock user login (no database)
    const mockUser = {
      id: 'mock-user-' + Date.now(),
      name: 'Test User',
      email: email || 'test@example.com',
      role: 'user',
      avatar: 'https://via.placeholder.com/150',
    };

    // Generate mock token
    const token = 'mock-jwt-token-' + Date.now();

    res.json({
      success: true,
      token,
      user: mockUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get current user (mock for testing without MongoDB)
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    console.log('🔓 Mock /me endpoint called');

    // Return mock user data
    const mockUser = {
      id: 'mock-user-123',
      name: 'Test User',
      email: 'test@example.com',
      role: 'user',
      avatar: 'https://via.placeholder.com/150',
      createdAt: new Date().toISOString(),
    };

    res.json({
      success: true,
      user: mockUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully',
  });
};
