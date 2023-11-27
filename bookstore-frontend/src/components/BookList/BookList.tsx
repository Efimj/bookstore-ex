import { Box } from "@mui/material";
import { FC } from "react";
import { IBookInformation } from "../../interfaces/IBookInformation";
import InfiniteScroll from "react-infinite-scroll-component";
import BookBanner from "../BookBanner/BookBanner";
import { useNavigate } from "react-router-dom";

export interface IBookList {
  books: IBookInformation[];
  getNewBook: () => void;
  hasMoreBooks: boolean;
}

const BookList: FC<IBookList> = ({ books, getNewBook, hasMoreBooks }) => {
  const navigate = useNavigate();

  const handleBookClick = (bookId: number) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <InfiniteScroll
      dataLength={books.length}
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
