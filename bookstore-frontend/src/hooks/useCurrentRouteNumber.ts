import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BookCatalogRoute } from "../pages/BookCatalog/BookCatalog";
import { LibraryPageRoute } from "../pages/LibraryPage/LibraryPage";
import { AccountPageRoute } from "../pages/AccoutPage/AccountPage";

export const useCurrentRouteNumber = () => {
  function getRouteNumber(pathname: string): number {
    const cleanPathname = pathname.split("/")[1];

    if (cleanPathname === BookCatalogRoute.split("/")[1]) {
      return 0;
    } else if (cleanPathname === LibraryPageRoute.split("/")[1]) {
      return 1;
    } else if (cleanPathname === AccountPageRoute.split("/")[1]) {
      return 2;
    }

    return 0;
  }

  const location = useLocation();

  const [selectedTab, setSelectedTab] = useState<number>(
    getRouteNumber(location.pathname)
  );

  useEffect(() => {
    setSelectedTab(getRouteNumber(location.pathname));
  }, [location]);

  return selectedTab;
};
