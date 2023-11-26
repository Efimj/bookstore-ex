import { FC, useEffect, useState } from "react";
import IUser from "../../interfaces/IAuthor";
import { Typography, Box } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import BookBanner from "../../components/BookBanner/BookBanner";
import IBook from "../../interfaces/IBook";
import { useNavigate } from "react-router-dom";
import { getUserPublish } from "../../api/user";
import { IBookInformation } from "../../interfaces/IBookInformation";

export interface IUserPublish {
  user: IUser;
}

const UserPublish: FC<IUserPublish> = ({ user }) => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<IBookInformation[]>([]);
  const [hasMoreBooks, setHasMoreBook] = useState<boolean>(true);
  const countBookLoad = 5;

  const handleBookClick = (bookId: number) => {
    navigate(`/book/${bookId}`);
  };

  const getNewBook = async () => {
    const nextBook = await getUserPublish(
      user.user_id.toString(),
      books.length,
      countBookLoad
    );
    if (nextBook.length === 0) setHasMoreBook(false);
    setBooks([...books, ...nextBook]);
  };

  useEffect(() => {
    getNewBook();
  }, []);

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          paddingLeft: ".5rem",
          paddingBottom: ".5rem",
        }}
        color="text.secondary"
      >
        Book
      </Typography>
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
    </>
  );
};

export default UserPublish;
