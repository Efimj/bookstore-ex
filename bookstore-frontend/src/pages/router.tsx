import { createBrowserRouter, Navigate } from "react-router-dom";
import ScreenLayout from "../components/ScreenLayout";
import BookCatalog from "./BookCatalog/BookCatalog";
import LibraryPage from "./LibraryPage/LibraryPage";
import BookPage from "./BookPage/BookPage";
import UserPage from "./UserPage/UserPage";
import AccountPage from "./AccoutPage/AccountPage";
import AuthorizationForm from "../components/AuthorizationForm/AuthorizationForm";
import { me } from "../api/auth";
import { getAccount } from "../api/user";

const AuthForm = (
  <AuthorizationForm
    isOpened={true}
    onDismiss={() => {
      history.back();
    }}
    onSignIn={() => {
      window.location.reload();
    }}
    onSignUp={() => {
      window.location.reload();
    }}
  />
);

const checkAuth = async (): Promise<boolean> => {
  await me();
  return true;
};

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
        path: "/library/:page",
        element: <LibraryPage />,
        loader: checkAuth,
        errorElement: AuthForm,
      },
      {
        path: "/account",
        element: <AccountPage />,
        loader: checkAuth,
        errorElement: AuthForm,
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
