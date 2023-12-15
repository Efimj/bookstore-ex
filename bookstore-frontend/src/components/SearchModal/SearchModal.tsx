import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  Typography,
  InputBase,
  Box,
  Divider,
  Paper,
  Slide,
  IconButton,
} from "@mui/material";
import { ChangeEvent, forwardRef, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  BookCatalogAuthorsParam,
  BookCatalogQueryParam,
  IBookCatalogPageSearchParams,
  NavigateBookCatalogRoute,
} from "../../pages/BookCatalog/BookCatalog";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthorSelector from "../AuthorSelector/AuthorSelector";
import IUser from "../../interfaces/IAuthor";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import { IBookInformation } from "../../interfaces/IBookInformation";
import { getBooks } from "../../api/book";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import BookBanner from "../BookBanner/BookBanner";
import { NavigateBookPageRoute } from "../../pages/BookPage/BookPage";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function SearchModal() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [authors, setAuthors] = useState<IUser[]>([]);
  const [query, setQuery] = useState<string>("");
  const [books, setBooks] = useState<Array<IBookInformation>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<number | null>(null);
  const countGet = 3;

  const queryParams = searchParams.get(BookCatalogQueryParam) ?? "";
  const authorsParams: number[] = JSON.parse(
    searchParams.get(BookCatalogAuthorsParam) ?? "[]"
  );

  const getNewBooks = async (query: string, authors: number[]) => {
    const catalogSearchparams: IBookCatalogPageSearchParams = {
      query: query,
      authors: authors,
    };

    const newBooks = await getBooks(
      books.length,
      countGet,
      catalogSearchparams
    );

    setBooks(newBooks);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const newTimer = window.setTimeout(async () => {
      await getNewBooks(
        query,
        authors.map((e) => {
          return e.user_id;
        })
      );
    }, 500);
    setTimer(newTimer);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [authors, query]);

  useEffect(() => {
    if (!query && !authors) {
      setIsLoading(true);
      getNewBooks(queryParams, authorsParams);
    }
  }, [open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMore = () => {
    const queryParams = {
      query: query,
      authors: authors.map((e) => e.user_id),
    };
    const url = NavigateBookCatalogRoute(queryParams);
    navigate(url);
    handleClose();
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleBookClick = (bookId: number) => {
    navigate(NavigateBookPageRoute(bookId.toString()));
    handleClose();
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ color: theme.palette.text.secondary }}
      >
        <SearchIcon sx={{ marginRight: ".5rem" }}></SearchIcon>
        Search...
      </Button>
      <Dialog
        TransitionComponent={Transition}
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        sx={{
          backdropFilter: "blur(5px) sepia(5%)",
          "& .MuiDialog-container": {
            marginTop: { xs: "0", sm: "2rem" },
            alignItems: "flex-start",
          },
        }}
        PaperProps={{
          sx: {
            width: "100%",
            margin: { xs: "0", sm: "2rem" },
            borderRadius: { xs: "0", sm: "1rem" },
            backgroundColor: theme.palette.background.default,
          },
        }}
      >
        <Paper>
          <DialogTitle sx={{ padding: "1rem" }}>
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              <SearchIcon
                sx={{ color: theme.palette.text.secondary }}
              ></SearchIcon>
              <InputBase
                name="query"
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Book Store"
                onChange={handleQueryChange}
                value={query}
              />
              <IconButton
                onClick={() => {
                  setOpen(false);
                }}
                sx={{ color: theme.palette.text.secondary }}
              >
                <CloseIcon></CloseIcon>
              </IconButton>
            </Box>
          </DialogTitle>
          <Divider />
          <DialogContent
            sx={{
              padding: "0",
              marginBottom: "2rem",
              gap: ".5rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: ".2rem",
                padding: "1rem",
              }}
            >
              <Typography
                variant="body1"
                sx={{ paddingBottom: ".1rem" }}
                color="text.secondary"
              >
                Select Authors
              </Typography>
              <AuthorSelector authors={authors} onChange={setAuthors} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: ".2rem",
              }}
            >
              <Typography
                variant="body1"
                sx={{ paddingBottom: ".1rem", paddingLeft: "1rem" }}
                color="text.secondary"
              >
                Result
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  overflowX: "auto",
                  maxWidth: "100%",
                  paddingX: "0.5rem",
                }}
              >
                {books.length === 0 && (
                  <Box
                    sx={{
                      height: "350px",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ paddingBottom: ".1rem", paddingLeft: "1rem" }}
                      color="text.secondary"
                    >
                      No books
                    </Typography>
                  </Box>
                )}
                {books.slice(0, 3).map((book: IBookInformation) => (
                  <Box
                    sx={{
                      marginRight: ".5rem",
                      marginLeft: ".5rem",
                      minWidth: "30%",
                    }}
                    key={book.book.book_id}
                  >
                    <BookBanner
                      book={book}
                      onClick={() => handleBookClick(book.book.book_id)}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ padding: "1rem", pt: "0" }}>
            <Box sx={{ width: "100%" }}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleMore}
                startIcon={<SavedSearchIcon />}
              >
                Search more
              </Button>
            </Box>
          </DialogActions>
        </Paper>
      </Dialog>
    </div>
  );
}
