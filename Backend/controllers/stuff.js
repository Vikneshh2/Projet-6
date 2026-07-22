const Book = require('../models/Book');

const fs = require('fs');


exports.createBook = (req, res, next) => {
   const bookObject = JSON.parse(req.body.book);
   delete bookObject._id;
   delete bookObject._userId;
   const newBook = new Book({
       ...bookObject,
       userId: req.auth.userId,
       imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
   });
 
   newBook.save()
   .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
   .catch(error => { res.status(400).json( { error })})
};



exports.modifyBook = (req, res, next) => {
   const bookObject = req.file ? {
       ...JSON.parse(req.body.book),
       imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
   } : { ...req.body };
 
   delete bookObject._userId;
   Book.findOne({_id: req.params.id})
       .then((book) => {
           if (book.userId != req.auth.userId) {
               res.status(401).json({ message : 'Not authorized'});
           } else {
               Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
               .then(() => res.status(200).json({message : 'Objet modifié!'}))
               .catch(error => res.status(401).json({ error }));
           }
       })
       .catch((error) => {
           res.status(400).json({ error });
       });
};


exports.deleteBook = (req, res, next) => {
   Book.findOne({ _id: req.params.id})
       .then(book => {
           if (book.userId != req.auth.userId) {
               res.status(401).json({message: 'Not authorized'});
           } else {
               const filename = book.imageUrl.split('/images/')[1];
               fs.unlink(`images/${filename}`, () => {
                   Book.deleteOne({_id: req.params.id})
                       .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                       .catch(error => res.status(401).json({ error }));
               });
           }
       })
       .catch( error => {
           res.status(500).json({ error });
       });
};



exports.getAllBooks = (req, res, next) => {
  Book.find()
    .then(books => {
      const booksArondis = books.map(function(book) {
        book.averageRating = parseFloat(book.averageRating.toFixed(1));
        return book;
      });
      res.status(200).json(booksArondis);
    })
    .catch(error => res.status(400).json({ error }));
};

exports.getOneBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then(book => {
      book.averageRating = parseFloat(book.averageRating.toFixed(1));
      res.status(200).json(book);
    })
    .catch(error => res.status(404).json({ error }));
};

function ratingCompare(a, b) {
  if (b.averageRating > a.averageRating) {
    return 1
  }
  else if (b.averageRating < a.averageRating) {
    return -1
  }
  else {
    return 0 
  }
}

exports.getBestRating = (req, res, next) => {
  Book.find()
    .then(books => {
      let booksTries = books;
    
      booksTries.sort (ratingCompare);

      let top3 = [];
      for (let i = 0; i < 3; i++) {
        if (booksTries[i]) {
          top3.push(booksTries[i]);
        }
      }
      
      res.status(200).json(top3);
    })
    .catch(function(error) {
      res.status(400).json({ error: error });
    });
};



exports.rateBook = (req, res, next) => {
  let noteUtilisateur = req.body.rating;
  

  if (noteUtilisateur < 0) {
    return res.status(400).json({ message: 'La note ne peut pas être négative' });
  }
  if (noteUtilisateur > 5) {
    return res.status(400).json({ message: 'La note ne peut pas dépasser 5' });
  }

  Book.findOne({ _id: req.params.id })
    .then(function(book) {
      
      let dejaNote = false;
      for (let i = 0; i < book.ratings.length; i++) {
        if (book.ratings[i].userId === req.auth.userId) {
          dejaNote = true;
          break
        }
      }
      
      if (dejaNote === true) {
        return res.status(400).json({ message: 'Vous avez déjà noté ce livre !' });
      }

      let nouvelleNote = {
        userId: req.auth.userId,
        grade: noteUtilisateur
      };
      book.ratings.push(nouvelleNote);

      let total = 0;
      for (let i = 0; i < book.ratings.length; i++) {
        total = total + book.ratings[i].grade;
      }
      book.averageRating = parseFloat((total / book.ratings.length).toFixed(1));

      book.save()
        .then(function(bookMisAJour) {
          res.status(200).json(bookMisAJour);
        })
        .catch(function(error) {
          res.status(400).json({ error: error });
        });
    })
    .catch(function(error) {
      res.status(404).json({ error: error });
    });
};