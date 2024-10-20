import React from "react";
import HeadingTitle from "../../base-component/HeadingTitle";
import ParaText from "../../base-component/ParaText";
import AddBookForm from "../../components/AddBookForm/AddBookForm";

const AddBook: React.FC = () => {

  return (
    <div className="py-5 sm:py-10">
      <HeadingTitle
        className=""
        bottomDescription="Manage Your Book Collection with Ease."
        topDescription="Organized Efficiency"
      >
        Add Book
      </HeadingTitle>
      <div className="mb-3 mt-9 bg-transparent pb-6">
        <AddBookForm />
      </div>
      <div className="mt-9 bg-transparent">
        <ParaText>
          Effortlessly organize and manage your book collection. Log in now to
          view, add, edit, and delete books. Experience seamless book management
          across all devices. Start maximizing your collection organization
          today with Your Book Library!
        </ParaText>
      </div>
    </div>
  );
};

export default AddBook;
