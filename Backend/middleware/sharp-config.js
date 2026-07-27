const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = async (req, res, next) => {
  if (!req.file || !req.file.buffer) {
    return next();
  }

  try {
    if (!fs.existsSync('images')) {
      fs.mkdirSync('images');
    }


    const name = req.file.originalname.split(' ').join('_').split('.')[0];
    const timestamp = Date.now();
    const filename = `${name}_optimized_${timestamp}.webp`;
    const outputPath = path.join('images', filename);


    await sharp(req.file.buffer)
      .resize({ width: 450, fit: 'inside', withoutEnlargement: true })
      .toFormat('webp')
      .webp({ quality: 80 })
      .toFile(outputPath);

      
    req.file.filename = filename;

    next();
  } catch (error) {
    return res.status(500).json({ error: 'Erreur d\'optimisation d\'image : ' + error.message });
  }
};