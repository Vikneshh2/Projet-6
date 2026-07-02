//ce fichier permet de gérer la création d'un user
// avec bcrypt, on peut hash le mot de pass, cad de crypter le mdp et l'enregistrer de manière sécuriser
// salt nb de tour, plus le nb de tours est élevé plus la fonction sera longue 
// compare de bcpryt permet de comparer un le mdp entré avec le mdp de dans la base donneé

const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken')
const User = require ('../models/User');

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User( {
      email: req.body.email,
      password: hash
    });
    user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
  })
  .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {
    User.findOne({email:req.body.email})
    .then(user => {
      if (user === null) {
        res.status(401).json ({message: 'Identifiant ou mot de passe inccorect'});
      } else {
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            res.status(401).json ({message: 'Identifiant ou mot de passe inccorect'});
          } else {
            res.status(200).json ({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id},
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h'}
              )
            })
          }
        })
      }
    })
    .catch(error => res.status(500).json({error}));
};