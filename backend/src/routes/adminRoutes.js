const express = require('express');
const router = express.Router();
const { getAllUsers, updateUser, deleteUser, getStats, getLogs } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/auth');

router.use(protect);
router.use(adminOnly);

router.get('/users', getAllUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/stats', getStats);
router.get('/logs', getLogs);

module.exports = router;
