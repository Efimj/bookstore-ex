import { FC, useEffect, useState } from "react";
import IUser from "../../interfaces/IAuthor";
import { Typography, Box } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import BookBanner from "../../components/BookBanner/BookBanner";
import IBook from "../../interfaces/IBook";
import { useNavigate } from "react-router-dom";
import { getUserLibrary } from "../../api/user";

export interface IUserLibrary {
  user: IUser;
}

const UserLibrary: FC<IUserLibrary> = ({ user }) => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState<IBook[]>([]);
  const [hasMoreLibrary, setHasMoreLibrary] = useState<boolean>(true);
  const countLibraryLoad = 5;

  const handleBookClick = (bookId: number) => {
    navigate(`/book/${bookId}`);
  };

  const getNewLibrary = async () => {
    const nextLibrary = await getUserLibrary(
      user.user_id.toString(),
      wishlist.length,
      countLibraryLoad
    );
    if (nextLibrary.length === 0) setHasMoreLibrary(false);
    setWishlist([...wishlist, ...nextLibrary]);
  };

  useEffect(() => {
    getNewLibrary();
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
        Library
      </Typography>
      <InfiniteScroll
        dataLength={wishlist.length}
        next={getNewLibrary}
        hasMore={hasMoreLibrary}
        loader={""}
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          justifyContent: "flex-start",
        }}
      >
        {wishlist.map((book, index) => {
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
                onClick={() => handleBookClick(book.book_id)}
              />
            </Box>
          );
        })}
      </InfiniteScroll>
    </>
  );
};

export default UserLibrary;
