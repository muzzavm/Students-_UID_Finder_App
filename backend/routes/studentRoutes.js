const express = require('express');
const router = express.Router();
const { searchStudent, addStudent } = require('../controllers/studentController');

router.get('/search', searchStudent);
router.post('/add', addStudent);

module.exports = router;