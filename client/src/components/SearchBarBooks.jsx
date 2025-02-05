import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SearchResults from "./SearchResults";
import BookInfo from "./BookInfo";  

export default function SearchBooks() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const fetchBooks = async () => {
    if (!query) return;

    try {
      const response = await axios.get(`/searchbook?query=${query}`);
      setBooks(response.data.items || []);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBooks();
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setShowModal(false); 
    setQuery("")
  };

  const onClose = () => {

    setShowModal(false)
    setQuery("")
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          placeholder="Search for a book"
          value={query}
          onChange={handleInputChange}
          className="w-full p-2 pr-10 rounded-lg border border-accentgreen focus:outline-none focus:ring-1 focus:ring-stone"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>


      {showModal && (
        <SearchResults
          books={books}
          onBookClick={handleBookClick}
          onClose={onClose}
        />
      )}

      {selectedBook && (
        <BookInfo book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
}
