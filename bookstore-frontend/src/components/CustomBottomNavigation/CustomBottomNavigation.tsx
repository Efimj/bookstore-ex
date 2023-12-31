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
import { useCurrentRouteNumber } from "../../hooks/useCurrentRouteNumber";
import { NavigateBookCatalogRoute } from "../../pages/BookCatalog/BookCatalog";
import { NavigateLibraryPageRoute } from "../../pages/LibraryPage/LibraryPage";
import { NavigateAccountPageRoute } from "../../pages/AccoutPage/AccountPage";

export interface IBottomNavigation {}

const CustomBottomNavigation: FC<IBottomNavigation> = ({}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const currentRoute = useCurrentRouteNumber();

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {};

  const handleNavigation = (position: string) => {
    navigate(position);
  };

  return (
    <Paper
      sx={{ backgroundColor: theme.palette.background.paper, width: "100%" }}
      elevation={5}
    >
      <BottomNavigation
        showLabels
        value={currentRoute}
        onChange={handleChangeTab}
      >
        <BottomNavigationAction
          label="Recents"
          icon={<ReceiptLongOutlinedIcon />}
          key={"bookcatalog"}
          onClick={() => handleNavigation(NavigateBookCatalogRoute())}
        />
        <BottomNavigationAction
          label="Library"
          icon={<BookOutlinedIcon />}
          key={"library"}
          onClick={() => handleNavigation(NavigateLibraryPageRoute("library"))}
        />
        <BottomNavigationAction
          label="Account"
          icon={<AccountCircleOutlinedIcon />}
          key={"account"}
          onClick={() => handleNavigation(NavigateAccountPageRoute())}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default CustomBottomNavigation;
