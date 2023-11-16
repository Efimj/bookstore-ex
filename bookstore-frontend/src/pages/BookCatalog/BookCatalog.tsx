import { useEffect, useState } from "react";
import { getBooks } from "../../api/book";
import IBook from "../../interfaces/IBook";
import HugeBookBanner from "../../components/HugeBookBanner/HugeBookBanner";
import { Box, Typography } from "@mui/material";
import CustomCarousel from "../../components/CustomCarousel/CustomCarousel";
import BookBanner from "../../components/BookBanner/BookBanner";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

export interface IBookCatalog {}

export default function BookCatalog(props: IBookCatalog) {
  const [books, setBooks] = useState<Array<IBook>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function get() {
      setBooks(await getBooks());
    }
    get();
  }, []);

  function chunkArray(array: Array<IBook>, chunkSize: number) {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunkedArr.push(array.slice(i, i + chunkSize));
    }
    return chunkedArr;
  }

  const handleBookClick = (bookId: number) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <PageWrapper>
      <Typography
        variant="h5"
        sx={{ marginLeft: ".5rem" }}
        color="text.secondary"
      >
        Best choice
      </Typography>
      <CustomCarousel
        responsive={{
          mobile: 1,
          tablet: 2,
          desktop: 3,
          superLargeDesktop: 3,
        }}
        visibilityGutter={{
          mobile: 20,
          tablet: 20,
          desktop: 15,
          superLargeDesktop: 15,
        }}
      >
        {books.slice(0, 3).map((book: IBook) => (
          <Box
            sx={{
              marginRight: ".5rem",
              marginLeft: ".5rem",
            }}
            key={book.book_id}
          >
            <HugeBookBanner
              book={book}
              onClick={() => handleBookClick(book.book_id)}
            />
          </Box>
        ))}
      </CustomCarousel>
      <Typography
        variant="h5"
        sx={{
          marginLeft: ".5rem",
          paddingTop: "1rem",
        }}
        color="text.secondary"
      >
        All books
      </Typography>
      {chunkArray(books.slice(3), 9).map((group, index) => {
        return (
          <Box sx={{ paddingBottom: "1.5rem" }} key={index}>
            <CustomCarousel>
              {group.map((book: IBook, i: number) => (
                <Box
                  sx={{
                    marginRight: ".5rem",
                    marginLeft: ".5rem",
                  }}
                  key={book.book_id}
                >
                  <BookBanner
                    book={book}
                    onClick={() => handleBookClick(book.book_id)}
                  />
                </Box>
              ))}
            </CustomCarousel>
          </Box>
        );
      })}
    </PageWrapper>
  );
}
