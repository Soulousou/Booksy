import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import axios from 'axios'
import { Toaster} from 'react-hot-toast'
import { UserContextProvider } from '../context/UserContext'
import './index.css'; 
import About from './pages/About'
import Dashboard from './pages/Dashboard'

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {


  return (
    <UserContextProvider>

      <Toaster position='center' toastOptions={{duration: 2000}}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
    </UserContextProvider >
  )
}

export default App
