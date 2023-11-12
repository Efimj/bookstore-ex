import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IBook from "../../interfaces/IBook";
import {
  getBookAuthors,
  getBook,
  getBookOffer,
  getBookDiscount,
  getBookEvaluations,
} from "../../api/book";
import { Box } from "@mui/material";
import IUser from "../../interfaces/IAuthor";
import IBookOffer from "../../interfaces/IBookOffer";
import IBookDiscount from "../../interfaces/IBookDiscount";
import BookInformation from "./BookInformation";
import BookPageContent from "./BookPageContent";
import IBookEvaluations from "../../interfaces/IBookEvaluations";

export interface IBookPage {}

const BookPage: FC<IBookPage> = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState<IBook | null>(null);
  const [authors, setAuthors] = useState<IUser[]>([]);
  const [bookOffer, setBookOffer] = useState<IBookOffer | null>(null);
  const [bookDiscount, setBookDiscount] = useState<IBookDiscount | null>(null);
  const [evaluations, setEvaluations] = useState<IBookEvaluations | null>(null);

  useEffect(() => {
    async function get() {
      if (!bookId) return;
      const book = await getBook(bookId);
      if (book?.book_id) setBook(book);
      const authorsResponse = await getBookAuthors(bookId);
      if (Array.isArray(authorsResponse)) setAuthors(authorsResponse);
      const offer = await getBookOffer(bookId);
      if (offer?.offer_id) setBookOffer(offer);
      const discount = await getBookDiscount(bookId);
      if (discount?.discount_id) setBookDiscount(discount);
      const evaluations = await getBookEvaluations(bookId);
      if (evaluations?.book_id) setEvaluations(evaluations);
    }
    get();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        paddingTop: { xs: ".5rem", sm: "1rem", md: "2rem" },
        paddingX: { xs: ".75rem", sm: "1.25rem", md: "2rem" },
        gap: { xs: ".75rem", sm: "1.25rem" },
      }}
    >
      {book && (
        <BookInformation
          book={book}
          authors={authors}
          bookOffer={bookOffer}
          bookDiscount={bookDiscount}
          bookEvaluations={evaluations}
        />
      )}
      {book && (
        <BookPageContent
          book={book}
          authors={authors}
          bookOffer={bookOffer}
          bookDiscount={bookDiscount}
          bookEvaluations={evaluations}
        />
      )}
    </Box>
  );
};

export default BookPage;
