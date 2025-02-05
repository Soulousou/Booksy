## Booksy

Booksy is a digital reading journal designed to help book lovers track their reading habits, organize their books, and discover new reads.


- #### Features

  - **Log in / Register **: Users can register and log in only with username and password.
  - **Book Search:**: User can search books via the Google Books API and see the details of the books such as title, author, description...etc.
  - **Default shelves**: User have access to their own personal library that includes 3 default bookshelves: *Currently Reading, Want To Read and Read*.
    - **Bookshelf**: user can add/move/remove book from any bookshelf.
    - **Custom Bookshelves**: Organize books into personalized shelves.
    - **Rating**: Users can rate books from 1 to 5.

- #### Stack

  **Frontend**: react, javascripts, react-router-dom, TailwindCSS 

  **Backend**: nodeJS, express

  **Database**: mongoDB  (managed using Mongoose)

  **Authentication**: JSON Web Tokens (JWT): JSON Web Tokens (JWT)

  **API**: Google books API 

  

- #### Installation 

  Clone Repo

  ```
  git clone https://github.com/yourusername/Booksy.git
  cd Booksy
  ```
  Install dependencies

  ```
  npm install
  ```
  
  Create env file
  
  ```
  cd server
  touch .env
  open .env
  write “MONGO_URL=...(your mongo db database link)”
  JWT_SECRET=your_secret_key
  ```
    
  Start 
  
  ```
  // backend
  npm start
  //frontend
  cd frontend
  npm run dev
  ```
  
  
  
