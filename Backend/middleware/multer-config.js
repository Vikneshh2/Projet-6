const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
  'image/webp': 'webp',

};


const storage = multer.memoryStorage();

const fileFilter = (req, file, callback) => {
  if (MIME_TYPES[file.mimetype]) {
    callback(null, true);
  } else {
    callback(new Error('Format image invalide ! Utilisez jpg, jpeg, png ou webp.'), false);
  }
};

module.exports = multer({ storage: storage, fileFilter: fileFilter }).single('image');