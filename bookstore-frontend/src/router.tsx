import { createBrowserRouter, Navigate } from "react-router-dom";
import ScreenLayout from "./components/ScreenLayout";
import BookCatalog from "./pages/BookCatalog/BookCatalog";
import Library from "./pages/Library/Library";
import Settings from "./pages/Settings/Settings";
import BookPage from "./pages/Book/BookPage";

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
        element: <Library />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/book/:bookId",
        element: <BookPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/bookcatalog" replace />,
  },
]);

export default router;
