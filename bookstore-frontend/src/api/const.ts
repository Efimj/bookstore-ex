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
  authors_by_email: server + "authors_by_email",
  publish_book: server + "publish_book",
  update_book: server + "update_book",
  edit_book_offer: server + "edit_book_offer",
  edit_book_discount: server + "edit_book_discount",
  delete_book_discount: server + "delete_book_discount",
  publish_book_review: server + "publish_book_review",
  delete_book_review: server + "delete_book_review",
  handle_book_wish: server + "handle_book_wish",

  // User
  user: server + "user",
  user_wishes: server + "user_wishes",
  user_library: server + "user_library",
  user_publish: server + "user_publish",
  // my_wishes: server + "my_wishes",
  // my_library: server + "my_library",
  // my_publish: server + "my_publish",
  account: server + "account",
  purchase_book: server + "purchase_book",
  registration: server + "registration",
  update_account_data: server + "update_account_data",
  update_account_password: server + "update_account_password",

  // Auth
  login: server + "auth/login",
  logout: server + "auth/logout",
  refresh: server + "auth/refresh",
  me: server + "auth/me",

  // service
  allAgeRestrictions: server + "all_age_restrictions",
};

export default api;
