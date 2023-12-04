import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { NavigateBookCatalogRoute } from "../BookCatalog/BookCatalog";

export interface IBookPage {}

export const BookPageRoute = "/book/:bookId";
export const NavigateBookPageRoute = (bookId: string): string =>
  `/book/${bookId}`;

const BookPage: FC<IBookPage> = () => {
  const navigate = useNavigate();
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
      let book: IBook;
      try {
        book = await getBook(bookId);
        if (book?.book_id) setBook(book);
      } catch (error) {
        console.log(error);
        return;
      }
      if (book === null) {
        navigate(NavigateBookCatalogRoute());
        return;
      }
      try {
        const evaluations = await getBookEvaluations(bookId);
        if (evaluations?.book_id) setEvaluations(evaluations);
      } catch (error) {
        console.log(error);
      }
      try {
        const bookState = await getBookState(bookId);
        setBookState(bookState);
      } catch (error) {
        console.log(error);
      }
      try {
        const authorsResponse = await getBookAuthors(bookId);
        if (Array.isArray(authorsResponse)) setAuthors(authorsResponse);
      } catch (error) {
        console.log(error);
      }
      try {
        const offer = await getBookOffer(bookId);
        if (offer?.offer_id) setBookOffer(offer);
      } catch (error) {
        console.log(error);
      }
      try {
        const offer = await getBookOffer(bookId);
        if (offer?.offer_id) setBookOffer(offer);
      } catch (error) {
        console.log(error);
      }
      try {
        const discount = await getBookDiscount(bookId);
        if (discount?.discount_id) setBookDiscount(discount);
      } catch (error) {
        console.log(error);
      }
    }
    get();
  }, []);

  return (
    <PageWrapper>
      {book && (
        <BookInformation
          book={book}
          authors={authors}
          bookSate={bookState}
          bookOffer={bookOffer}
          bookDiscount={bookDiscount}
          bookEvaluations={evaluations}
        />
      )}
      {book && (
        <BookPageContent
          book={book}
          authors={authors}
          bookSate={bookState}
          bookOffer={bookOffer}
          bookDiscount={bookDiscount}
          bookEvaluations={evaluations}
        />
      )}
    </PageWrapper>
  );
};

export default BookPage;
