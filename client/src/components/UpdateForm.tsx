import React from 'react';
import { FaSave } from 'react-icons/fa';
import Button from '../base-component/InputForm/Button';

interface Book {
  _id?: string;
  title: string;
  author?: string;
  genre: string;
  publicationDate: string;
}

interface UpdateFormProps {
  editedBook: Book;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  book: Book;
  handleUpdateClick: () => Promise<void>;
  memo: boolean | null;
}

const UpdateForm: React.FC<UpdateFormProps> = ({
  editedBook,
  handleInputChange,
  book,
  handleUpdateClick,
  memo
}) => {
  return (
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
        onClick={handleUpdateClick}
      >
        <FaSave className="mr-2 w-4" />
        <span className="translate-y-[1px]">
          {memo ? "Update" : "Cancel"}
        </span>
      </Button>
    </>
  );
};

export default UpdateForm;
