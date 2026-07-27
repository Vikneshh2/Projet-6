const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const { signupValidationRules, validate } = require('../middleware/userValidation');


router.post('/signup', signupValidationRules, validate, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;