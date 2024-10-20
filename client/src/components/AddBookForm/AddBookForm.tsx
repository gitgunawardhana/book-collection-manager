import React, { useCallback, useState } from "react";
import { AppDispatch, RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../base-component/InputForm/InputField";
import Button from "../../base-component/InputForm/Button";
import { ImSpinner9 } from "react-icons/im";
import { addBook } from "../../features/books/booksSlice";
import { convertToBase64 } from "../../utils";
import { useDropzone } from "react-dropzone";
import ImageUploader from "../ImageUploader/ImageUploader";
import { IoIosCloseCircle } from "react-icons/io";

const AddBookForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [image, setImage] = useState<string>();
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

  const handleAvatarUpload = async (fileValue: any) => {
    const file = fileValue;
    const base64 = await convertToBase64(file);
    setImage(base64);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(addBook({ title, genre, publicationDate, image }));
  };

  const handleRemovePreview = async () => {
    setPreview(null);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5"
      >
        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
          <InputField
            label="Title"
            type="text"
            className="focus:border-lime-green-100 dark:focus:border-lime-green-100"
            labelClassName="dark:bg-lime-green-300 peer-focus:text-lime-green-100 peer-focus:dark:text-lime-green-100"
            helperText={`Enter your username address to log in.`}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <br />
          <InputField
            label="Genre"
            type="text"
            className="focus:border-lime-green-100 dark:focus:border-lime-green-100"
            labelClassName="dark:bg-lime-green-300 peer-focus:text-lime-green-100 peer-focus:dark:text-lime-green-100"
            helperText={`Enter your password to access your account. Make sure it's strong and unique for added security.`}
            onChange={(e) => setGenre(e.target.value)}
            value={genre}
          />
          <br />
          <InputField
            label="Publication Date"
            type="date"
            className="focus:border-lime-green-100 dark:focus:border-lime-green-100"
            labelClassName="dark:bg-lime-green-300 peer-focus:text-lime-green-100 peer-focus:dark:text-lime-green-100"
            helperText={`Enter your password to access your account. Make sure it's strong and unique for added security.`}
            onChange={(e) => setPublicationDate(e.target.value)}
            value={publicationDate}
          />
          <br />
          <Button
            type="submit"
            className="bg-lime-green-100 hover:bg-lime-green-200 active:!bg-lime-green-200 dark:bg-lime-green-100 hover:dark:text-[#232D45] dark:text-white hover:dark:bg-lime-green-50 transition-all"
          >
            {loading ? (
              <span className="w-14">
                <ImSpinner9 className="m-auto animate-spin" />
              </span>
            ) : (
              <span className="w-14">Add</span>
            )}
          </Button>
        </div>
        <div className="col-span-1 order-first sm:order-last">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : preview ? (
              <div className="w-full relative">
                <button
                  className="absolute z-10 right-0 m-2 text-black"
                  onClick={handleRemovePreview}
                >
                  <IoIosCloseCircle />
                </button>
                <img src={preview as string} alt="Upload preview" />
              </div>
            ) : (
              <ImageUploader />
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default AddBookForm;
