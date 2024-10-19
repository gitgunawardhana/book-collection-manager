import React, { useState } from "react";
import UpdateForm from "./UpdateForm";
import ItemCardDetails from "./ItemCardDetails";
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import { deleteBook, updateBook } from "../features/books/booksSlice";
import { convertToBase64 } from "../utils";

interface Book {
  _id?: string;
  title: string;
  author?: string;
  genre: string;
  publicationDate: string;
  image?: string;
}

interface ItemCardProps {
  book?: Book;
}

const ItemCard: React.FC<ItemCardProps> = ({ book }) => {
  const dispatch: AppDispatch = useDispatch();
  const [editedBook, setEditedBook] = useState({
    _id: "",
    title: "",
    genre: "",
    publicationDate: "",
    image: "",
  });
  const [editBookId, setEditBookId] = useState<string | null>(null);
  const [memo, setMemo] = useState<boolean | null>(false);

  const handleEditClick = (book: any) => {
    setEditBookId(book._id);
    setEditedBook({
      _id: book._id,
      title: book.title,
      genre: book.genre,
      publicationDate: new Date(book.publicationDate)
        .toISOString()
        .slice(0, 10),
      image: book.image,
    });
  };

  const handleAvatarUpload = async (fileValue: any) => {
    const file = fileValue;
    const base64 = await convertToBase64(file);
    setEditedBook({
      ...editedBook,
      image: base64,
    });
    setMemo(true);
  };

  const handleUpdateClick = async () => {
    memo && dispatch(updateBook(editedBook));
    setMemo(false);
    setEditBookId(null);
  };

  const handleDeleteClick = async (bookId: string) => {
    dispatch(deleteBook(bookId));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedBook({
      ...editedBook,
      [e.target.name]: e.target.value,
    });
    setMemo(true);
  };

  return (
    <li
      key={book!._id}
      className="group/card dark:bg-lime-green-250 hover:bg-lime-green-20 hover:dark:bg-lime-green-300 shadow-sm rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 transition-all"
    >
      <div className="md:flex-row p-2 md:grid gap-2 grid-cols-4 flex-col flex">
        {/* <div className="col-span-3"> */}
        {editBookId === book!._id ? (
          <UpdateForm
            editedBook={editedBook}
            book={book!}
            memo={memo}
            handleInputChange={handleInputChange}
            handleUpdateClick={handleUpdateClick}
            handleAvatarUpload={handleAvatarUpload}
          />
        ) : (
          <ItemCardDetails
            book={book!}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
          />
        )}
        {/* </div> */}
      </div>
    </li>
  );
};

export default ItemCard;
