import IBook from "./IBook";
import IUser from "./IAuthor";
import IBookOffer from "./IBookOffer";
import IBookDiscount from "./IBookDiscount";
import IBookEvaluations from "./IBookEvaluations";

export interface IBookInformation {
  book: IBook;
  authors: IUser[];
  discount: IBookDiscount;
  offer: IBookOffer;
  evaluations: IBookEvaluations;
}
