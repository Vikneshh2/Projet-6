const express = require('express');
const bodyParser = require('body-parser')
const dns = require('node:dns/promises') // Détournement pour pouvoir se connecter
dns.setServers(["1.1.1.1", "1.0.0.1"]);

const mongoose = require('mongoose');
const path = require('path');


const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');


mongoose.connect('mongodb+srv://projet_livre:LivreProjet02445@cluster0.vmaby4x.mongodb.net/?appName=Cluster0')
    // ({ useNewUrlParser: true,
    // useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée !', error));


  const app = express();


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use(express.json());


app.use('/api/books', stuffRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));



module.exports = app; 