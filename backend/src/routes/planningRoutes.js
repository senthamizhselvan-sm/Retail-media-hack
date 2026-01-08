const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const planningController = require('../controllers/planningController');

// All routes are protected
router.use(protect);

// @route   GET /api/planning/calendar
// @desc    Get planning calendar
// @access  Private
router.get('/calendar', planningController.getPlanningCalendar);

// @route   GET /api/planning/recommendations
// @desc    Get offer recommendations
// @access  Private
router.get('/recommendations', planningController.getOfferRecommendations);

// @route   POST /api/planning/lock
// @desc    Lock a plan for future use
// @access  Private
router.post('/lock', planningController.lockPlan);

// @route   GET /api/planning/locked
// @desc    Get locked plans
// @access  Private
router.get('/locked', planningController.getLockedPlans);

// @route   DELETE /api/planning/locked/:id
// @desc    Delete locked plan
// @access  Private
router.delete('/locked/:id', planningController.deleteLockedPlan);

module.exports = router;