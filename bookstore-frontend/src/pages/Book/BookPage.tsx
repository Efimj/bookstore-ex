import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IBook from "../../interfaces/IBook";
import { getBook } from "../../api/book";
import { Box, CardMedia, Grid, Typography } from "@mui/material";

export interface IBookPage {}

const BookPage: FC<IBookPage> = () => {
  const { bookId } = useParams();
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
      <Grid
        container
        spacing={16}
        sx={{ paddingTop: { xs: ".5rem", sm: ".75rem", md: "1rem" } }}
      >
        <Grid item xs={8}>
          <Typography
            variant="h3"
          >
            {book?.title}
          </Typography>
        </Grid>
        {/* <Grid item xs={4} sx={{ maxHeight: "500px" }}>
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
        </Grid> */}
      </Grid>
    </>
  );
};

export default BookPage;
