const server = "http://bookstore-backend/";

const api = {
  server: server,

  // Book
  books: server + "books",
  book: server + "book",
  book_authors: server + "book_authors",
  book_offer: server + "book_offer",
  book_discount: server + "book_discount",
  book_evaluations: server + "book_evaluations",
  book_reviews: server + "book_reviews",

  // User
  user: server + "user",
};

export default api;
