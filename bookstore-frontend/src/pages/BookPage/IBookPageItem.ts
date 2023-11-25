import IUser from "../../interfaces/IAuthor";
import IBook from "../../interfaces/IBook";
import IBookDiscount from "../../interfaces/IBookDiscount";
import IBookEvaluations from "../../interfaces/IBookEvaluations";
import IBookOffer from "../../interfaces/IBookOffer";
import IBookSate from "../../interfaces/IBookSate";

export default interface IBookPageItem {
  book: IBook;
  authors: IUser[];
  bookOffer: IBookOffer | null;
  bookDiscount: IBookDiscount | null;
  bookEvaluations: IBookEvaluations | null;
  bookSate: IBookSate | null;
}
