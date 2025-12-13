const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - verify JWT token (simplified for testing without MongoDB)
exports.protect = async (req, res, next) => {
  // Skip auth for testing - just create a mock user
  req.user = {
    id: 'test-user-123',
    name: 'Test User',
    email: 'test@example.com',
    role: 'user',
    isActive: true
  };
  
  console.log('🔓 Auth bypassed for testing (no MongoDB)');
  next();
  
  // Original auth code (commented out for testing):
  /*
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
      });
    }

    if (!req.user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'User account is disabled',
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route',
    });
  }
  */
};

// Admin only middleware
exports.adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. Admin only.',
    });
  }
};
