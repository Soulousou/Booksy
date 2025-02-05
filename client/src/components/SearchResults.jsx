import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


export default function SearchResults({ query, books, onClose, onBookClick }) {
    
    const numBooks = books.length

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 ">
        <div className="relative bg-ivory p-6 rounded-lg shadow-lg  h-[80%%] max-w-[70%] ">

          <button 
            onClick={onClose} 
            className="absolute top-4 right-6 transition-transform transform hover:scale-125"
          >
            <FontAwesomeIcon icon={faXmark} size="xl" />
          </button>

          <h2 className="text-lg font-semibold mb-4 text-center">Search Results for {query}</h2>
  

          <div className="grid grid-cols-4 gap-4 overflow-y-auto max-h-[450px] p-2">
            {numBooks > 0 ? (
              books.map((book) => (
                <div key={book.id} className="flex flex-col items-center p-3 m-2 bg-white rounded-lg shadow-md hover:shadow-xl hover:shadow-green-forest hover:cursor-pointer" onClick={() => onBookClick(book)}>
                  <img 
                    src={book.volumeInfo.imageLinks?.thumbnail} 
                    alt={book.volumeInfo.title} 
                    className="w-24 h-32 object-cover rounded-md"
                  />
                  <h3 className="text-sm font-medium text-center mt-2">{book.volumeInfo.title}</h3>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full">No books found</p>
            )}
          </div>
        </div>
      </div>
    )
}
