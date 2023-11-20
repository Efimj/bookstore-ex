import { createBrowserRouter, Navigate } from "react-router-dom";
import ScreenLayout from "../components/ScreenLayout";
import BookCatalog from "./BookCatalog/BookCatalog";
import LibraryPage from "./LibraryPage/LibraryPage";
import SettingsPage from "./SettingsPage/SettingsPage";
import BookPage from "./BookPage/BookPage";
import UserPage from "./UserPage/UserPage";
import AccountPage from "./AccoutPage/AccountPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ScreenLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/bookcatalog" replace />,
      },
      {
        path: "/bookcatalog",
        element: <BookCatalog />,
      },
      {
        path: "/library",
        element: <LibraryPage />,
      },
      {
        path: "/account",
        element: <AccountPage />,
      },
      {
        path: "/book/:bookId",
        element: <BookPage />,
      },
      {
        path: "/user/:userId",
        element: <UserPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/bookcatalog" replace />,
  },
]);

export default router;
