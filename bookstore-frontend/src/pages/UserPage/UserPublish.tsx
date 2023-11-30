import { FC, useEffect, useState } from "react";
import IUser from "../../interfaces/IAuthor";
import { Typography } from "@mui/material";
import { getUserPublish } from "../../api/user";
import { IBookInformation } from "../../interfaces/IBookInformation";
import BookList from "../../components/BookList/BookList";
import CreateBookBanner from "../../components/CreateBookBanner/CreateBookBanner";
import { useNavigate } from "react-router-dom";
import { NavigatePublishBookPageRoute } from "../PublishBookPage/PublishBookPage";

export interface IUserPublish {
  user: IUser;
  showCreateBook?: boolean;
}

const UserPublish: FC<IUserPublish> = ({ user, showCreateBook = false }) => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<IBookInformation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    setIsLoading(false);
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
        Book
      </Typography>
      <BookList
        firstItem={
          showCreateBook && (
            <CreateBookBanner
              onClick={() => {
                navigate(NavigatePublishBookPageRoute());
              }}
            />
          )
        }
        books={books}
        getNewBook={getNewBook}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        hasMoreBooks={hasMoreBooks}
      />
    </>
  );
};

export default UserPublish;
