import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import IBook from "../../interfaces/IBook";
import { FC } from "react";
import { IBookInformation } from "../../api/book";

export interface IHugeBookBanner {
  book: IBookInformation;
  onClick: () => void;
}

const HugeBookBanner: FC<IHugeBookBanner> = ({ book, onClick }) => {
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
          image={book.book?.image}
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
            {book.book.title}
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
            {book.book.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default HugeBookBanner;
