import { Request, Response } from "express";
import { Book, BookDocument } from "../models/book";
import { UserDocument } from "../models/user";
import { Types } from "mongoose";

export const getBooks = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 3;
    const bookName = req.query.bookName || null; 
    const skip = (page - 1) * limit;

    const query: any = {};
    if (bookName) {
      query.title = { $regex: bookName, $options: 'i' }; 
    }

    const books = await Book.find(query)
      .populate('author', 'name -_id')
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    const transformedBooks = books.map((book) => {
      const populatedAuthor = book.author as UserDocument;
      return {
        ...book.toObject(),
        author: populatedAuthor.name,
      };
    });

    const totalBooks = await Book.find(query)
    .populate('author', 'name -_id');

    res.status(200).json({
      success: true,
      status: 200,
      message: "Books retrieved successfully",
      data: {
        currentPage: page,
        totalPages: Math.ceil(totalBooks.length / limit),
        totalBooks:totalBooks.length,
        books: transformedBooks,
        limit
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Internal server error",
      error: error.message || "An error occurred",
      data: null,
    });
  }
};


export const addBook = async (req: Request, res: Response) => {
  const { title, genre, publicationDate, image } = req.body;
  const userId = (req as any).user.id;

  if (!title || !genre || !publicationDate) {
    res.status(400).json({
      success: false,
      status: 400,
      message: "Title, genre, and publication date are required fields",
      data: null,
    });
    return
  }

  try {
    console.log("userId", userId)
    const book = new Book({
      title,
      author: new Types.ObjectId(userId),
      genre,
      publicationDate,
      image,
    });

    await book.save();

    res.status(201).json({
      success: true,
      status: 201,
      message: "Book added successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Internal server error",
      error: error.message || "An error occurred",
      data: null,
    });
  }
};

export const getBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(
      req.params.id
    );

    if (!book) {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Book not found",
        data: null,
      });
      return;
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Internal server error",
      error: error.message || "An error occurred",
      data: null,
    });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  const { title, genre, publicationDate, image } = req.body;
  const bookId = req.params.id;
  const userId = (req as any).user.id;

  try {
    
    const book = await Book.findById(bookId).populate("author", "_id") as BookDocument;

    if (!book) {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Book not found",
        data: null,
      });
      return
   }

   // Check authorization
   if (book.author?._id?.toString() !== userId.toString()) {
      res.status(403).json({
        success: false,
        status: 403,
        message: "You are not authorized to update this book",
        data: null,
      });
      return
   }

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { title, genre, publicationDate, image },
      { new: true }
    )
    .populate('author', 'name -_id');

    const populatedAuthor = updatedBook!.author as UserDocument;

    const transformedBook = {...updatedBook!.toObject(), author: populatedAuthor.name}

    res.status(200).json({
      success: true,
      status: 200,
      message: "Book updated successfully",
      data: transformedBook,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Internal server error",
      error: error.message || "An error occurred",
      data: null,
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const bookId = req.params.id;
  const userId = (req as any).user.id;

  try {
    const book = await Book.findById(bookId).populate("author", "_id") as BookDocument;

    if (!book) {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Book not found",
        data: null,
      });
       return
    }

    // Check authorization
    if (book.author?._id?.toString() !== userId.toString()) {
      res.status(403).json({
        success: false,
        status: 403,
        message: "You are not authorized to delete this book",
        data: null,
      });
       return
    }

    await Book.findByIdAndDelete(bookId);

    res.status(200).json({
      success: true,
      status: 200,
      message: "Book deleted successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Internal server error",
      error: error.message || "An error occurred",
      data: null,
    });
  }
};
