import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IBook from "../../interfaces/IBook";
import {
  getBookAuthors,
  getBook,
  getBookOffer,
  getBookDiscount,
  getBookEvaluations,
  getBookState,
} from "../../api/book";
import { Box } from "@mui/material";
import IUser from "../../interfaces/IAuthor";
import IBookOffer from "../../interfaces/IBookOffer";
import IBookDiscount from "../../interfaces/IBookDiscount";
import BookInformation from "./BookInformation";
import BookPageContent from "./BookPageContent";
import IBookEvaluations from "../../interfaces/IBookEvaluations";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import IBookSate from "../../interfaces/IBookSate";

export interface IBookPage {}

const BookPage: FC<IBookPage> = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState<IBook | null>(null);
  const [authors, setAuthors] = useState<IUser[]>([]);
  const [bookOffer, setBookOffer] = useState<IBookOffer | null>(null);
  const [bookDiscount, setBookDiscount] = useState<IBookDiscount | null>(null);
  const [evaluations, setEvaluations] = useState<IBookEvaluations | null>(null);
  const [bookState, setBookState] = useState<IBookSate | null>(null);

  useEffect(() => {
    async function get() {
      if (!bookId) return;
      const book = await getBook(bookId);
      const evaluations = await getBookEvaluations(bookId);
      if (evaluations?.book_id) setEvaluations(evaluations);
      if (book?.book_id) setBook(book);
      const bookState = await getBookState(bookId);
      console.log(bookState)
      if (bookState?.check) setBookState(bookState);
      const authorsResponse = await getBookAuthors(bookId);
      if (Array.isArray(authorsResponse)) setAuthors(authorsResponse);
      const offer = await getBookOffer(bookId);
      if (offer?.offer_id) setBookOffer(offer);
      const discount = await getBookDiscount(bookId);
      if (discount?.discount_id) setBookDiscount(discount);
    }
    get();
  }, []);

  

  return (
    <PageWrapper>
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
    </PageWrapper>
  );
};

export default BookPage;
