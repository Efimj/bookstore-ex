import { Box, Skeleton } from "@mui/material";
import { FC, ReactNode, useEffect } from "react";
import { IBookInformation } from "../../interfaces/IBookInformation";
import BookBanner from "../BookBanner/BookBanner";
import { useNavigate } from "react-router-dom";
import { NavigateBookPageRoute } from "../../pages/BookPage/BookPage";
import useInfiniteScroll from "react-infinite-scroll-hook";

export interface IBookList {
  books: IBookInformation[];
  firstItem?: ReactNode;
  getNewBook: () => void;
  hasMoreBooks: boolean;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

const BookList: FC<IBookList> = ({
  books,
  getNewBook,
  hasMoreBooks,
  isLoading,
  setIsLoading,
  firstItem,
}) => {
  const navigate = useNavigate();

  const handleBookClick = (bookId: number) => {
    navigate(NavigateBookPageRoute(bookId.toString()));
  };

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasMoreBooks,
    onLoadMore: getNewBook,
  });

  return (
    <Box
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
            marginBottom: "1rem",
            width: { xs: "45%", sm: "150px", md: "200px" },
          }}
        >
          {firstItem}
        </Box>
      )}
      {books.length === 0 &&
        isLoading &&
        [...Array(10)].map((index) => {
          return (
            <Box
              sx={{
                marginRight: ".5rem",
                marginLeft: ".5rem",
                marginBottom: "1rem",
                width: { xs: "45%", sm: "150px", md: "200px" },
              }}
              key={index}
            >
              <Skeleton
                variant="rectangular"
                sx={{
                  width: {
                    xs: "45%",
                    sm: "150px",
                    md: "200px",
                    borderRadius: ".75rem",
                  },
                }}
                height={350}
              />
            </Box>
          );
        })}
      {books.map((book, index) => {
        return (
          <Box
            sx={{
              marginRight: ".5rem",
              marginLeft: ".5rem",
              marginBottom: "1rem",
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
      {(isLoading || hasMoreBooks) && <div ref={sentryRef}></div>}
    </Box>
  );
};

export default BookList;
