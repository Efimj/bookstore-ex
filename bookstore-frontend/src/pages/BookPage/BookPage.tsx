import { FC, useEffect, useState } from "react";
import {
  useLocation,
  useParams,
} from "react-router-dom";
import {
  getBook,
  getBookState,
} from "../../api/book";
import BookInformation from "./BookInformation";
import BookPageContent from "./BookPageContent";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import IBookSate from "../../interfaces/IBookSate";
import { IBookInformation } from "../../interfaces/IBookInformation";

export interface IBookPage {}

export const BookPageRoute = "/book/:bookId";
export const NavigateBookPageRoute = (bookId: string): string =>
  `/book/${bookId}`;

const BookPage: FC<IBookPage> = () => {
  const location = useLocation();
  const { bookId } = useParams();
  const [book, setBook] = useState<IBookInformation | null>(null);
  const [bookState, setBookState] = useState<IBookSate | null>(null);

  const getBookInformation = async () => {
    if (!bookId) return;

    try {
      const [book, state] = await Promise.all([
        getBook(bookId),
        getBookState(bookId),
      ]);

      if (book?.book) setBook(book);
      setBookState(state);
    } catch (e) {}
  };

  useEffect(() => {
    async function getBookData() {
      await getBookInformation();
    }
    getBookData();
  }, []);

  useEffect(() => {
    async function getBookData() {
      await getBookInformation();
    }
    getBookData();
  }, [location]);

  return (
    <PageWrapper>
      {book && (
        <BookInformation
          updateBookState={getBookInformation}
          book={book}
          bookSate={bookState}
        />
      )}
      {book && (
        <BookPageContent
          updateBookState={getBookInformation}
          book={book}
          bookSate={bookState}
        />
      )}
    </PageWrapper>
  );
};

export default BookPage;
