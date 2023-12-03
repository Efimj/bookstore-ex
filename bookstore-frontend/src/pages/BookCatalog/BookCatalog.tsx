import { useEffect, useState } from "react";
import { getBooks } from "../../api/book";
import { IBookInformation } from "../../interfaces/IBookInformation";
import HugeBookBanner from "../../components/HugeBookBanner/HugeBookBanner";
import { Box, Skeleton, Typography } from "@mui/material";
import CustomCarousel from "../../components/CustomCarousel/CustomCarousel";
import BookBanner from "../../components/BookBanner/BookBanner";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import InfiniteScroll from "react-infinite-scroll-component";
import { NavigateBookPageRoute } from "../BookPage/BookPage";

export interface IBookCatalog {}

export const BookCatalogRoute = "/bookcatalog";
export const NavigateBookCatalogRoute = (): string => `/bookcatalog`;

export default function BookCatalog(props: IBookCatalog) {
  const [books, setBooks] = useState<Array<IBookInformation>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMoreBooks, setHasMoreBooks] = useState<boolean>(true);
  const countGet = 10;
  const navigate = useNavigate();

  const getNewBooks = async () => {
    const nextBooks = await getBooks(books.length, countGet);
    if (nextBooks.length === 0) setHasMoreBooks(false);
    setBooks([...books, ...nextBooks]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) return;
    if (hasMoreBooks && document.body.scrollHeight === window.innerHeight) {
      setIsLoading(true);
      getNewBooks();
    }
  });

  function chunkArray(array: Array<IBookInformation>, chunkSize: number) {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunkedArr.push(array.slice(i, i + chunkSize));
    }
    return chunkedArr;
  }

  const handleBookClick = (bookId: number) => {
    navigate(NavigateBookPageRoute(bookId.toString()));
  };

  return (
    <PageWrapper>
      <InfiniteScroll
        dataLength={books.length}
        next={getNewBooks}
        hasMore={hasMoreBooks}
        loader={""}
      >
        <Typography
          variant="h5"
          sx={{ marginLeft: ".5rem" }}
          color="text.secondary"
        >
          Best choice
        </Typography>
        <Box
          sx={{
            marginLeft: {
              xl: "-3rem",
              md: "-3rem",
              sm: "0rem",
            },
          }}
        >
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
            {books.slice(0, 3).map((book: IBookInformation) => (
              <Box
                sx={{
                  marginRight: ".5rem",
                  marginLeft: ".5rem",
                }}
                key={book.book.book_id}
              >
                <HugeBookBanner
                  book={book}
                  onClick={() => handleBookClick(book.book.book_id)}
                />
              </Box>
            ))}
            {books.length === 0 &&
              isLoading &&
              [...Array(3)].map((index) => {
                return (
                  <Box
                    sx={{
                      marginRight: ".5rem",
                      marginLeft: ".5rem",
                    }}
                    key={index}
                  >
                    <Skeleton
                      variant="rectangular"
                      height={250}
                      sx={{ width: "100%", borderRadius: ".75rem" }}
                    />
                  </Box>
                );
              })}
          </CustomCarousel>
        </Box>
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
        {chunkArray(books.slice(3), 7).map((group, index) => {
          return (
            <Box sx={{ paddingBottom: ".5rem" }} key={index}>
              <CustomCarousel>
                {group.map((book: IBookInformation, i: number) => (
                  <Box
                    sx={{
                      marginRight: ".5rem",
                      marginLeft: ".5rem",
                    }}
                    key={book.book.book_id}
                  >
                    <BookBanner
                      book={book}
                      onClick={() => handleBookClick(book.book.book_id)}
                    />
                  </Box>
                ))}
              </CustomCarousel>
            </Box>
          );
        })}
        {books.length === 0 &&
          isLoading &&
          chunkArray([...Array(15)], 7).map((group, index) => {
            return (
              <Box sx={{ paddingBottom: ".5rem" }} key={index}>
                <CustomCarousel>
                  {group.map((element, i: number) => (
                    <Box
                      sx={{
                        marginRight: ".5rem",
                        marginLeft: ".5rem",
                      }}
                      key={i}
                    >
                      <Skeleton
                        variant="rectangular"
                        height={250}
                        sx={{ width: "100%", borderRadius: ".75rem" }}
                      />
                    </Box>
                  ))}
                </CustomCarousel>
              </Box>
            );
          })}
      </InfiniteScroll>
    </PageWrapper>
  );
}
