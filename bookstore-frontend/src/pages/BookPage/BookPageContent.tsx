import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  styled,
  useTheme,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import IBookPageItem from "./IBookPageItem";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CloseIcon from "@mui/icons-material/Close";
import BookRating from "../../components/BookRating/BookRating";
import IBookReview from "../../interfaces/IBookReview";
import { getBookReviews } from "../../api/book";
import BookReviewCard from "../../components/BookReview/BookReview";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";

const BookPageContent: FC<IBookPageItem> = ({ book }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [descriptionOpened, setDescriptionOpened] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reviews, setReviews] = useState<IBookReview[]>([]);
  const [hasMoreReviews, setHasMoreReviews] = useState<boolean>(true);
  const countReviewsLoad = 2;

  const handleNavigation = (position: string) => {
    navigate(position);
  };

  const getNewReviews = async () => {
    if (!book?.book?.book_id) return;

    const nextReviews = await getBookReviews(
      book?.book.book_id.toString(),
      reviews.length,
      countReviewsLoad
    );
    if (nextReviews.length === 0) setHasMoreReviews(false);
    setReviews([...reviews, ...nextReviews]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) return;
    if (hasMoreReviews && document.body.scrollHeight === window.innerHeight) {
      setIsLoading(true);
      getNewReviews();
    }
  });

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
          display: "flex",
          flexDirection: "column",
          gap: { xs: ".5rem" },
          width: {
            sm: "100%",
            md: "calc(100% - 240px + 1rem)",
          },
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
            disabled={book?.book?.description == null}
          >
            <ArrowForwardRoundedIcon />
          </IconButton>
        </Box>
        <Typography
          variant="body1"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
          }}
          color="text.secondary"
        >
          {book?.book?.description}
        </Typography>
        <Box sx={{ paddingY: "1rem" }}>
          {book?.evaluations?.average_rating && (
            <BookRating bookEvaluations={book?.evaluations} />
          )}
        </Box>
        <InfiniteScroll
          dataLength={reviews.length}
          next={getNewReviews}
          hasMore={hasMoreReviews}
          loader={""}
        >
          {reviews.map((element: IBookReview, index: number) => {
            return (
              <Box sx={{ paddingTop: "0.5rem" }} key={index}>
                <BookReviewCard
                  review={element}
                  onUserClick={() =>
                    handleNavigation(`/user/${element.user.user_id}`)
                  }
                />
              </Box>
            );
          })}
        </InfiniteScroll>
      </Box>{" "}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={descriptionOpened}
        PaperProps={{
          sx: {
            borderRadius: "1rem",
            backgroundColor: theme.palette.background.default,
          },
        }}
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
          <Typography gutterBottom>{book?.book?.description}</Typography>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    margin: "1rem",
    borderRadius: "1rem",
    backgroundColor: theme.palette.background.default,
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default BookPageContent;
