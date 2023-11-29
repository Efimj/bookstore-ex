import { Box } from "@mui/material";
import { FC, ReactNode } from "react";
import { IBookInformation } from "../../interfaces/IBookInformation";
import InfiniteScroll from "react-infinite-scroll-component";
import BookBanner from "../BookBanner/BookBanner";
import { useNavigate } from "react-router-dom";
import { NavigateBookPageRoute } from "../../pages/BookPage/BookPage";

export interface IBookList {
  books: IBookInformation[];
  firstItem?: ReactNode;
  getNewBook: () => void;
  hasMoreBooks: boolean;
}

const BookList: FC<IBookList> = ({
  books,
  getNewBook,
  hasMoreBooks,
  firstItem,
}) => {
  const navigate = useNavigate();

  const handleBookClick = (bookId: number) => {
    navigate(NavigateBookPageRoute(bookId.toString()));
  };

  const getListSize = (): number => {
    if (firstItem) return books.length + 1;
    return books.length;
  };

  return (
    <InfiniteScroll
      dataLength={getListSize()}
      next={getNewBook}
      hasMore={hasMoreBooks}
      loader={""}
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        justifyContent: "flex-start",
      }}
    >
      {firstItem && (
        <Box
          sx={{
            marginRight: ".5rem",
            marginLeft: ".5rem",
            marginBottom: ".5rem",
            width: { xs: "45%", sm: "150px", md: "200px" },
          }}
        >
          {firstItem}
        </Box>
      )}
      {books.map((book, index) => {
        return (
          <Box
            sx={{
              marginRight: ".5rem",
              marginLeft: ".5rem",
              marginBottom: ".5rem",
              width: { xs: "45%", sm: "150px", md: "200px" },
            }}
            key={index}
          >
            <BookBanner
              book={book}
              onClick={() => handleBookClick(book.book.book_id)}
            />
          </Box>
        );
      })}
    </InfiniteScroll>
  );
};

export default BookList;
