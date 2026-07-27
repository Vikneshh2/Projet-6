const rateLimit = require('express-rate-limit');

exports.signupLimiter = rateLimit({
  windowMs: 20 * 60 * 1000, 
  max: 5, 
  message: {
    error: 'Trop de tentatives de création de compte. Veuillez réinstaller votre demande dans 20 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});