import { IBookInformation } from "../../interfaces/IBookInformation";
import IBookSate from "../../interfaces/IBookSate";

export default interface IBookPageItem {
  book: IBookInformation;
  bookSate: IBookSate | null;
  updateBookState: () => Promise<void>;
}
