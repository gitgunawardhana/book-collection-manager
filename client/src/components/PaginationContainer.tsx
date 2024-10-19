import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { updateCurrentPage } from "../features/books/booksSlice";

interface PaginationContainerProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationContainer: React.FC<PaginationContainerProps> = ({
  currentPage,
  setCurrentPage,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const dispatch: AppDispatch = useDispatch();
  const { totalPages, totalBooks, limit } = useSelector(
    (state: RootState) => state.books
  );

  const handleResize = () => {
    setIsMobile(window.innerWidth < 640);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const pageRangeDisplayed = isMobile ? 2 : 5;
  const marginPagesDisplayed = isMobile ? 1 : 2;

  const handlePageClick = (event: any) => {
    const selectedPage = event.selected + 1;
    dispatch(updateCurrentPage(selectedPage));
    setCurrentPage(selectedPage);
  };
  return (
    <div className="flex flex-col items-center">
      <ReactPaginate
        previousLabel={
          <span className="sm:w-9 sm:h-9 w-8 text-sm h-8 flex items-center justify-center bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-md mr-4">
            <MdOutlineNavigateBefore />
          </span>
        }
        nextLabel={
          <span className="sm:w-9 sm:h-9 w-8 text-sm h-8 flex items-center justify-center bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-md">
            <MdOutlineNavigateNext />
          </span>
        }
        breakLabel={
          <span className="sm:w-9 sm:h-9 w-8 text-sm h-8 flex items-center justify-center border border-solid border-gray-300 dark:border-gray-700 hover:border-lime-green-100 rounded-md mr-4">
            ...
          </span>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={pageRangeDisplayed}
        pageCount={totalPages}
        marginPagesDisplayed={marginPagesDisplayed}
        containerClassName="flex items-center justify-center mt-10 mb-2 flex-wrap" // Added flex-wrap for responsiveness
        pageClassName="border border-solid border-gray-300 dark:border-gray-700 block hover:border-lime-green-100 sm:w-9 sm:h-9 w-8 text-sm h-8 flex items-center justify-center rounded-md mr-2 md:mr-4" // Adjusted margin
        activeClassName="dark:bg-lime-green-100 bg-lime-green-100 border border-solid !border-lime-green-100"
        initialPage={currentPage - 1}
        disabledLinkClassName="cursor-not-allowed"
      />
      <h1 className="text-center my-2 bg-transparent text-slate-500 antialiased dark:text-slate-400 text-sm md:text-base">
        Showing {Math.min(limit * currentPage, totalBooks!)} to {Math.min(limit * (currentPage + 1), totalBooks!)} of {totalBooks} results
      </h1>
    </div>
  );
};

export default PaginationContainer;
