const express = require ('express');
const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('../middleware/multer-config')
const stuffCtrl = require ('../controllers/stuff')
const sharp = require('../middleware/sharp-config');



router.post('/', auth, multer, sharp, stuffCtrl.createBook);

router.post('/:id/rating', auth, stuffCtrl.rateBook);

router.put('/:id', auth, multer, sharp, stuffCtrl.modifyBook);

router.delete('/:id', auth, multer, sharp, stuffCtrl.deleteBook);

router.get('/bestrating', stuffCtrl.getBestRating);

router.get('/:id', stuffCtrl.getOneBook);

router.get('/', stuffCtrl.getAllBooks);


module.exports = router;