import IBookAuthor from "./IBookAuthor";
import IBookReview from "./IBookReview";
import ICheck from "./ICheck";
import IWishBook from "./IWishBook";

export default interface IBookSate {
    review: IBookReview;
    check: ICheck;
    author: IBookAuthor;
    wish: IWishBook;
  }