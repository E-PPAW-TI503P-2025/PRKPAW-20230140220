const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { addUserData, isAdmin } = require('../middleware/permissionMiddleware');

// Gabungkan semua middleware dan handler ke dalam satu array
router.get('/daily', [addUserData, isAdmin, reportController.getDailyReport]);


module.exports = router;