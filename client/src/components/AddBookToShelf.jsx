import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-hot-toast";

export default function AddShelf({ book, updateShelfBooks}) {

    const { user } = useContext(UserContext)
    const [showDropdown, setShowDropdown] = useState(false);
    const [shelves, setShelves] = useState([])
    const [selectedShelf, setSelectedShelf] = useState("")


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

    const onSelectShelf = async (shelf) => {
        if (!user || !book) return;
    
        try {
            const response = await axios.put(`/${user.id}/books/shelves/book/add`, {
                shelfName: shelf.shelfName,
                bookID: book.id,
            });
    
            if (response.error) {
                toast.error(response.data.message);
            } else {
                setSelectedShelf(shelf);
                toast.success(`Book added successfully to ${shelf.shelfName}`);
    
                // Call the shared function to update the parent component's state
                if (updateShelfBooks) {
                    updateShelfBooks(shelf.shelfName);
                }
            }
        } catch (error) {
            console.error("Error adding book to shelf:", error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchShelves();
        }
    }, [user]);

    return (
        <div className="flex flex-col w-full max-w-[250px] relative ">
            {/* Button to toggle dropdown */}
            <div 
                className="flex justify-between items-center rounded-md border border-stone cursor-pointer w-full"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                <p className="truncate flex-1 p-2">{selectedShelf ? selectedShelf.shelfName : 'Add to a Shelf'}</p>
                <button className="px-3 py-2 bg-accentgreen/80 rounded-r-md">
                    <FontAwesomeIcon icon={faCaretDown} />
                </button>
            </div>

            {/* Dropdown list (only shown when `showDropdown` is true) */}
            {showDropdown && (
            <div className="absolute top-full mt-1 bg-ivory border border-stone rounded-md shadow-md w-full max-h-48 overflow-y-auto z-50">
                {shelves.length > 0 ? (
                    shelves.map((shelf, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                onSelectShelf(shelf);
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
    )
}
