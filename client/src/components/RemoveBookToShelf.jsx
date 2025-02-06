import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-hot-toast";

export default function RemoveBookToShelf({book, updateShelfBooks}) {

    const { user } = useContext(UserContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const [shelves, setShelves] = useState([]);
    const [selectedShelf, setSelectedShelf] = useState(null);

    const fetchShelves = async () => {
        if (user?.id) {
            try {
                const { data } = await axios.get(`/${user.id}/books/shelves`);
                setShelves(data.shelves || []);
            } catch (error) {
                console.error("Error fetching shelves:", error);
            }
        }
    };

    const handleRemoveBook = async (shelf) => {  // ✅ Fix: Accept `shelf` as parameter
        if (!user || !book || !shelf) return;
        
        try {
            console.log("Removing from shelf:", shelf.shelfName);
            const response = await axios.delete(`/${user.id}/books/shelves/book/remove`, {
                data: {
                    shelfName: shelf.shelfName,  // ✅ Fix: Use `shelf.shelfName` instead of `selectedShelf`
                    bookID: book.id,
                },
            });

            if (response.error) {
                console.log(response.data.message);
                toast.error(response.data.message);
            } else {
                console.log("Book removed successfully:", response.data);
                toast.success(`Book removed successfully from ${shelf.shelfName}`);

                if (updateShelfBooks) {
                    updateShelfBooks(shelf.shelfName);
                }
            }
        } catch (error) {
            console.error("Error removing book from shelf:", error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchShelves();
        }
    }, [user]);

  return (
    <div className="flex flex-col w-full max-w-[250px] relative">
            <div 
                className="flex justify-between items-center rounded-md border border-stone cursor-pointer w-full"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                <p className="truncate flex-1 p-2">Remove from a Shelf</p>
                <button className="px-3 py-2 bg-red-500 rounded-r-md  bg-red/80 text-black">
                    <FontAwesomeIcon icon={faCaretDown} />
                </button>
            </div>

            {showDropdown && (
            <div className="absolute top-full mt-1 bg-ivory border border-stone rounded-md shadow-md w-full max-h-48 overflow-y-auto z-50">
                {shelves.length > 0 ? (
                    shelves.map((shelf, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                handleRemoveBook(shelf);
                                setShowDropdown(false);
                            }}
                            className={`p-2 cursor-pointer shadow-lg text-center hover:bg-accentgreen/80 ${selectedShelf === shelf ? 'bg-accentgreen text-white' : ''}`}
                        >
                            {shelf.shelfName}
                        </div>
                    ))
                ) : (
                    <p className="p-2 text-center">No shelves available</p>
                )}
            </div>
        )}
        </div>
    );

}
