import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../features/books/booksSlice";
import { AppDispatch, RootState } from "../app/store";
import PaginationContainer from "./PaginationContainer";
import { useDebounce } from "use-debounce";
import ItemCard from "./ItemCard";
import { ImSpinner9 } from "react-icons/im";

interface BookListProps {
  searchText: string;
}
const BookList: React.FC<BookListProps> = ({ searchText }: BookListProps) => {
  const [debouncedSearchText] = useDebounce(searchText, 1000);
  const [currentPage, setCurrentPage] = useState(
    Number(localStorage.getItem("currentPage")) || 1
  );

  const dispatch: AppDispatch = useDispatch();
  const { books, loading } = useSelector((state: RootState) => state.books);

  useEffect(() => {
    dispatch(
      fetchBooks({ page: currentPage, limit: 4, bookName: debouncedSearchText })
    );
  }, [dispatch, currentPage, debouncedSearchText]);

  if (loading)
    return (
      <div className="text-center p-4">
        <ImSpinner9 className="m-auto animate-spin" />
      </div>
    );

  if (books.length === 0)
    return (
      <div className="text-center flex justify-center p-4 h-36">
        <h1 className="m-auto opacity-30 bg-transparent text-center font-extrabold tracking-tight text-slate-500 antialiased dark:text-slate-400 text-2xl sm:text-3xl">
          No Books found
        </h1>
      </div>
    );
  return (
    <div className="container mx-auto p-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {books.map((book) => (
          <ItemCard book={book} />
        ))}
      </ul>
      <div className="pagination-controls">
        <PaginationContainer
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default BookList;
