import { FC, useEffect, useState } from "react";
import IUser from "../../interfaces/IAuthor";
import { Typography } from "@mui/material";
import { getUserPublish } from "../../api/user";
import { IBookInformation } from "../../interfaces/IBookInformation";
import BookList from "../../components/BookList/BookList";

export interface IUserPublish {
  user: IUser;
}

const UserPublish: FC<IUserPublish> = ({ user }) => {
  const [books, setBooks] = useState<IBookInformation[]>([]);
  const [hasMoreBooks, setHasMoreBook] = useState<boolean>(true);
  const countBookLoad = 5;

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
      <BookList books={books} getNewBook={getNewBook} hasMoreBooks={hasMoreBooks} />
    </>
  );
};

export default UserPublish;
