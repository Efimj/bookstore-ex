import { FC, useEffect, useState } from "react";
import IUser from "../../interfaces/IAuthor";
import { Typography } from "@mui/material";
import { getUserWishlist } from "../../api/user";
import { IBookInformation } from "../../interfaces/IBookInformation";
import BookList from "../../components/BookList/BookList";

export interface IUserWishlist {
  user: IUser;
}

const UserWishlist: FC<IUserWishlist> = ({ user }) => {
  const [books, setBooks] = useState<IBookInformation[]>([]);
  const [hasMoreBooks, setHasMoreWishes] = useState<boolean>(true);
  const countWishesLoad = 5;

  const getNewBook = async () => {
    const nextWishes = await getUserWishlist(
      user.user_id.toString(),
      books.length,
      countWishesLoad
    );
    if (nextWishes.length === 0) setHasMoreWishes(false);
    setBooks([...books, ...nextWishes]);
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
        Wishlist
      </Typography>
      <BookList
        books={books}
        getNewBook={getNewBook}
        hasMoreBooks={hasMoreBooks}
      />
    </>
  );
};

export default UserWishlist;
