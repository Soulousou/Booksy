const express = require('express');
const router = express.Router();
const cors = require('cors');
const { SearchBooks, addBookLibrary, getUserBooks, updateBookProgress, updateBookRating, getShelves, addShelf, removeShelf, addBookToShelf, removeBookFromShelf, removeBookFromUser } = require('../controllers/bookController.js');

router.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
})
);

//Book API
router.get("/searchbook", SearchBooks) //Calls Google API with query
router.post("/:userID/books", addBookLibrary); //Adds Book object to DB with user ID
router.delete('/:userID/books/:bookID', removeBookFromUser); //Removeds Book object to DB with user ID and book id
router.get('/:userID/books', getUserBooks); //If a shelfname is included in the query, get all books for that shelf. If not, all books for that user
router.put('/:userID/books/progress/:bookID', updateBookProgress); //Updates reading progress for specific book (bookID)
router.put('/:userID/books/rating/:bookID', updateBookRating); //Updates rating for specific book (bookID)
router.get("/:userID/books/shelves", getShelves); //Returns user's shelves (3 by default)
router.put("/:userID/books/shelves/add", addShelf); //Add a shelf to user
router.delete("/:userID/books/shelves/remove", removeShelf); //Remove a shelf to user
router.put("/:userID/books/shelves/book/add", addBookToShelf)
router.delete("/:userID/books/shelves/book/remove", removeBookFromShelf)

module.exports = router;