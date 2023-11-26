import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
} from "@mui/material";
import { FC } from "react";
import { IBookInformation } from "../../interfaces/IBookInformation";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";

export interface IBookBanner {
  book: IBookInformation;
  onClick: () => void;
}

const BookBanner: FC<IBookBanner> = ({ book, onClick }) => {
  const getBookPriceText = (): string => {
    if (book?.offer == null) return "not for sale";
    if (book?.discount != null) return `Buy for ${book?.discount.price} usd.`;
    return `Buy for ${book?.offer.price} usd.`;
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: "2px solid transparent",
        transition: "all .2s linear",
        "&:hover": {
          borderColor: "secondary.main",
        },
      }}
      elevation={0}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: 350,
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            height: "260px",
            width: "100%",
            overflow: "hidden",
          }}
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
            image={book.book?.image}
          />
        </Box>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: { xs: ".5rem", sm: ".75rem" },
          }}
        >
          <Typography
            variant="body1"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {book.book.title}
          </Typography>
          <Box sx={{ display: "flex", gap: "0.5rem" }}>
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
              color="textSecondary"
            >
              {book.evaluations.average_rating}
              <StarRateRoundedIcon
                fontSize="inherit"
                sx={{ paddingBottom: "1px" }}
              />
            </Typography>
            <Box sx={{ display: "flex", gap: ".5rem" }}>
              {book?.discount && (
                <Typography
                  variant="body2"
                  color={"#FFFFFF"}
                  sx={{
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 6,
                    opacity: ".7",
                    textDecoration: "line-through",
                  }}
                >
                  {book?.offer && `${book?.offer.price} usd.`}
                </Typography>
              )}
              <Typography
                variant="body2"
                sx={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 6,
                }}
                color="textSecondary"
              >
                {getBookPriceText()}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BookBanner;
