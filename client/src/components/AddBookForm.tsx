import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setLoading } from "../features/auth/authSlice";
import { NavLink, useNavigate } from "react-router-dom";
import InputField from "../base-component/InputForm/InputField";
import Button from "../base-component/InputForm/Button";
import { ImSpinner9 } from "react-icons/im";
import { addBook } from "../features/books/booksSlice";

const AddBookForm: React.FC = () => {
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [title, setTitle] = useState("")
  const [genre, setGenre] = useState("")
  const [publicationDate, setPublicationDate] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('newBook', {title, genre, publicationDate})
    await dispatch(addBook({title, genre, publicationDate}));
    // dispatch(setLoading(false));
    // navigate(-1);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Title"
          type="text"
          className="focus:border-lime-green-100 dark:focus:border-lime-green-100"
          labelClassName="dark:bg-lime-green-300 peer-focus:text-lime-green-100 peer-focus:dark:text-lime-green-100"
          helperText={`Enter your username address to log in.`}
          onChange={(e)=> setTitle(e.target.value)}
          value={title}
        />
        <br />
        <InputField
          label="Genre"
          type="text"
          className="focus:border-lime-green-100 dark:focus:border-lime-green-100"
          labelClassName="dark:bg-lime-green-300 peer-focus:text-lime-green-100 peer-focus:dark:text-lime-green-100"
          helperText={`Enter your password to access your account. Make sure it's strong and unique for added security.`}
          onChange={(e)=> setGenre(e.target.value)}
          value={genre}
        />
        <br />
        <InputField
          label="Publication Date"
          type="date"
          className="focus:border-lime-green-100 dark:focus:border-lime-green-100"
          labelClassName="dark:bg-lime-green-300 peer-focus:text-lime-green-100 peer-focus:dark:text-lime-green-100"
          helperText={`Enter your password to access your account. Make sure it's strong and unique for added security.`}
          onChange={(e)=> setPublicationDate(e.target.value)}
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
      </form>
    </>
  );
};

export default AddBookForm;
