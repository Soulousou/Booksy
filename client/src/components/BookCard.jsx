import React, { useState, useContext } from 'react';
import axios from "axios";
import { UserContext } from '../../context/UserContext'; 
import { toast } from 'react-hot-toast';
import RatingStars from './RatingStars';
import AddBookToShelf from './AddBookToShelf';
import RemoveBookToShelf from './RemoveBookToShelf';
import DeleteBook from './DeleteBook';


export default function BookCard({ book, updateBook, updateShelfBooks, shelfname }) {
    const { user } = useContext(UserContext);
    const { title, authors, image, description, pageCount, rating } = book;
    const [currentPage, setCurrentPage] = useState(book.pagenow);
    const [inputMode, setInputMode] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [bookRating, setBookRating] = useState(rating);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false); 
    
    const handlePageChange = (event) => {
        let input = event.target.value.trim();
        setInputValue(input);
    
        if (input === "") {
            if (inputMode === 'page') {
                setCurrentPage(0); 
            } else if (inputMode === 'percentage') {
                setCurrentPage(0); 
            }
        } else {
            if (inputMode === 'page') {
                let pageNumber = parseInt(input, 10);
                if (!isNaN(pageNumber) && pageNumber >= 0 && pageNumber <= pageCount) {
                    setCurrentPage(pageNumber);
                }
            } else if (inputMode === 'percentage') {
                let percentage = parseFloat(input);
                if (!isNaN(percentage) && percentage >= 0 && percentage <= 100) {
                    setCurrentPage(Math.floor((percentage / 100) * pageCount));
                }
            }
        }
    };
    
    const handleUpdateProgress = async () => {
        try {
            const response = await axios.put(
                `/${user.id}/books/progress/${book.id}`,
                { pagenow: currentPage }
            );
            toast.success('You successfully updated your reading progress');
            updateBook({ ...book, pagenow: currentPage });
    
        } catch (error) {
            console.error('Error updating book progress:', error);
        }
    
        setShowUpdate(false)
    };
    
    const handleUpdateRating = async (newRating) => {
        try {
            const response = await axios.put(
                `/${user.id}/books/rating/${book.id}`,
                { rating: newRating }
            );
            toast.success('You successfully updated your rating');
            setBookRating(newRating); 
            updateBook({ ...book, rating: newRating });
    
        } catch (error) {
            console.error('Error updating book rating:', error);
        }
    };
    
    const toggleUpdateSection = () => {
        setShowUpdate((prevShowUpdate) => !prevShowUpdate);
    };


    return (
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between">
        {/* Image and Rating Section */}
        <div className="flex flex-col items-center md:items-center md:w-1/3 pr-3">
            <img
                src={image}
                alt={title}
                className="w-32 h-48 object-cover rounded-lg shadow-md transform hover:scale-105 transition duration-300"
            />
            <div className="my-5">
                <RatingStars currentRating={bookRating} onRatingChange={handleUpdateRating} />
            </div>

            <div className='space-y-4'>
                <div className="relative">
                    <AddBookToShelf book={book} updateShelfBooks={updateShelfBooks} />
                </div>
                <div className="relative">
                    <RemoveBookToShelf book={book} updateShelfBooks={updateShelfBooks} shelfname={shelfname} />
                </div>
                <button 
                    onClick={() => setShowDeleteModal(true)}
                    className="bg-red/75 text-black px-4 py-2 rounded hover:bg-red/80"
                >
                    Delete Book
                </button>
            </div>
        </div>

        {/* Book Details Section */}
        <div className="flex flex-col md:w-2/3 md:pl-4 text-center md:text-left">
            <h3 className="text-2xl font-semibold">{title}</h3>
            <p className="text-lg">{authors}</p>

            {/* Centered Description and Progress Update */}
            <div className="mt-4 flex flex-col items-center space-x-2 justify-center">
                <p className="text-md text-textgreen text-justify">{description}</p>
                <h1 
                    onClick={toggleUpdateSection} 
                    className="mt-4 text-lg font-semibold text-accentgreen cursor-pointer hover:text-accentgreen/80"
                >
                    Update your progress!
                </h1>

                {/* Conditionally Render the Update Section */}
                {showUpdate && (
                    <div className='mt-4 flex flex-col items-center space-y-4'>
                        <div className='flex space-x-4 justify-center'>
                            <button 
                                onClick={() => setInputMode('page')} 
                                className="px-4 py-2 rounded border border-accentgreen hover:bg-accentgreen/80"
                            >
                                Enter a page number
                            </button>
                            <button 
                                onClick={() => setInputMode('percentage')} 
                                className="px-4 py-2 rounded border border-accentgreen hover:bg-accentgreen/80"
                            >
                                Enter a %
                            </button>
                        </div>

                        {/* Render Input for Page/Percentage */}
                        {inputMode && (
                            <div className="mt-5 flex flex-col items-center space-y-4">
                                <div className="flex items-center justify-center space-x-2 mb-2.5">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={handlePageChange}
                                        className="border rounded p-2 w-[60%]"
                                        placeholder={inputMode === 'page' ? "Enter page" : "Enter %"}
                                    />
                                    <p>{inputMode === "page" ? `${currentPage}/${pageCount}` : `${Math.ceil((currentPage / pageCount) * 100)}%`}</p>
                                </div>
                                <button
                                    onClick={handleUpdateProgress}
                                    className="bg-accentgreen/80 text-ivory rounded hover:bg-accentgreen p-2"
                                >
                                    Update Progress
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
        <div>
        {showDeleteModal && (
            <DeleteBook 
                book={book} 
                setShowDeleteModal={setShowDeleteModal} 
                />
            )}
        </div>

    </div>
    );
}