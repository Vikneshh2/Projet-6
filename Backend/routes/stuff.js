//ce fichier permet d'avoir les différentes actions faisable sur le site en le reliant à cstuff
const express = require ('express');
const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('../middleware/multer-config')

const stuffCtrl = require ('../controllers/cstuff')




// app.post permet de poster un objet dans la base de donnée.
// save enregistreun Thing
router.post('/', auth, multer, stuffCtrl.createThing);

// put permet une modification 
// updateOne permet de update un élément 
router.put('/:id', auth, multer, stuffCtrl.modifyThing);


// delete permet de supprimer 
// deleteOne permet de supprimer un élément 
router.delete('/:id', auth, multer, stuffCtrl.deleteThing);

//app.get permet de recevoir une information
// findOne retourne seulement un seul Thing basé sur son id
router.get('/:id', auth, stuffCtrl.getOneThing);


//find retourne tous les Things
router.get('/', auth, stuffCtrl.getAllThings);


module.exports = router;