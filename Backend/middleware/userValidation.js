const { body, validationResult } = require('express-validator');


exports.signupValidationRules = [
  body('email')
    .trim()
    .notEmpty().withMessage('L\'email est obligatoire.')
    .isEmail().withMessage('Veuillez fournir une adresse email valide.')
    .normalizeEmail(),

  body('password')
    .trim()
    .notEmpty().withMessage('Le mot de passe est obligatoire.')
    .isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères.')
];


exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (errors.isEmpty()) {
    return next(); 
  }


  return res.status(400).json({ errors: errors.array() });
};