import React, { useState, useContext  } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/UserContext'; 
import catBooksy from '../assets/cat_booksy.png'; 
import SearchBarBooks from './SearchBarBooks';


export default function Navbar() {
  
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const logout = async () => {
    try {
      await axios.post("/logout");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="w-full py-4 px-6 poppins-light">
      <nav className="mx-auto flex justify-between items-center">
        {/* Left Section (Booksy & About) */}
        <div className="flex items-center space-x-3 relative">
          <Link to="/" className="relative group flex items-center">
            <img
              src={catBooksy}
              alt="Booksy Logo"
              className="w-12 h-12 object-contain cat-image"
            />
            <p className="text-lg font-bold text-textgreen booksy-title">Booksy</p>
          </Link>
          <Link to="/about" className="text-lg text-textgreen navbar-link">
            About
          </Link>
        </div>

        {/* Right Section (Search + Logout) */}
        <div className="flex flex-row space-x-5">
          <SearchBarBooks />
          <button 
            className='border border-stone rounded-xl p-2 hover:bg-accentgreen/75' 
            onClick={() => setShowModal(true)}
          >
            Log out
          </button>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-ivory p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold text-textgreen">Are you sure you want to log out?</h2>
            <div className="mt-4 flex justify-center space-x-4">
              <button 
                className="px-4 py-2 bg-red/75 text-ivory rounded hover:bg-red/85"
                onClick={logout}
              >
                Yes, Log Out
              </button>
              <button 
                className="px-4 py-2 bg-stone/75 text-ivory rounded hover:bg-stone/85"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}