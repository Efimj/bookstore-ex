import { createBrowserRouter, Navigate } from "react-router-dom";
import ScreenLayout from "../components/ScreenLayout";
import BookCatalog, { BookCatalogRoute } from "./BookCatalog/BookCatalog";
import LibraryPage, { LibraryPageRoute } from "./LibraryPage/LibraryPage";
import BookPage, { BookPageRoute } from "./BookPage/BookPage";
import UserPage, { UserPageRoute } from "./UserPage/UserPage";
import AccountPage, { AccountPageRoute } from "./AccoutPage/AccountPage";
import AuthorizationForm from "../components/AuthorizationForm/AuthorizationForm";
import { me } from "../api/auth";
import PublishBookPage, {
  PublishBookPageRoute,
} from "./PublishBookPage/PublishBookPage";

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
        element: <Navigate to={BookCatalogRoute} replace />,
      },
      {
        path: BookCatalogRoute,
        element: <BookCatalog />,
      },
      {
        path: LibraryPageRoute,
        element: <LibraryPage />,
        loader: checkAuth,
        errorElement: AuthForm,
      },
      {
        path: AccountPageRoute,
        element: <AccountPage />,
        loader: checkAuth,
        errorElement: AuthForm,
      },
      {
        path: PublishBookPageRoute,
        element: <PublishBookPage />,
        loader: checkAuth,
        errorElement: AuthForm,
      },
      {
        path: BookPageRoute,
        element: <BookPage />,
      },
      {
        path: UserPageRoute,
        element: <UserPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={BookCatalogRoute} replace />,
  },
]);

export default router;
