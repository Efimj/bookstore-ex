import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import IBook from "../../interfaces/IBook";
import { FC } from "react";

export interface IBookBanner {
  book: IBook;
  onClick: () => void;
}

const BookBanner: FC<IBookBanner> = ({ book, onClick }) => {
  var myBooksImage = [
    "451 degrees Fahrenheit.jpeg",
    "1984.webp",
    "barnyard.png",
  ];

  return (
    <Card sx={{ borderRadius: 3 }} elevation={0}>
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
            image={
              myBooksImage[Math.floor(Math.random() * myBooksImage.length)]
            }
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
            {book.title}
          </Typography>
          <Box sx={{ display: "flex", gap: "0.5rem" }}>
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
              4
            </Typography>
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
              free
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BookBanner;
