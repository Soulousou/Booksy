import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext'; 
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function BookInfo({ book, onClose, update }) {

  const { user } = useContext(UserContext);
  const userID = user.id

  const [selectedShelf, setSelectedShelf] = useState("Currently Reading");

  const handleAddToLibrary = async () => {
    console.log("User ID:", userID);
    if (!user) {
      alert("User not logged in!");
      return;
    }

    try {

      const response = await axios.post(
        `/${userID}/books`,
        {
          id: book.id,
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors?.join(", "),
          description: book.volumeInfo.description,
          image: book.volumeInfo.imageLinks?.thumbnail,
          pageCount: book.volumeInfo.pageCount,
          shelfName: selectedShelf, 
        }
      );
      update(selectedShelf)
      toast.success('Added Book!');
      onClose();

    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book.");
    }
  };


  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-ivory p-6 rounded-lg shadow-lg max-h-[80%] max-w-[50%]">
        <button
          onClick={onClose}
          className="absolute top-4 right-6 transition-transform transform hover:scale-150"
        >
          <FontAwesomeIcon icon={faXmark} size="xl" />
        </button>
        <div className="flex">
          <img
            src={book.volumeInfo.imageLinks?.thumbnail}
            alt={book.volumeInfo.title}
            className="w-[100%] h-[100%] rounded-lg mr-5"
          />
          <div className="flex flex-col text-justify">
            <h3 className="text-xl font-bold">{book.volumeInfo.title}</h3>
            <p className="text-sm font-semibold">{book.volumeInfo.authors?.join(", ")}</p>
            <p className="mt-4 text-sm">{book.volumeInfo.description}</p>
            
            {/* Shelf Selection Dropdown */}
            <div className="mt-4">
              <label htmlFor="shelf" className="text-sm font-medium mr-1">Select Shelf: </label>
              <select 
                id="shelf"
                value={selectedShelf}
                onChange={(e) => setSelectedShelf(e.target.value)}
                className="mt-2 p-2 border rounded"
              >
                <option value="Currently Reading">Currently Reading</option>
                <option value="Want To Read">Want to Read</option>
                <option value="Read">Read</option>
              </select>
            </div>

            <button
              className="mt-4 p-2 bg-accentgreen/50 text-white rounded-lg"
              onClick={handleAddToLibrary}
            >
              Add to Library
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

