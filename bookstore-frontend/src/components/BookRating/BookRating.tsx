import { FC } from "react";
import IBookEvaluations from "../../interfaces/IBookEvaluations";
import {
  Box,
  LinearProgress,
  Rating,
  Typography,
  linearProgressClasses,
  styled,
} from "@mui/material";

export interface IBookRating {
  bookEvaluations: IBookEvaluations;
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.primary,
  },
}));

// MIN = Minimum expected value
// MAX = Maximum expected value
// Function to normalise the values (MIN / MAX could be integrated)
const normalise = (value: number, max = 100, min = 0): number =>
  ((value - min) * 100) / (max - min);

const BookRating: FC<IBookRating> = ({ bookEvaluations }) => {
  return (
    <Box sx={{ display: "flex", width: "100%", gap: "1rem" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          gutterBottom
          color="text.main"
          noWrap
          sx={{
            overflow: "visible",
            textAlign: "center",
            fontSize: "2.5rem",
            marginBottom: "0rem",
            //display: { xs: "flex", sm: "none", md: "flex" },
          }}
        >
          {bookEvaluations.average_rating}
        </Typography>
        <Rating
          name="half-rating"
          readOnly
          defaultValue={bookEvaluations.average_rating}
          precision={0.5}
        />
        <Typography
          gutterBottom
          color="text.secondary"
          noWrap
          variant="body2"
          sx={{
            overflow: "visible",
            textAlign: "start",
            marginTop: "0.5rem",
            marginBottom: "0rem",
            //display: { xs: "flex", sm: "none", md: "flex" },
          }}
        >
          {`${bookEvaluations.review_count} reviews`}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <Typography
            variant="caption"
            sx={{ lineHeight: "1.5" }}
            color="text.secondary"
          >
            5
          </Typography>
          <BorderLinearProgress
            variant="determinate"
            sx={{ width: "100%" }}
            value={normalise(
              bookEvaluations.five_star_rating,
              bookEvaluations.review_count
            )}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <Typography
            variant="caption"
            sx={{ lineHeight: "1.5" }}
            color="text.secondary"
          >
            4
          </Typography>
          <BorderLinearProgress
            variant="determinate"
            sx={{ width: "100%" }}
            value={normalise(
              bookEvaluations.four_star_rating,
              bookEvaluations.review_count
            )}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <Typography
            variant="caption"
            sx={{ lineHeight: "1.5" }}
            color="text.secondary"
          >
            3
          </Typography>
          <BorderLinearProgress
            variant="determinate"
            sx={{ width: "100%" }}
            value={normalise(
              bookEvaluations.three_star_rating,
              bookEvaluations.review_count
            )}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <Typography
            variant="caption"
            sx={{ lineHeight: "1.5" }}
            color="text.secondary"
          >
            2
          </Typography>
          <BorderLinearProgress
            variant="determinate"
            sx={{ width: "100%" }}
            value={normalise(
              bookEvaluations.two_star_rating,
              bookEvaluations.review_count
            )}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <Typography
            variant="caption"
            sx={{ lineHeight: "1.5" }}
            color="text.secondary"
          >
            1
          </Typography>
          <BorderLinearProgress
            variant="determinate"
            sx={{ width: "100%" }}
            value={normalise(
              bookEvaluations.one_star_rating,
              bookEvaluations.review_count
            )}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default BookRating;
