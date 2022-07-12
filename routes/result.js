const express = require('express');
const router = express.Router();

const { sendEmail } = require('../controllers/result');

router.post('/result', sendEmail);

module.exports = router;