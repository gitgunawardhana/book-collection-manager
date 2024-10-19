import React, { useCallback, useState } from "react";
import { FaSave } from "react-icons/fa";
import Button from "../base-component/InputForm/Button";
import { IoIosCloseCircle } from "react-icons/io";
import { useDropzone } from "react-dropzone";
import ImageUploader from "./ImageUploader";

interface Book {
  _id?: string;
  title: string;
  author?: string;
  genre: string;
  publicationDate: string;
  image?: string;
}

interface UpdateFormProps {
  editedBook: Book;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  book: Book;
  handleUpdateClick: () => Promise<void>;
  handleAvatarUpload: (fileValue: any) => Promise<void>;
  memo: boolean | null;
}

const UpdateForm: React.FC<UpdateFormProps> = ({
  editedBook,
  handleInputChange,
  book,
  handleUpdateClick,
  handleAvatarUpload,
  memo,
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = new FileReader();

    file.onload = function () {
      setPreview(file.result);
    };

    file.readAsDataURL(acceptedFiles[0]);
    handleAvatarUpload(acceptedFiles[0]);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
    });

    const handleRemovePreview = async () => {
      setPreview(null);
    };
  return (
    <>
      <div className="col-span-1">
      <div className="col-span-1 order-first sm:order-last">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : preview ? (
              <div className="w-full relative">
                <button className="absolute z-10 right-0 m-2 text-black" onClick={handleRemovePreview}><IoIosCloseCircle /></button>
                <img src={preview as string} alt="Upload preview" />
              </div>
            ) : (
              <ImageUploader textShow={false}/>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-3">
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
      </div>
    </>
  );
};

export default UpdateForm;
