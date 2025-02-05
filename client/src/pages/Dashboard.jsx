import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import DashboardNavBar from "../components/DashboardNavBar";
import DeleteShelf from "../components/DeleteShelf";
import Bookshelf from "../components/Bookshelf";
import axios from 'axios';

export default function Dashboard() {
    const { user } = useContext(UserContext);
    const [shelves, setShelves] = useState([]);
    const [selectedShelf, setSelectedShelf] = useState("Default");
    const [newShelf, setNewShelf] = useState("");
    const [currentlyReading, setCurrentlyReading] = useState([]);
    const [wantToRead, setWantToRead] = useState([]);
    const [read, setRead] = useState([]);
    const [currentBooksInShelf, setCurrentBooksInShelf] = useState([]) //The books in this array changes dynamically according to the selected shelf
    const [showDeletePrompt, setShowDeletePrompt] = useState(false); // Show confirmation prompt


    // Fetch books from a shelf
    const fetchBooksByShelf = async (shelfName, setShelf) => {
        if (user.id) {
            try {
                const response = await axios.get(`/${user.id}/books?shelfName=${shelfName}`);
                setShelf(response.data);
            } catch (error) {
                console.error(`Error fetching books from ${shelfName}:`, error);
            }
        }
    };

    // Fetch user's shelves
    const fetchShelves = async () => {
        if (user.id) {
            try {
                const { data } = await axios.get(`/${user.id}/books/shelves`);
                setShelves(data.shelves || []);
            } catch (error) {
                console.error("Error fetching shelves:", error);
            }
        }
    };

    // Add a new shelf
    const addShelf = async () => {
        if (!newShelf.trim()) return;
        try {
            const { data } = await axios.put(`/${user.id}/books/shelves/add`, {
                shelfName: newShelf,
            });
    
            // Set the shelves state to the updated list returned from the backend
            setShelves(data.shelves || []);
    
            setNewShelf("");
        } catch (error) {
            console.error("Error adding shelf:", error);
        }
    };

    const updateShelfBooks = async (shelfName) => {
        try {
            const setShelfFunction = (shelfName === "Currently Reading") ? setCurrentlyReading :
                                     (shelfName === "Want To Read") ? setWantToRead :
                                     (shelfName === "Read") ? setRead :
                                     setCurrentBooksInShelf;
    
            const updatedBooks = await fetchBooksByShelf(shelfName, setShelfFunction);
            console.log(`Books for shelf ${shelfName} updated successfully.`);
        } catch (error) {
            console.error(`Error updating books for shelf ${shelfName}:`, error);
        }
    };


    // Fetch shelves when user changes
    useEffect(() => {
        if (user) {
            console.log("User: ", user.id)
            fetchBooksByShelf("Currently Reading", setCurrentlyReading);
            fetchBooksByShelf("Want To Read", setWantToRead);
            fetchBooksByShelf("Read", setRead);
            fetchShelves();
            console.log(shelves)
        }
    }, [user]);

    // Fetch books for the selected shelf
    useEffect(() => {
        if (user && selectedShelf !== "Default") {
            console.log(selectedShelf)
            fetchBooksByShelf(selectedShelf, setCurrentBooksInShelf);
        }
    }, [selectedShelf]);



    return (
        <div className="bg-greygreen text-textgreen h-screen flex flex-col poppins-light overflow-y-auto">
            <header className="mb-2 shadow w-full py-2 px-6">
                <DashboardNavBar />
            </header>
            <div className="flex flex-grow">
                <div className=" w-1/4 p-4 border-r">
                    <h2 className="text-xl font-bold">Reading Lists</h2>
                    <button onClick={() => setSelectedShelf("Default")} className="my-2 p-2 border rounded hover:bg-accentgreen/50 ">
                        Default Reading Lists
                    </button>
                    <ul>
                        {shelves.map((shelf) => (
                            <li
                                key={shelf._id}
                                onClick={() => setSelectedShelf(shelf.shelfName)}
                                className="p-2 border-b cursor-pointer hover:bg-accentgreen/50"
                            >
                                {shelf.shelfName}
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-row space-x-2 p-2 m-2">
                        <input
                            type="text"
                            value={newShelf}
                            onChange={(e) => setNewShelf(e.target.value)}
                            placeholder="Enter shelf name"
                            className=" py-2 px-3 border rounded w-2/3"  
                        />
                        <button 
                            onClick={addShelf} 
                            className=" px-4 border rounded hover:bg-accentgreen/50 hover:text-black w-1/3"  
                        >
                            + Add Shelf
                        </button>
                    </div>

                    {/* Delete Button */}
                    <div className="flex justify-center">
                    <button
                        onClick={() => setShowDeletePrompt(true)}
                        className="mt-5 p-2 w-[45%] border rounded bg-red/65 text-black hover:bg-red/80"
                    >
                        Delete Shelf
                    </button>
                    </div>
                </div>

                <div className="w-3/4 p-6">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <h2>Hi {user ? user.username : "Guest"} {user ? user.id : ""}</h2>

                    {selectedShelf === "Default" ? (
                        <>
                            <Bookshelf
                                shelfname="Currently Reading"
                                books={currentlyReading}
                                updateBook={(updatedBook) => {
                                    setCurrentlyReading(currentlyReading.map(book =>
                                        book.id === updatedBook.id ? updatedBook : book
                                    ));
                                }}
                                updateShelfBooks={updateShelfBooks}
                            />
                            <Bookshelf
                                shelfname="Want To Read"
                                books={wantToRead}
                                updateBook={(updatedBook) => {
                                    setWantToRead(wantToRead.map(book =>
                                        book.id === updatedBook.id ? updatedBook : book
                                    ));
                                }}
                                updateShelfBooks={updateShelfBooks}
                            />
                            <Bookshelf
                                shelfname="Read"
                                books={read}
                                updateBook={(updatedBook) => {
                                    setRead(read.map(book =>
                                        book.id === updatedBook.id ? updatedBook : book
                                    ));
                                }}
                                updateShelfBooks={updateShelfBooks}
                            />
                        </>
                    ) : (
                        <Bookshelf
                            shelfname={selectedShelf}
                            books={currentBooksInShelf}
                            updateBook={(updatedBook) => {
                                setCurrentBooksInShelf(currentBooksInShelf.map(book =>
                                    book.id === updatedBook.id ? updatedBook : book
                                ));
                            }}
                            updateShelfBooks={updateShelfBooks}
                        />
                    )}
                </div>
            </div>

            {/* Conditionally render the DeleteShelf component */}
            {showDeletePrompt && (
                <DeleteShelf 
                    user={user} 
                    shelves={shelves} 
                    setShelves={setShelves} 
                    setShowDeletePrompt={setShowDeletePrompt} 
                />
            )}
        </div>
    );
}