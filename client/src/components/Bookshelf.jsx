import React, { useState } from 'react';
import BookCard from './BookCard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Bookshelf({ shelfname, books, updateBook, updateShelfBooks }) {
    
    const [selectedBook, setSelectedBook] = useState(null);  

    const handleBookClick = (book) => {
        setSelectedBook(book);
    };

    const closeOverlay = () => {
        setSelectedBook(null);  
    };


    return (
        <div className="mt-6 shadow-[0px_5px_4px_0px_rgba(0,_0,_0,_0.1)]">
            <h2 className="text-xl font-semibold m-2">{shelfname}</h2>
            <div className="flex gap-4 overflow-x-auto m-2 p-2">
                {books.length > 0 ? (
                    books.map((book, index) => {
                        const progress = book.pagenow && book.pageCount ? (book.pagenow / book.pageCount) * 100 : 0;
    
                        return (
                            <div 
                                key={index} 
                                className="flex flex-col items-center w-32 h-48 p-2 shadow-sm rounded-md"
                            >
                                {/* Book Image */}
                                <img
                                    src={book.image}
                                    alt={book.title}
                                    className="w-20 h-28 rounded-md shadow cursor-pointer"
                                    onClick={() => handleBookClick(book)}
                                />
    
                                {/* Book Title */}
                                <p className="text-bold text-textgreen text-center mt-2 w-full text-sm truncate">
                                    {book.title}
                                </p>
    
                                {/* Progress Bar for "Currently Reading" */}
                                {shelfname === "Currently Reading" && (
                                    <div className="mt-2 w-full">
                                        <p className="text-xs text-center mb-1">{Math.ceil(progress)}%</p>
                                        <div className="w-full bg-ivory rounded-full h-2">
                                            <div
                                                style={{ width: `${progress}%` }}
                                                className={`h-full ${progress < 70 ? 'bg-accentgreen/80' : 'bg-accentgreen'} rounded-full`}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <p className="text-textgreen">No books in this shelf!</p>
                )}
            </div>
    
            {/* Book Information Overlay */}
            {selectedBook && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="relative space-y-8 bg-ivory p-4 rounded-lg max-w-[50vw]">
                        <button 
                            onClick={closeOverlay} 
                            className="p-2 absolute top-3 right-2 text-black transition-transform transform hover:scale-125"
                        >
                            <FontAwesomeIcon icon={faXmark} size="xl" />
                        </button>
    
                        {/* Book Card */}
                        <div className="mt-4 p-2 max-h-[90vh] overflow-y-auto"> 
                            <BookCard book={selectedBook} 
                                updateBook={updateBook}  
                                updateShelfBooks={updateShelfBooks} 
                                shelfname={shelfname} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

}

