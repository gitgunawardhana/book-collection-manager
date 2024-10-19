import React from "react";
import { MdEditDocument, MdDeleteSweep } from "react-icons/md";
import Button from "../base-component/InputForm/Button";

interface Book {
  _id?: string;
  title: string;
  author?: string;
  genre: string;
  publicationDate: string;
  image?: string;
}

interface ItemCardDetailsProps {
  book: Book;
  handleEditClick: (book: any) => void;
  handleDeleteClick: (bookId: string) => Promise<void>;
}
const ItemCardDetails: React.FC<ItemCardDetailsProps> = ({
  book,
  handleEditClick,
  handleDeleteClick,
}) => {
  return (
    <>
      <div className="col-span-1">
        <img
          src={
            book!.image
              ? book!.image
              : "https://cdn.iconscout.com/icon/free/png-256/gallery-187-902099.png"
          }
          alt="Book"
          className="rounded-[6px] h-full w-full object-cover"
        />
      </div>
      <div className="col-span-3">
        <h2 className="cursor-default text-xl font-semibold text-lime-green-200 dark:text-lime-green-50 group-hover/card:text-lime-green-200 group-hover/card:dark:text-lime-green-50">
          {book.title}
        </h2>
        <p className="dark:text-lime-green-20 cursor-default">
          Author: {book.author}
        </p>
        <p className="dark:text-lime-green-20 cursor-default">
          Genre: {book.genre}
        </p>
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
            <span className="translate-y-[1px] group-hover:text-white">
              Delete
            </span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default ItemCardDetails;
