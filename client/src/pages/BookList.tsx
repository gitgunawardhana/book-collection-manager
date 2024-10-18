import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook, fetchBooks, updateBook } from "../features/books/booksSlice"; // Add the updateBook action
import { AppDispatch, RootState } from "../app/store";
import HeadingTitle from "../base-component/HeadingTitle";
import Button from "../base-component/InputForm/Button";
import { FaSave } from "react-icons/fa";import { MdEditDocument } from "react-icons/md";
import { MdDeleteSweep } from "react-icons/md";

const BookList = () => {
  
  const user = useSelector((state: RootState) => state.auth.user);
  console.log("user",user)
  const dispatch: AppDispatch = useDispatch();
  const { books, loading, error } = useSelector(
    (state: RootState) => state.books
  );

  // Local state for handling the currently edited book
  const [editBookId, setEditBookId] = useState<string | null>(null);
  const [memo, setMemo] = useState<boolean | null>(false);
  const [editedBook, setEditedBook] = useState({
    _id: "",
    title: "",
    genre: "",
    publicationDate: "",
  });

  useEffect(() => {
    dispatch(fetchBooks());
    console.log("books", books)
  }, [dispatch]);

  const handleEditClick = (book: any) => {
    setEditBookId(book._id);
    setEditedBook({
      _id: book._id,
      title: book.title,
      genre: book.genre,
      publicationDate: new Date(book.publicationDate)
        .toISOString()
        .slice(0, 10), // Format to YYYY-MM-DD for date input
    });
  };

  const handleUpdateClick = async () => {
    memo &&  dispatch(updateBook(editedBook))
    setMemo(false)
    setEditBookId(null); // Close edit mode after saving
  };
  
  const handleDeleteClick = async (bookId: string) => {
    dispatch(deleteBook(bookId))
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedBook({
      ...editedBook,
      [e.target.name]: e.target.value,
    });
    setMemo(true)
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <HeadingTitle
        className=""
        bottomDescription="Manage Your Book Collection with Ease."
      >
        {user!.name}
      </HeadingTitle>
      <br />
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {books.map((book) => (
          <li
            key={book._id}
            className="group/card dark:bg-lime-green-250 hover:bg-lime-green-20 hover:dark:bg-lime-green-300 shadow-sm rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 transition-all"
          >
            <div className="md:flex-row p-2 md:grid gap-2 grid-cols-4 flex-col flex">
              <div className="col-span-1">
                <img
                  src="https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg"
                  alt="Book"
                  className="rounded-[6px] h-full object-cover"
                />
              </div>
              <div className="col-span-3">
                {editBookId === book._id ? (
                  <>
                    <input
                      type="text"
                      name="title"
                      value={editedBook.title}
                      onChange={handleInputChange}
                      className="mb-[1.5px] text-xl font-semibold text-lime-green-100 dark:text-lime-green-100 group-hover/card:text-lime-green-100 group-hover/card:dark:text-lime-green-100 bg-transparent"
                    />
                    <br />
                    <input
                      type="text"
                      name="author"
                      value={book.author}
                      onChange={handleInputChange}
                      className="mb-[1.5px] text-gray-600 bg-transparent"
                      disabled
                    />
                    <br />
                    <input
                      type="text"
                      name="genre"
                      value={editedBook.genre}
                      onChange={handleInputChange}
                      className="mb-[1.5px] text-gray-600 bg-transparent"
                    />
                    <br />
                    <input
                      type="date"
                      name="publicationDate"
                      value={editedBook.publicationDate}
                      onChange={handleInputChange}
                      className="mb-[1.5px] text-gray-600 bg-transparent"
                    />
                    <br />
                    <Button
                      className="group my-0 rounded-full bg-[#e7e7e7] py-1 text-slate-700 hover:!bg-lime-green-100 hover:text-[#FFFFFF] dark:!bg-[#303d5e] dark:text-[#FFFFFF] dark:hover:!bg-lime-green-100"
                      onClick={() => handleUpdateClick()}
                    >
                      <FaSave className="mr-2 w-4" />
                      <span className="translate-y-[1px]">{memo ? "Update": "Cancel"}</span>
                    </Button>
                  </>
                ) : (
                  <>
                    <h2 className="cursor-default text-xl font-semibold text-lime-green-200 dark:text-lime-green-50 group-hover/card:text-lime-green-200 group-hover/card:dark:text-lime-green-50">
                      {book.title}
                    </h2>
                    <p className="dark:text-lime-green-20 cursor-default">Author: {book.author}</p>
                    <p className="dark:text-lime-green-20 cursor-default">Genre: {book.genre}</p>
                    <p className="dark:text-lime-green-20 cursor-default">
                      Publication Date:{" "}
                      {new Date(book.publicationDate).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button
                        className="group my-0 rounded-full bg-[#e7e7e7] py-1 text-slate-700 hover:!bg-[#d3d3d3] hover:text-slate-700 dark:!bg-[#303d5e] dark:text-[#FFFFFF] dark:hover:!bg-[#3c4c70]"
                        onClick={() => handleEditClick(book)}
                      >
                        <MdEditDocument className="mr-2 w-4 text-lime-green-100" />
                        <span className="translate-y-[1px]">Edit</span>
                      </Button>
                      <Button
                        className="group my-0 rounded-full bg-[#e7e7e7] py-1 text-slate-700 hover:!bg-[#c2410c] hover:text-slate-700 dark:!bg-[#303d5e] dark:text-[#FFFFFF] dark:hover:!bg-[#c2410c]"
                        onClick={() => handleDeleteClick(book._id!)}
                      >
                        <MdDeleteSweep className="mr-2 w-4 text-[#c2410c] group-hover:text-white" />
                        <span className="translate-y-[1px] group-hover:text-white">Delete</span>
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
