# Book Collection Manager

A full-stack web application for managing a personal book collection. This application allows users to add, view, update, and delete books, as well as manage user authentication.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Dockerization](#dockerization)
- [License](#license)

## Features

- User registration and authentication
- Add, view, update, and delete books
- Search and filter books by title and author
- Pagination support for book listings
- Responsive design for mobile and desktop users

## Technologies Used

- **Frontend:**
  - React.js
  - Redux
  - Axios
  - SweetAlert2, and react-toastify for alerts

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (with Mongoose)
  - JWT for authentication
  - bcrypt for password hashing

## Installation

### Prerequisites

- Node.js
- MongoDB

### Steps

1. Clone the repository:

  ```bash
    git clone https://github.com/gitgunawardhana/book-collection-manager.git
  ```

2. Navigate to the project directory:
  
  ```bash
    cd book-collection-manager
  ```

3. Set up your .env file in the both directories. You can refer to .env.example for required variables.

4. Install dependencies for the server:
  
  ```bash
    cd server
    yarn
  ```

5. Start the backend server:
  
  ```bash
    yarn dev
  ```

6. In a new terminal, navigate to the client directory:
  
  ```bash
    cd client
  ```

7. Install client dependencies:
  
  ```bash
    yarn
  ```
  
8. Start the client application:
  
  ```bash
    yarn start
  ```

9. Open your browser and navigate to `http://localhost:3000` to access the application.

## Usage

- Registration: Create a new account to start managing your book collection.
- Login: Log in with your credentials.
- Manage Books: Add new books to your collection, edit existing entries, or delete books.
- Search: Use the search functionality to find specific books in your collection.

## API Endpoints

### Authentication

- POST `/api/register`: Register a new user.
- POST `/api/login`: Log in a user and retrieve tokens.
- POST `/api/refresh-token`: Refresh the access token using a refresh token.

### Books

- GET `/api/books`: Retrieve a list of books with pagination and filtering options.
- POST `/api/books`: Add a new book to the collection.
- GET `/api/books/:id`: Retrieve a specific book by ID.
- PUT `/api/books/:id`: Update an existing book by ID.
- DELETE `/api/books/:id`: Delete a book by ID.

### Postmon Collection 
[book-collection-manager.postman_collection.zip](https://github.com/user-attachments/files/17518794/book-collection-manager.postman_collection.zip)

## Dockerization

This project can also be run using Docker. Follow these steps:

1. Make sure you have Docker installed on your machine.

2. Navigate to the root of your project directory.

3. Run the Docker container:

  ```bash
    docker-compose up --build
  ```

4. Open your browser and navigate to `http://localhost:3000` to access the application.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
