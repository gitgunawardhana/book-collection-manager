import React, { useState } from "react";
import BookList from "../components/BookList";
import InputField from "../base-component/InputForm/InputField";
import HeadingTitle from "../base-component/HeadingTitle";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";

const Home = () => {
  const [searchText, setSearchText] = useState<any>();
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <>
      <div className="container mx-auto p-4">
        <HeadingTitle
          className=""
          bottomDescription="Manage Your Book Collection with Ease."
        >
          Hello' <span className="text-lime-green-100 dark:text-lime-green-50">{user!.name}</span> ...
        </HeadingTitle>
        <br />
        <InputField
          label="Search Book"
          type="text"
          className="focus:!border-lime-green-100 border-solid !border-lime-green-200 dark:focus:border-lime-green-100"
          labelClassName="dark:bg-lime-green-300 peer-focus:!text-lime-green-100 !text-lime-green-200 dark:!text-lime-green-100 peer-focus:dark:text-lime-green-100"
          helperText={`Search from book name...`}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          value={searchText}
        />
      </div>
      <BookList searchText={searchText} />
    </>
  );
};

export default Home;
