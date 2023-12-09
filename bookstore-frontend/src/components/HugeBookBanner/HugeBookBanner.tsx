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
import { IBookInformation } from "../../interfaces/IBookInformation";
import IUser from "../../interfaces/IAuthor";
import UserCard from "../UserCard/UserCard";
import { useNavigate } from "react-router-dom";

export interface IHugeBookBanner {
  book: IBookInformation;
  onClick: () => void;
}

const HugeBookBanner: FC<IHugeBookBanner> = ({ book, onClick }) => {
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
            display: "flex",
            maxWidth:'65%',
            flexDirection: "column",
            gap: ".5rem",
            padding: { xs: ".5rem", sm: ".75rem" },
            height: "100%",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
            <Typography
              variant="h6"
              sx={{
                lineHeight: "1.2",
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
                WebkitLineClamp: 5,
              }}
              color="textSecondary"
            >
              {book.book.description}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: ".5rem",
              height: "100%",
              alignItems: "flex-end",
            }}
          >
            {book.authors.map((author: IUser, index) => {
              return <UserCard user={author} onClick={() => {}} key={index} />;
            })}
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: ".5rem",
            }}
          >
            {book?.discount && (
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 1,
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
                WebkitLineClamp: 1,
              }}
              color="textSecondary"
            >
              {getBookPriceText()}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default HugeBookBanner;
