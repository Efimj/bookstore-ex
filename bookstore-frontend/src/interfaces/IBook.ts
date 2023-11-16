export default interface IBook {
  book_id: number;
  age_restriction_id: number;
  title: string;
  description: string;
  page_count: number;
  image: string;
  publication_date: Date;
  created_at: string;
  updated_at: string;
}
