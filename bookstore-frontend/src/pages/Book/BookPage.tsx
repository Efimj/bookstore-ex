import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IBook from "../../interfaces/IBook";
import { getBook } from "../../api/book";
import {
  Box,
  CardMedia,
  Divider,
  List,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";

export interface IBookPage {}

const BookPage: FC<IBookPage> = () => {
  const { bookId } = useParams();
  const theme = useTheme();
  const [book, setBook] = useState<IBook | null>(null);

  useEffect(() => {
    async function get() {
      if (bookId) setBook(await getBook(bookId));
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
          <Typography variant="h3">{book?.title}</Typography>
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <BookOutlinedIcon fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                EBook
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body1">{book?.page_count}</Typography>
              <Typography variant="body2" color="text.secondary">
                Page count
              </Typography>
            </Box>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            {book?.publication_date.toLocaleString()}
          </Typography>
        </Box>
        <Paper
          sx={{
            height: "100%",
            width: "240px",
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
      {/* <Grid
        container
        sx={{ paddingTop: { xs: ".5rem", sm: ".75rem", md: "1rem" } }}
      >
        <Grid item xs={8}>
          <Typography variant="h3">{book?.title}</Typography>
        </Grid>
        <Grid item xs={4} sx={{ display: { xs: "none", md: "block" } }}>
          <Box
            sx={{
              height: "100%",
              width: "240px",
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
                "/" +
                myBooksImage[Math.floor(Math.random() * myBooksImage.length)]
              }
            />
          </Box>
        </Grid>
      </Grid> */}
    </>
  );
};

export default BookPage;
