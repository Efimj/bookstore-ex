import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import IBook from "../../interfaces/IBook";
import { FC } from "react";

export interface IHugeBookBanner {
  book: IBook;
  onClick: () => void;
}

const HugeBookBanner: FC<IHugeBookBanner> = ({ book, onClick }) => {
  var myBooksImage = [
    "451 degrees Fahrenheit.jpeg",
    "1984.webp",
    "barnyard.png",
  ];

  return (
    <Card sx={{ borderRadius: 3 }} elevation={0}>
      <CardActionArea
        onClick={onClick}
        sx={{ display: "flex", height: 250, alignItems: "flex-start" }}
      >
        <CardMedia
          component="img"
          alt="451 degrees Fahrenheit.jpeg"
          sx={{
            padding: 0,
            maxWidth: "45%",
            height: "100%",
          }}
          image={myBooksImage[Math.floor(Math.random() * myBooksImage.length)]}
        />
        <CardContent
          sx={{
            padding: { xs: ".5rem", sm: ".75rem" },
            height: "100%",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {book.title}
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
            {book.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default HugeBookBanner;
