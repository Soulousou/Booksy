import React, { useContext } from 'react'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';

export default function DeleteBook({ book, setShowDeleteModal }) {

    const { user } = useContext(UserContext)

    const deleteBook = async () => {
        try {
            const response = await axios.delete(`/${user.id}/books/${book.id}`);
            if (response.data) {
                toast.success("Book deleted successfully!");
                setShowDeleteModal(false);  
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error deleting book:", error);
            toast.error("An error occurred while deleting the book.");
        }
    };

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-ivory p-6 w-[30%] rounded shadow-lg">
                <h3 className="text-xl font-bold mb-4">Delete Book</h3>
                <p className="mb-4">Are you sure you want to delete the book: <strong>{book.title}</strong>?</p>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={deleteBook}
                        className="bg-red/75 text-black px-4 py-2 rounded hover:bg-red/85"
                    >
                        Yes, Delete
                    </button>
                    <button
                        onClick={() => setShowDeleteModal(false)} 
                        className="bg-accentgreen text-black px-4 py-2 rounded hover:bg-accentgreen/80"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

