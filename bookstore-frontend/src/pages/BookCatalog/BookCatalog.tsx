import { FC, useEffect, useState } from "react";
import { getBooks } from "../../api/book";
import { IBookInformation } from "../../interfaces/IBookInformation";
import HugeBookBanner from "../../components/HugeBookBanner/HugeBookBanner";
import { Box, Skeleton, Typography } from "@mui/material";
import CustomCarousel from "../../components/CustomCarousel/CustomCarousel";
import BookBanner from "../../components/BookBanner/BookBanner";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { NavigateBookPageRoute } from "../BookPage/BookPage";
import useInfiniteScroll from "react-infinite-scroll-hook";
import IUser from "../../interfaces/IAuthor";
import UserCard from "../../components/UserCard/UserCard";
import { getUser } from "../../api/user";

export interface IBookCatalog {}
export interface IBookCatalogPageSearchParams {
  query: string;
  authors: number[];
}

export const BookCatalogQueryParam = "query";
export const BookCatalogAuthorsParam = "authors";

export const BookCatalogRouteName = "/bookcatalog";
export const BookCatalogRoute = `${BookCatalogRouteName}/:${BookCatalogQueryParam}?/:${BookCatalogAuthorsParam}?`;
export const NavigateBookCatalogRoute = (
  params: IBookCatalogPageSearchParams | null = null
): string => {
  if (params === null) return `${BookCatalogRouteName}`;
  return `${BookCatalogRouteName}?${BookCatalogQueryParam}=${
    params.query
  }&${BookCatalogAuthorsParam}=${JSON.stringify(params.authors)}`;
};

export interface ISearchParamsLine {
  query: string;
  authors: IUser[];
}

const SearchParamsLine: FC<ISearchParamsLine> = ({ query, authors }) => {
  const navigate = useNavigate();

  const handleAuthorNavigation = (position: string) => {
    navigate(`/user/${position}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "auto",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: ".5rem",
          alignItems: "flex-end",
          height: "100%",
        }}
      >
        <Typography variant="body1" color="text.secondary">
          Search by:
        </Typography>
        <Typography variant="h5" color="text">
          {query}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: ".5rem" }}>
        {authors.map((user: IUser, index: number) => {
          return (
            <UserCard
              user={user}
              onClick={() => handleAuthorNavigation(user.user_id.toString())}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default function BookCatalog(props: IBookCatalog) {
  const [searchParams] = useSearchParams();
  const [books, setBooks] = useState<Array<IBookInformation>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMoreBooks, setHasMoreBooks] = useState<boolean>(true);
  const countGet = 10;
  const navigate = useNavigate();

  const queryParams = searchParams.get(BookCatalogQueryParam) ?? "";
  const authorsParams: number[] = JSON.parse(
    searchParams.get(BookCatalogAuthorsParam) ?? "[]"
  );

  const fetchBooks = async () => {
    const catalogSearchparams: IBookCatalogPageSearchParams = {
      query: queryParams,
      authors: authorsParams,
    };

    const nextBooks = await getBooks(
      books.length,
      countGet,
      catalogSearchparams
    );
    if (nextBooks.length === 0) setHasMoreBooks(false);
    setBooks([...books, ...nextBooks]);
    setIsLoading(false);
  };

  const reset = () => {
    setBooks([]);
    setIsLoading(false);
    setHasMoreBooks(true);
  };

  useEffect(() => {
    reset();
  }, [searchParams]);

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

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasMoreBooks,
    onLoadMore: fetchBooks,
  });

  const [searchAuthors, setSearchAuthors] = useState<IUser[]>([]);

  const getAuthor = async (authorId: number) => {
    try {
      const author: IUser = await getUser(authorId.toString());
      if (author !== null) {
        setSearchAuthors((prevAuthors) => [...prevAuthors, author]);
      }
    } catch (error) {
      console.error(`Error fetching author with ID ${authorId}:`, error);
    }
  };

  useEffect(() => {
    //setSearchAuthors([]);
    // authorsParams.forEach((authorId) => {
    //   getAuthor(authorId);
    // });
  }, [searchAuthors]);

  if (books.length === 0 && !hasMoreBooks) {
    return (
      <PageWrapper>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" color="primary">
            No result ...
          </Typography>
        </Box>
        {(isLoading || hasMoreBooks) && <div ref={sentryRef}></div>}
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {/* <SearchParamsLine
        query={queryParams}
        authors={searchAuthors}
      ></SearchParamsLine> */}
      <Box>
        <Typography
          variant="h5"
          sx={{
            marginLeft: ".5rem",
            display: books.length > 0 ? "block" : "none",
          }}
          color="text.secondary"
        >
          Best choice
        </Typography>
        <Box
          sx={
            {
              // marginLeft: {
              //   xl: "-3rem",
              //   md: "-3rem",
              //   sm: "0rem",
              // },
            }
          }
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
            display: books.slice(3).length > 0 ? "block" : "none",
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
        {(isLoading || hasMoreBooks) && <div ref={sentryRef}></div>}
      </Box>
    </PageWrapper>
  );
}
