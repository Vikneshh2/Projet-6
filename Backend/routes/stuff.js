//ce fichier permet d'avoir les différentes actions faisable sur le site en le reliant à cstuff
const express = require ('express');
const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('../middleware/multer-config')

const stuffCtrl = require ('../controllers/stuff')




// app.post permet de poster un objet dans la base de donnée.
// save enregistreun Book
router.post('/', auth, multer, stuffCtrl.createBook);

// put permet une modification 
// updateOne permet de update un élément 
router.put('/:id', auth, multer, stuffCtrl.modifyBook);


// delete permet de supprimer 
// deleteOne permet de supprimer un élément 
router.delete('/:id', auth, multer, stuffCtrl.deleteBook);

//app.get permet de recevoir une information
// findOne retourne seulement un seul Book basé sur son id
router.get('/:id', stuffCtrl.getOneBook);


//find retourne tous les Books
router.get('/', stuffCtrl.getAllBooks);


module.exports = router;