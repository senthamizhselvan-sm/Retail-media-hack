const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const dailyAssistantController = require('../controllers/dailyAssistantController');

// All routes are protected
router.use(protect);

// @route   GET /api/daily/advice
// @desc    Get daily business advice
// @access  Private
router.get('/advice', dailyAssistantController.getDailyAdvice);

// @route   GET /api/daily/insights
// @desc    Get daily insights
// @access  Private
router.get('/insights', dailyAssistantController.getDailyInsights);

// @route   POST /api/daily/insights
// @desc    Create daily insight
// @access  Private
router.post('/insights', dailyAssistantController.createInsight);

// @route   GET /api/daily/tips
// @desc    Get contextual tips
// @access  Private
router.get('/tips', dailyAssistantController.getContextualTips);

module.exports = router;