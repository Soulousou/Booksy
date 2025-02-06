const axios = require('axios'); 
const User = require("../models/User");


const SearchBooks =  async (req, res) => {
    // Code for searching books

    const { query } = req.query;  
    const API_KEY = "AIzaSyBYP2AJ5PzcgjldyPnyy9utUeLoRxA_K4Y"
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&key=${API_KEY}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);  
        console.log(response.data)

    } catch (error) {

        res.status(500).json({ error: 'Error fetching books' });
    }
    
}

const addBookLibrary = async (req, res) => {
    try {
        const { userID } = req.params;

        const { id, title, authors, description, pageCount, image, shelfName } = req.body;

        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const existingBook = user.books.find(book => book.id === id);
        if (existingBook) {
            return res.status(200).json({ message: 'Book is already in your library' });
        }

        console.log(shelfName)
        const newBook = {
            id,
            title,
            authors,
            description,
            image,
            review: '',
            pageCount,
            pagenow: 0,
            rating: null,
            notes: [],
        };

        user.books.push(newBook);

        // Check if the shelf already exists
        let shelf = user.shelves.find(shelf => shelf.shelfName === shelfName);
        
        // If the shelf doesn't exist, create it
        if (!shelf) {
            shelf = { shelfName, bookIds: [id] };  // Add the new book directly to this shelf
            user.shelves.push(shelf);
        } else {
            // If the shelf exists, just add the book ID to the existing shelf
            if (!shelf.bookIds.includes(id)) {
                shelf.bookIds.push(id);
                console.log(shelfName)
            }
        }

        await user.save();
        res.status(201).json({ message: 'Book added successfully', book: newBook });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const getUserBooks = async (req, res) => {

    try {
        const { userID } = req.params; 
        const { shelfName } = req.query; 

        const user = await User.findById(userID);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (shelfName) {
            // If a shelfName is provided, filter books by that shelf
            const shelf = user.shelves.find(shelf => shelf.shelfName === shelfName);
            if (!shelf) return res.status(404).json({ message: "Shelf not found" });

            const booksOnShelf = user.books.filter(book => shelf.bookIds.includes(book.id));
            return res.status(200).json(booksOnShelf); // Return the books of that shelf
        } else {
            // If no shelfName is provided, return all books
            return res.status(200).json(user.books);
        }
    } catch (error) {
        console.error("Error fetching books:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};

const updateBookProgress = async (req, res) => {
    try {
        const { userID, bookID } = req.params;
        const { pagenow } = req.body;

        if (typeof pagenow !== 'number') {
            return res.status(400).json({ message: 'Invalid page number' });
        }

        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const book = user.books.find(b => b.id === bookID);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Update the progress
        book.pagenow = pagenow;

        await user.save();

        res.status(200).json({
            message: 'Book progress updated',
            book
        });

    } catch (error) {
        console.error('Error updating book progress:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateBookRating = async (req, res) => {
    try {
        const { userID, bookID } = req.params;
        const { rating } = req.body;

        if (typeof rating !== 'number') {
            return res.status(400).json({ message: 'Invalid rating' });
        }

        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const book = user.books.find(b => b.id === bookID);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Update the progress
        book.rating = rating;

        await user.save();

        res.status(200).json({
            message: 'Book rating updated',
            book
        });

    } catch (error) {
        console.error('Error updating book progress:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getShelves = async (req, res) => {
    try {
        const { userID} = req.params;


        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.shelves || user.shelves.length === 0) {
            return res.status(404).json({ message: 'No shelves found' });
        }

        res.status(200).json({
            message: 'Shelves found',
            shelves: user.shelves 
        });

    } catch (error) {
        console.error('Error finding shelves:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const addShelf = async (req, res) => {
    try {
        const { userID } = req.params;
        const { shelfName } = req.body;

        if (!shelfName) {
            return res.status(400).json({ message: "Shelf name is required" });
        }

        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Ensure shelves exist
        if (!user.shelves) {
            user.shelves = [];
        }

        // Check if the shelf already exists
        const shelfExists = user.shelves.some(shelf => shelf.shelfName === shelfName);
        if (shelfExists) {
            return res.status(400).json({ message: "Shelf already exists" });
        }

        // Add the new shelf
        user.shelves.push({ shelfName, bookIds: [] });
        await user.save();

        res.status(201).json({
            message: "Shelf added successfully",
            shelves: user.shelves,
        });
    } catch (error) {
        console.error("Error adding shelf:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const removeShelf = async (req, res) => {
    try {
        const { userID } = req.params; 
        const { shelfName } = req.body; 

        if (!shelfName) {
            return res.status(400).json({ message: "Shelf name is required" });
        }

        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Ensure the user has shelves
        if (!user.shelves || user.shelves.length === 0) {
            return res.status(400).json({ message: "No shelves found for this user" });
        }

        // Check if the shelf exists
        const shelfIndex = user.shelves.findIndex(shelf => shelf.shelfName === shelfName);
        if (shelfIndex === -1) {
            return res.status(404).json({ message: "Shelf not found" });
        }

        // Remove the shelf
        user.shelves.splice(shelfIndex, 1);
        await user.save();

        res.status(200).json({
            message: "Shelf removed successfully",
            shelves: user.shelves,
        });
    } catch (error) {
        console.error("Error removing shelf:", error);
        res.status(500).json({ message: "Server error" });
    }
};


const addBookToShelf = async (req, res) => {
    try {
        const { userID } = req.params;
        const { shelfName, bookID } = req.body;

        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the book in the user's library
        const book = user.books.find(book => book.id === bookID);
        if (!book) {
            return res.status(404).json({ message: "Book not found in the library" });
        }

        // Find the shelf
        let shelf = user.shelves.find(shelf => shelf.shelfName === shelfName);


        if (!shelf) {
            return res.status(404).json({ message: "Shelf not found" }); 
        }

        if (!shelf.bookIds.includes(bookID)) {
            shelf.bookIds.push(bookID);
            await user.save();
            return res.status(200).json({ message: "Book added to shelf successfully", shelf });
        } else {
            return res.status(200).json({ message: "Book is already in this shelf", shelf });
        }

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const removeBookFromShelf = async (req, res) => {
    try {
        const { userID } = req.params;
        const { shelfName, bookID } = req.body;
        console.log(req.body)
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the shelf
        let shelf = user.shelves.find(shelf => shelf.shelfName === shelfName);
        if (!shelf) {
            return res.status(404).json({ message: "Shelf not found" });
        }

        // Check if the book is on the shelf
        if (!shelf.bookIds.includes(bookID)) {
            return res.status(404).json({ message: "Book not found on this shelf" });
        }

        // Remove the book from the shelf
        shelf.bookIds = shelf.bookIds.filter(id => id !== bookID);
        await user.save();

        return res.status(200).json({ message: "Book removed from shelf successfully", shelf });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const removeBookFromUser = async (req, res) => {
    try {
        const { userID, bookID } = req.params;

        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await User.findByIdAndUpdate(userID, {
            $pull: { 
                books: { id: bookID }, 
                "shelves.$[].bookIds": bookID 
            }
        });

        return res.status(200).json({ message: "Book removed successfully" });

    } catch (error) {
        console.error("Error removing book:", error);
        res.status(500).json({ message: "Server error", error });
    }
};




module.exports = {SearchBooks, addBookLibrary, getUserBooks, updateBookProgress, 
    updateBookRating, getShelves, addShelf, removeShelf, addBookToShelf, removeBookFromShelf, removeBookFromUser}
