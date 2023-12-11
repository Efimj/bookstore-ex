import {
  Box,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FC } from "react";
import { IBookInformation } from "../../interfaces/IBookInformation";
import BookForm, { PublishBookFormValues } from "../BookForm/BookForm";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import {
  PublishBookData,
  postPublishBook,
  postUpdateBook,
} from "../../api/book";
import dayjs from "dayjs";
import IUser from "../../interfaces/IAuthor";
import { NavigateBookPageRoute } from "../../pages/BookPage/BookPage";

export interface IBookEditModal {
  book: IBookInformation;
  isOpened: boolean;
  onUpdate: () => Promise<void>;
  onCancel: () => void;
}

const BookEditModal: FC<IBookEditModal> = ({
  book,
  isOpened,
  onUpdate,
  onCancel,
}) => {
  const theme = useTheme();

  const handleUpdateBook = async (values: PublishBookFormValues) => {
    if (values.image === null) return;
    const data: PublishBookData = {
      title: values.title,
      description: values.description,
      image: values.image,
      pages: values.pages,
      authors: values.authors.map((user: IUser) => {
        return user.user_id;
      }),
      ageRestrictions: values.ageRestrictions.age_restriction_id,
      publicationDate: dayjs(values.publicationDate).toDate(),
    };
    const book_id: string = await postUpdateBook(book.book.book_id, data);
    await onUpdate();
  };

  return (
    <Dialog
      fullScreen
      open={isOpened}
      onClose={onCancel}
      TransitionComponent={Transition}
    >
      <Toolbar
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          onClick={onCancel}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>

      <Box
        sx={{ backgroundColor: theme.palette.background.default, opacity: "1" }}
      >
        <BookForm
          book={book}
          onPublish={handleUpdateBook}
          onCancel={onCancel}
        ></BookForm>
      </Box>
    </Dialog>
  );
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default BookEditModal;
