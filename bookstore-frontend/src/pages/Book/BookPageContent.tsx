import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  styled,
} from "@mui/material";
import { FC, useState } from "react";
import IBookPageItem from "./IBookPageItem";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CloseIcon from "@mui/icons-material/Close";

const BookPageContent: FC<IBookPageItem> = ({
  book,
  authors,
  bookOffer,
  bookDiscount,
}) => {
  const [descriptionOpened, setDescriptionOpened] = useState<boolean>(false);

  const handleClickOpen = () => {
    setDescriptionOpened(true);
  };

  const handleClose = () => {
    setDescriptionOpened(false);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: { xs: ".5rem" },
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: { xs: ".5rem" },
          }}
        >
          <Typography variant="h5">Book description</Typography>
          <IconButton
            sx={{
              textTransform: "none",
            }}
            onClick={handleClickOpen}
            disabled={bookOffer == null}
          >
            <ArrowForwardRoundedIcon />
          </IconButton>
        </Box>
        <Typography variant="body1" color="text.secondary">
          {book?.description}
        </Typography>
      </Box>{" "}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={descriptionOpened}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Book description
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>{book?.description}</Typography>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    margin: "1rem",
    borderRadius: "1rem",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default BookPageContent;
