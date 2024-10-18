import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";

interface Book {
  _id?: string;
  title: string;
  author?: string;
  genre: string;
  publicationDate: string;
}

interface BooksState {
  books: Book[];
  loading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  books: [],
  loading: false,
  error: null,
};

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axiosInstance.get("/books");
  return response.data;
});

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async (updatedBook: Book) => {
    const { _id } = updatedBook;
    const response = await axiosInstance.put(`/books/${_id}`, updatedBook);
    return response.data;
  }
);

export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (bookId: string) => {
    const response = await axiosInstance.delete(`/books/${bookId}`);
    return response.data;
  }
);

export const addBook = createAsyncThunk(
  "books/addBook",
  async (updatedBook: Book) => {
    const response = await axiosInstance.post('/books', updatedBook);
    return response.data;
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch books";
        toast.error("Failed to fetch books", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: localStorage.getItem("darkMode") === "true" ? "dark" : "light",
        });
      })
      .addCase(updateBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBook = action.payload;
        const index = state.books.findIndex(
          (book) => book._id === updatedBook._id
        );
        if (index !== -1) {
          state.books[index] = updatedBook;
        }
        toast.success("Updated Successfull", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: localStorage.getItem("darkMode") === "true" ? "dark" : "light",
        });
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update book";
        toast.error("Failed to update book", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: localStorage.getItem("darkMode") === "true" ? "dark" : "light",
        });
      })
      .addCase(deleteBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.loading = false;
        const deletedBookId = action.payload.book._id;
        state.books = state.books.filter(book => book._id !== deletedBookId);
        toast.success("Deleted Successfull", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: localStorage.getItem("darkMode") === "true" ? "dark" : "light",
        });
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete book";
        toast.error("Failed to delete book", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: localStorage.getItem("darkMode") === "true" ? "dark" : "light",
        });
      })
      .addCase(addBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.loading = false;
        const newBook  = action.payload;
        state.books.push(newBook);
        // update state.books[]
        toast.success("Book Added Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: localStorage.getItem("darkMode") === "true" ? "dark" : "light",
        });
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to adding book";
        toast.error("Failed to adding book", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: localStorage.getItem("darkMode") === "true" ? "dark" : "light",
        });
      });
  },
});

export default booksSlice.reducer;
