import React from 'react'
import Navbar from '../components/Navbar'
import { useContext } from "react";
import { UserContext } from '../../context/UserContext'; 
import "../index.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBookmark, faBoxes, faStar} from '@fortawesome/free-solid-svg-icons';
import { faClock } from "@fortawesome/free-regular-svg-icons"; 
import '@fortawesome/fontawesome-free/css/all.min.css'


export default function Home() {

  const { user } = useContext(UserContext);

  return (
    <div className="bg-greygreen flex flex-col h-screen justify-between overflow-y-auto">
      
      <header className='mb-2 shadow'>
        <Navbar/>
      </header>

      <main className="py-12 px-6 bg-gray-50 text-textgreen">
        <section className="welcome text-center mb-12">
          <h2 className="text-5xl font-semibold text-gray-800 mb-4 rochester-regular">Welcome to Booksy</h2>
          <h1>Welcome {user ? user.username : "Guest"}</h1>
            <p className="text-xl poppins-light">Your personal digital reading journal.</p>
        </section>

        <section className="features text-center poppins-light">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 ">What You Can Do</h3>
          <ul className="space-y-4 text-lg text-gray-700">
            <li >
              <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-3" />
              <strong className="font-bold text-gray-900">Search for Books</strong>
              <p>Find books you want to read.</p>
            </li>
            <li>
              <FontAwesomeIcon icon={faBookmark} className="mr-3" />
              <strong className="font-bold text-gray-900">Currently Reading</strong>
              <p>Keep track of what you’re reading.</p>
            </li>
            <li>
              <FontAwesomeIcon icon={faBoxes} className="mr-3" />
              <strong className="font-bold text-gray-900">Custom Bookshelves</strong>
              <p>Organize books into your own shelves.</p>
            </li>
            <li>
             <FontAwesomeIcon icon={faClock} className="mr-3" />
              <strong className="font-bold text-gray-900">Recently Read</strong>
              <p>See your reading history.</p>
            </li>
            <li>
              <FontAwesomeIcon icon={faStar}/>
              <FontAwesomeIcon icon={faStar}/>
              <FontAwesomeIcon icon={faStar}/>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <strong className="font-bold text-gray-900 ml-2">Reading Log</strong>
              <p>Rate your books.</p>
            </li>
          </ul>
      </section>
    </main>

    <footer className="">
      <div className="mx-auto text-center">
        <p className="text-sm text-ivory py-4">© 2025 Booksy. All rights reserved.</p>
      </div>
    </footer>
    </div>
  )
}
