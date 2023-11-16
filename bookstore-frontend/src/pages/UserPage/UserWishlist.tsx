import { FC, useEffect, useState } from "react";
import IUser from "../../interfaces/IAuthor";
import { Typography, Box } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import BookBanner from "../../components/BookBanner/BookBanner";
import IBook from "../../interfaces/IBook";
import { useNavigate } from "react-router-dom";
import { getUserWishlist } from "../../api/user";

export interface IUserWishlist {
  user: IUser;
}

const UserWishlist: FC<IUserWishlist> = ({ user }) => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState<IBook[]>([]);
  const [hasMoreWishes, setHasMoreWishes] = useState<boolean>(true);
  const countWishesLoad = 5;

  const handleBookClick = (bookId: number) => {
    navigate(`/book/${bookId}`);
  };

  const getNewWishes = async () => {
    const nextWishes = await getUserWishlist(
      user.user_id.toString(),
      wishlist.length,
      countWishesLoad
    );
    if (nextWishes.length === 0) setHasMoreWishes(false);
    setWishlist([...wishlist, ...nextWishes]);
  };

  useEffect(() => {
    getNewWishes();
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
        Wishlist
      </Typography>
      <InfiniteScroll
        dataLength={wishlist.length}
        next={getNewWishes}
        hasMore={hasMoreWishes}
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

export default UserWishlist;
