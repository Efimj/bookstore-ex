import { Box, Rating, Typography } from "@mui/material";
import { FC } from "react";
import IBookReview from "../../interfaces/IBookReview";
import UserCard from "../UserCard/UserCard";

export interface IBookReviewCard {
  review: IBookReview;
  onUserClick: () => void;
}

const BookReviewCard: FC<IBookReviewCard> = ({ review, onUserClick }) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        gap: "1rem",
        padding: "0.5rem",
        borderRadius: "1rem",
        transition: "all linear 200ms",
      }}
    >
      <UserCard user={review.user} onClick={onUserClick} />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <Rating
          name="half-rating"
          size="small"
          readOnly
          defaultValue={review.rating}
          precision={0.5}
        />
        <Typography variant="body1" color="text.secondary">
          {review.description}
        </Typography>
      </Box>
    </Box>
  );
};

export default BookReviewCard;
