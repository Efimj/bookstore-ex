import { createBrowserRouter, Navigate } from "react-router-dom";
import ScreenLayout from "../components/ScreenLayout";
import BookCatalog, { BookCatalogRoute, BookCatalogRouteName } from "./BookCatalog/BookCatalog";
import LibraryPage, { LibraryPageRoute } from "./LibraryPage/LibraryPage";
import BookPage, { BookPageRoute } from "./BookPage/BookPage";
import UserPage, { UserPageRoute } from "./UserPage/UserPage";
import AccountPage, { AccountPageRoute } from "./AccoutPage/AccountPage";
import AuthorizationForm from "../components/AuthorizationForm/AuthorizationForm";
import PublishBookPage, {
  PublishBookPageRoute,
} from "./PublishBookPage/PublishBookPage";
import userStore from "../store/UserStore";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import SettingsPage, { AccountSettingsPageRoute } from "./SettingsPage/SettingsPage";

export const LogInRoute = "LogInRoute";

const AuthForm = (
  <AuthorizationForm
    isOpened={true}
    onDismiss={() => {
      history.back();
    }}
    onSignIn={() => {}}
    onSignUp={() => {}}
  />
);

interface IPrivatePage {
  children: React.ReactElement;
}

const PrivatePage: FC<IPrivatePage> = observer(({ children }) => {
  if (userStore.checkAuth()) {
    return children;
  } else {
    return AuthForm;
  }
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <ScreenLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={BookCatalogRouteName} replace />,
      },
      {
        path: BookCatalogRoute,
        element: <BookCatalog />,
      },
      {
        path: LibraryPageRoute,
        element: (
          <PrivatePage>
            <LibraryPage />
          </PrivatePage>
        ),
        errorElement: AuthForm,
      },
      {
        path: AccountPageRoute,
        element: (
          <PrivatePage>
            <AccountPage />
          </PrivatePage>
        ),
        errorElement: AuthForm,
      },
      {
        path: AccountSettingsPageRoute,
        element: (
          <PrivatePage>
            <SettingsPage />
          </PrivatePage>
        ),
        errorElement: AuthForm,
      },
      {
        path: PublishBookPageRoute,
        element: (
          <PrivatePage>
            <PublishBookPage />
          </PrivatePage>
        ),
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
