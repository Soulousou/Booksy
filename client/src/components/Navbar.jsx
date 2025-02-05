import React, { useState, useContext  } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext'; 
import catBooksy from '../assets/cat_booksy.png'; 
import Login from "../pages/Login"
import Register from "../pages/Register"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {

  const { user } = useContext(UserContext); 

  const [isLoginOpen, setIsLoginOpen] = useState(false); 
  const [isRegisterOpen, setIsRegisterOpen] = useState(false); 

  const openLoginModal = () => {
    setIsLoginOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterOpen(false);
  };


  return (
    <div className="w-full py-4 px-6 poppins-light text-textgreen">
      <nav className="mx-auto flex justify-between items-center">
        {/* Left Section (Booksy & About) */}
        <div className="flex items-center space-x-3 relative">
          <Link to="/" className="relative group flex items-center">
            <img
              src={catBooksy}
              alt="Booksy Logo"
              className="w-12 h-12 object-contain cat-image"
            />
            <p className="text-lg font-bold  booksy-title">Booksy</p>
          </Link>
          <Link to="/about" className="text-lg navbar-link">
            About
          </Link>
        </div>

        {!user && (
          <div className="flex items-center space-x-3 bg-stone-800 textgreen border border-stone-500 rounded-full px-5 py-1 shadow-md">
            <button onClick={openLoginModal} className="text-lg navbar-link">
              Login
            </button>
            <span className="text-gray-500">|</span>
            <button onClick={openRegisterModal} className="text-lg login-link navbar-link">
              Register
            </button>
          </div>
        )}

      {user && (
        <div className="flex items-center space-x-3 bg-stone-800 textgreen border border-stone-500 rounded-full px-5 py-1 shadow-md">
          <Link to="/dashboard" className="text-lg textgreen navbar-link">
            Dashboard
          </Link>
          </div>
        )}
      </nav>

      {/* Login Modal (Overlay) */}
      {isLoginOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-ivory p-6 rounded-lg shadow-lg w-80">
            <button 
              onClick={closeLoginModal} 
              className="absolute top-4 right-6 transition-transform transform hover:scale-150 "
            >
              <FontAwesomeIcon icon={faXmark} size="xl"/>
            </button>
            <Login closeModal={closeLoginModal} />
          </div>
        </div>
      )}

      {/* Register Modal (Overlay) */}
      {isRegisterOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-ivory p-6 rounded-lg shadow-lg w-80">
            <button 
              onClick={closeRegisterModal} 
              className="absolute top-4 right-6 transition-transform transform hover:scale-150"
            >
              <FontAwesomeIcon icon={faXmark} size="xl" />
            </button>
            <Register closeModal={closeRegisterModal} />
          </div>
        </div>
      )}  
    </div>
  );
}
