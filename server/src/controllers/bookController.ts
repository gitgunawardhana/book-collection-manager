import { Request, Response } from "express";
import { Book, BookDocument } from "../models/book";
import { UserDocument } from "../models/user";
import { Types } from "mongoose";

export const getBooks = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1; // Default to page 1
    const limit = parseInt(req.query.limit as string, 10) || 3; // Default to 10 items per page
    const skip = (page - 1) * limit;

    // Fetch books with pagination
    const books = await Book.find()
      .populate('author', 'name -_id')
      .skip(skip)
      .limit(limit);

    // Transform books with populated author details
    const transformedBooks = books.map((book) => {
      const populatedAuthor = book.author as UserDocument;
      return {
        ...book.toObject(),
        author: populatedAuthor.name,
      };
    });

    // Get the total count of books in the database for pagination purposes
    const totalBooks = await Book.countDocuments();

    // Respond with the paginated books and pagination info
    res.json({
      currentPage: page,
      totalPages: Math.ceil(totalBooks / limit),
      totalBooks,
      books: transformedBooks,
      limit
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


export const addBook = async (req: Request, res: Response) => {
  const { title, genre, publicationDate } = req.body;
  const userId = (req as any).user.id; // Get the logged-in user's ID from the token

  if (!title || !genre || !publicationDate) {
     res.status(400).json({
      message: "Title, genre, and publication date are required fields",
    });
    return
  }

  try {
    // Create a new book with the logged-in user as the author
    console.log("userId", userId)
    const book = new Book({
      title,
      author: new Types.ObjectId(userId),  // Set the author to the authenticated user
      genre,
      publicationDate,
    });

    console.log("book", book)
    await book.save();  // Save the book in the database

    res.status(201).json(book);  // Respond with the newly created book
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(
      req.params.id
    );

    if (!book) {
      res.status(404).json({ error: "Book not found" });
      return;
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  const { title, genre, publicationDate } = req.body;
  const bookId = req.params.id;
  const userId = (req as any).user.id;

  try {
    
    const book = await Book.findById(bookId).populate("author", "_id") as BookDocument;

    if (!book) {
      res.status(404).json({ error: "Book not found" });
      return
   }

   // Check authorization
   if (book.author?._id?.toString() !== userId.toString()) {
      res.status(403).json({ error: "You are not authorized to update this book" });
      return
   }

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { title, genre, publicationDate },
      { new: true }
    );
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const bookId = req.params.id;
  const userId = (req as any).user.id;

  try {
    const book = await Book.findById(bookId).populate("author", "_id") as BookDocument;

    if (!book) {
       res.status(404).json({ error: "Book not found" });
       return
    }

    // Check authorization
    if (book.author?._id?.toString() !== userId.toString()) {
       res.status(403).json({ error: "You are not authorized to delete this book" });
       return
    }

    await Book.findByIdAndDelete(bookId);
    res.json({ message: "Book deleted", book});
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
