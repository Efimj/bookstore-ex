import IUser from "./IAuthor";

export default interface IBookReview {
  review_id: number;
  book_id: number;
  user: IUser;
  description: string;
  rating: number;
  created_at: string;
  updated_at: string;
}
