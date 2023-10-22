import { FC, ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IBook from "../../interfaces/IBook";
import { getAuthors, getBook } from "../../api/book";
import {
  Box,
  CardMedia,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import IUser from "../../interfaces/IAuthor";

export interface IBookPage {}

const BookPage: FC<IBookPage> = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState<IBook | null>(null);
  const [authors, setAuthors] = useState<IUser[]>([]);

  console.log(authors);

  useEffect(() => {
    async function get() {
      if (!bookId) return;
      const book = await getBook(bookId);
      if (book?.book_id) setBook(book);
      const authorsResponse = await getAuthors(bookId);
      if (Array.isArray(authorsResponse)) setAuthors(authorsResponse);
    }
    get();
  }, []);

  var myBooksImage = [
    "451 degrees Fahrenheit.jpeg",
    "1984.webp",
    "barnyard.png",
  ];

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          paddingTop: { xs: ".5rem", sm: "1rem", md: "2rem" },
          paddingX: { xs: ".75rem", sm: "1.25rem", md: "2rem" },
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
                image={
                  "/" +
                  myBooksImage[Math.floor(Math.random() * myBooksImage.length)]
                }
              />
            </Paper>
            <div>
              <Typography variant="h3" sx={{ paddingBottom: "1rem" }}>
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
                    <Typography key={index} variant="body1" color="secondary">
                      {user.first_name}
                    </Typography>
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
            divider={
              <Divider orientation="vertical" flexItem variant="middle" />
            }
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
                    4.6
                  </Typography>
                  <StarRateRoundedIcon fontSize="inherit" />
                </Box>
              }
              description="430 reviews"
            />
            <BookStackItem
              title={<BookOutlinedIcon fontSize="small" />}
              description="EBook"
            />
            <BookStackItem title={book?.page_count} description="Page count" />
          </Stack>
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
            image={
              "/" +
              myBooksImage[Math.floor(Math.random() * myBooksImage.length)]
            }
          />
        </Paper>
      </Box>
    </>
  );
};

interface IBookStackItem {
  title: ReactNode;
  description: string;
}

const BookStackItem: FC<IBookStackItem> = ({ title, description }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {title}
      <Typography variant="body2" color="text.secondary" whiteSpace="nowrap">
        {description}
      </Typography>
    </Box>
  );
};

export default BookPage;
