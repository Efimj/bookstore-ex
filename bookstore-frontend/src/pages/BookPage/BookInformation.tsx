import {
  Box,
  Paper,
  CardMedia,
  Typography,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import { FC } from "react";
import IUser from "../../interfaces/IAuthor";
import IBookPageItem from "./IBookPageItem";
import BookStackItem from "./BookStackItem";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const BookInformation: FC<IBookPageItem> = ({
  book,
  authors,
  bookOffer,
  bookDiscount,
  bookEvaluations,
}) => {
  const navigate = useNavigate();
  const getBookBuyButtonText = (): string => {
    if (bookOffer == null) return "not for sale";
    if (bookDiscount != null) return `Buy for ${bookDiscount.price} usd.`;
    return `Buy for ${bookOffer.price} usd.`;
  };

  const handleAuthorNavigation = (position: string) => {
    navigate(`/user/${position}`);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        gap: { xs: ".75rem", sm: "1.25rem", md: "2rem" },
      }}
    >
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "100%",
            overflow: "hidden",
            display: "flex",
            gap: "1rem",
          }}
        >
          <Paper
            sx={{
              display: { xs: "block", md: "none" },
              height: "100%",
              width: { xs: "180px", sm: "210px", md: "240px" },
            }}
            elevation={16}
          >
            <CardMedia
              component="img"
              alt="451 degrees Fahrenheit.jpeg"
              sx={{
                padding: 0,
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
              image={book?.image}
            />
          </Paper>
          <div>
            <Typography
              variant="h4"
              sx={{ paddingBottom: "1rem" }}
              fontWeight={"600"}
            >
              {book?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {book?.publication_date.toLocaleString()}
            </Typography>
            <Stack
              sx={{ paddingTop: ".5rem" }}
              direction="row"
              spacing={{ xs: 0.75, sm: 1 }}
              useFlexGap
              flexWrap="wrap"
            >
              {authors.map((user: IUser, index: number) => {
                return (
                  <span
                    key={index}
                    onClick={() =>
                      handleAuthorNavigation(user.user_id.toString())
                    }
                  >
                    <Typography variant="body1" color="secondary">
                      {user.first_name}
                    </Typography>
                  </span>
                );
              })}
            </Stack>
          </div>
        </Box>
        <Stack
          direction="row"
          sx={{
            overflow: "auto",
            gap: "2rem",
            paddingY: "1rem",
            flexWrap: "nowrap",
          }}
          divider={<Divider orientation="vertical" flexItem variant="middle" />}
        >
          <BookStackItem
            title={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="body1" sx={{ paddingTop: "2px" }}>
                  {bookEvaluations?.average_rating ?? 0}
                </Typography>
                <StarRateRoundedIcon fontSize="inherit" />
              </Box>
            }
            description={`${bookEvaluations?.review_count ?? 0} reviews`}
          />
          <BookStackItem
            title={<BookOutlinedIcon fontSize="small" />}
            description="EBook"
          />
          <BookStackItem title={book?.page_count} description="Page count" />
        </Stack>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: ".75rem", sm: "1.25rem" },
            width: { xs: "100%", sm: "fit-content" },
          }}
        >
          <Button
            sx={{
              textTransform: "none",
              borderRadius: "10px",
            }}
            disableElevation={true}
            variant="contained"
            onClick={() => {}}
            disabled={bookOffer == null}
          >
            <Box sx={{ display: "flex", gap: ".5rem" }}>
              {bookDiscount && (
                <Typography
                  variant="body1"
                  color={"#FFFFFF"}
                  sx={{ opacity: ".7", textDecoration: "line-through" }}
                >
                  {bookOffer && `${bookOffer.price} usd.`}
                </Typography>
              )}
              <Typography variant="body1" color={"#FFFFFF"}>
                {getBookBuyButtonText()}
              </Typography>
            </Box>
          </Button>
          <Button
            sx={{ textTransform: "none", borderRadius: "10px" }}
            variant="outlined"
            onClick={() => {
              enqueueSnackbar("Added to wishlist", { variant: "success" });
            }}
          >
            <Typography variant="body1">Add to wishlist</Typography>
          </Button>
          <Button
            sx={{ textTransform: "none", borderRadius: "10px" }}
            variant="text"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              enqueueSnackbar("Link copied", { variant: "success" });
            }}
          >
            <Typography variant="body1">Share</Typography>
          </Button>
        </Box>
      </Box>
      <Paper
        sx={{
          display: { xs: "none", md: "block" },
          height: "100%",
          width: { xs: "180px", sm: "210px", md: "240px" },
        }}
        elevation={16}
      >
        <CardMedia
          component="img"
          alt="451 degrees Fahrenheit.jpeg"
          sx={{
            padding: 0,
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
          image={book?.image}
        />
      </Paper>
    </Box>
  );
};

export default BookInformation;
