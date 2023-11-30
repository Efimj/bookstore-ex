import { FC, useEffect, useState } from "react";
import IUser from "../../interfaces/IAuthor";
import { Typography } from "@mui/material";
import { getUserLibrary } from "../../api/user";
import { IBookInformation } from "../../interfaces/IBookInformation";
import BookList from "../../components/BookList/BookList";

export interface IUserLibrary {
  user: IUser;
}

const UserLibrary: FC<IUserLibrary> = ({ user }) => {
  const [books, setBooks] = useState<IBookInformation[]>([]);
  const [hasMoreBooks, setHasMoreLibrary] = useState<boolean>(true);
  const countLibraryLoad = 5;

  const getNewBook = async () => {
    const nextLibrary = await getUserLibrary(
      user.user_id.toString(),
      books.length,
      countLibraryLoad
    );
    if (nextLibrary.length === 0) setHasMoreLibrary(false);
    setBooks([...books, ...nextLibrary]);
  };

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
      <BookList books={books} getNewBook={getNewBook} hasMoreBooks={hasMoreBooks} />
    </>
  );
};

export default UserLibrary;
