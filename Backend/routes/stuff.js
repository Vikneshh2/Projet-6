const express = require ('express');
const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('../middleware/multer-config')
const stuffCtrl = require ('../controllers/stuff')



router.post('/', auth, multer, stuffCtrl.createBook);

router.post('/:id/rating', stuffCtrl.rateBook);

router.put('/:id', auth, multer, stuffCtrl.modifyBook);

router.delete('/:id', auth, multer, stuffCtrl.deleteBook);

router.get('/bestrating', stuffCtrl.getBestRating);

router.get('/:id', stuffCtrl.getOneBook);

router.get('/', stuffCtrl.getAllBooks);


module.exports = router;