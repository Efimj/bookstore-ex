import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useCurrentRouteNumber = () => {
  function getRouteNumber(pathname: string): number {
    const cleanPathname = pathname.split("/")[1];

    if (cleanPathname === "bookcatalog") {
      return 0;
    } else if (cleanPathname === "library") {
      return 1;
    } else if (cleanPathname === "account") {
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
