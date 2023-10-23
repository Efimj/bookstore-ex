import IUser from "../../interfaces/IAuthor";
import IBook from "../../interfaces/IBook";
import IBookDiscount from "../../interfaces/IBookDiscount";
import IBookOffer from "../../interfaces/IBookOffer";

export default interface IBookPageItem {
  book: IBook | null;
  authors: IUser[];
  bookOffer: IBookOffer | null;
  bookDiscount: IBookDiscount | null;
}
