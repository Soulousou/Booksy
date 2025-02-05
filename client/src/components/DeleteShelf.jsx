import React, { useState } from 'react';
import axios from 'axios';

export default function DeleteShelf({ user, shelves, setShelves, setShowDeletePrompt }) {
    const [selectedShelfToDelete, setSelectedShelfToDelete] = useState(null);

    const removeShelf = async () => {
        if (!selectedShelfToDelete) return;
        try {
            const { data } = await axios.delete(`/${user.id}/books/shelves/remove`, {
                data: { shelfName: selectedShelfToDelete },
            });
            setShelves(data.shelves);  
            setShowDeletePrompt(false);  
        } catch (error) {
            console.error("Error removing shelf:", error);
        }
    };

    // Close the delete prompt when clicking outside the modal
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setShowDeletePrompt(false);
        }
    };

    return (
        <div
            className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={handleOverlayClick} // Trigger closing the modal when clicking outside
        >
            <div className="bg-ivory p-6 h-[50%] rounded shadow-lg w-1/3">
                <h3 className="text-xl font-bold mb-4">Select a Shelf to Delete</h3>
                <select
                    className="border rounded p-2 w-full mb-4"
                    value={selectedShelfToDelete || ""}
                    onChange={(e) => setSelectedShelfToDelete(e.target.value)}
                >
                    <option value="">-- Select Shelf --</option>
                    {shelves && shelves.map((shelf) => (
                        <option key={shelf._id} value={shelf.shelfName}>
                            {shelf.shelfName}
                        </option>
                    ))}
                </select>

                {selectedShelfToDelete && (
                    <div className="mt-4 text-center">
                        <p>Are you sure you want to delete the shelf: "{selectedShelfToDelete}" ?</p>
                        <div className="mt-2 py-2">
                            <button
                                onClick={removeShelf}
                                className="bg-red/80 text-black px-4 py-2 m-2 rounded hover:bg-red/50 mr-4"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => setShowDeletePrompt(false)}
                                className="bg-accentgreen/70 text-black px-4 py-2 m-2 rounded hover:bg-accentgreen/90"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};