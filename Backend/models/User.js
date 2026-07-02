//ce fichier est un model user, unique validator permet d'avoir un user unique et améliore les message d'erreur lors de l'enregistrement
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator').default;

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);