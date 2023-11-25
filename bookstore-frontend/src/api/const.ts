const server = "http://bookstore-backend/";

const api = {
  server: server,

  // Book
  books: server + "books",
  book: server + "book",
  book_state: server + "book_state",
  book_authors: server + "book_authors",
  book_offer: server + "book_offer",
  book_discount: server + "book_discount",
  book_evaluations: server + "book_evaluations",
  book_reviews: server + "book_reviews",

  // User
  user: server + "user",
  user_wishes: server + "wishes",
  user_library: server + "library",
  user_publish: server + "publish",
  account: server + "account",

  // Auth
  login: server + "auth/login",
  logout: server + "auth/logout",
  refresh: server + "auth/refresh",
  me: server + "auth/me",
};

export default api;
