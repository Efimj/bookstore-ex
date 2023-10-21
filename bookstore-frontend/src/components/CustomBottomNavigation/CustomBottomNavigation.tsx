import {
  Box,
  Tabs,
  Tab,
  useTheme,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import { FC, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

function getRouteNumber(pathname: string): number {
  const cleanPathname = pathname.replace("/", "");

  if (cleanPathname === "bookcatalog") {
    return 0;
  } else if (cleanPathname === "library") {
    return 1;
  } else if (cleanPathname === "settings") {
    return 2;
  }

  return 0;
}

export interface IBottomNavigation {}

const CustomBottomNavigation: FC<IBottomNavigation> = ({}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedTab, setSelectedTab] = useState<number>(
    getRouteNumber(location.pathname)
  );

  const handleNavigation = (position: string) => {
    navigate(position);
  };

  useEffect(() => {
    setSelectedTab(getRouteNumber(location.pathname));
  }, [location]);

  return (
    <Paper
      sx={{ backgroundColor: theme.palette.background.paper, width: "100%" }}
      elevation={5}
    >
      <BottomNavigation showLabels value={selectedTab}>
        <BottomNavigationAction
          label="Recents"
          icon={<ReceiptLongOutlinedIcon />}
          key={"bookcatalog"}
          onClick={() => handleNavigation("bookcatalog")}
        />
        <BottomNavigationAction
          label="Library"
          icon={<BookOutlinedIcon />}
          key={"library"}
          onClick={() => handleNavigation("library")}
        />
        <BottomNavigationAction
          label="Account"
          icon={<AccountCircleOutlinedIcon />}
          key={"settings"}
          onClick={() => handleNavigation("settings")}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default CustomBottomNavigation;
