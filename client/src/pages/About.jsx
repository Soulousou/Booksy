import Navbar from '../components/Navbar'
import "../index.css"
import CatFooter from "../assets/cat_booksy_2.png"
import Timeline from '../components/Timeline'


const tools = [
  { heading: "FrontEnd", subheading: "React, Javascript, React Router", direction: "right" },
  { heading: "BackEnd", subheading: "NodeJS, Express", direction: "left" },
  { heading: "DataBase", subheading: "MongoDB", direction: "right" },
  { heading: "API", subheading: "Google Books API", direction: "left" },
];


export default function About() {
    return (
      <div className="bg-greygreen flex flex-col h-screen">
  
        <header className='mb-2 shadow'>
          <Navbar />
        </header>
  
        <main className="flex-1 py-5 px-6  text-textgreen flex justify-center items-start flex-grow overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl  p-12 space-y-8">
  
            {/* About Me Section */}
            <section className='text-center'>
              <h2 className="text-3xl font-bold mb-3 ">About Me</h2>
              <p className="text-lg text-justify">
                Hello! I’m Sara, the creator of Booksy. I’m passionate about reading, technology, and creating digital tools to enhance personal growth. 
                My goal with Booksy is to provide readers with a platform to organize, track, and reflect on their reading journey. I hope you find it useful and enjoy using it!
              </p>
            </section>
  
            {/* About the Website Section */}
            <section className='text-center'>
              <h2 className="text-3xl font-bold mb-3">About the Website</h2>
              <p className="text-lg text-justify">
                Booksy is your personal digital reading journal. With Booksy, you can easily manage your reading habits, track what you're currently reading, and organize your books into custom bookshelves. 
                You can also reflect on your progress by keeping a reading log and view your reading history. Whether you're a casual reader or a bookworm, Booksy is designed to make your reading experience more enjoyable and organized.
              </p>
            </section>
  
            <section className='text-center'>
            <h2 className="text-3xl font-bold mb-3">Technology</h2>
              <Timeline tools={tools} />
            </section>

          </div>
        </main>
  
        <footer className="bg-greygreen flex justify-center ">
          <div className="text-center py-4 flex items-center">
            <p className="text-sm text-textgreen">© 2025 Booksy</p>
            <img
                src={CatFooter}
                alt="Booksy Logo"
                className="w-12 h-12 object-contain"
            />
          </div>
        </footer>
  
      </div>
    );
  }