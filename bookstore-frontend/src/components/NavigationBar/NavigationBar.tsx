import { Box, Tabs, Tab, useTheme } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useCurrentRouteNumber } from "../../hooks/useCurrentRouteNumber";
import { NavigateBookCatalogRoute } from "../../pages/BookCatalog/BookCatalog";
import { NavigateLibraryPageRoute } from "../../pages/LibraryPage/LibraryPage";
import { NavigateAccountPageRoute } from "../../pages/AccoutPage/AccountPage";

export interface INavigationBar {}

const NavigationBar: FC<INavigationBar> = ({}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const currentRoute = useCurrentRouteNumber();

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {};

  const handleNavigation = (position: string) => {
    navigate(position);
  };

  return (
    <Box sx={{ backgroundColor: theme.palette.background.paper }}>
      <Tabs value={currentRoute} onChange={handleChangeTab}>
        <Tab
          label="Shop"
          icon={<ReceiptLongOutlinedIcon />}
          iconPosition="start"
          sx={{ textTransform: "none", fontSize: "1.1rem" }}
          onClick={() => handleNavigation(NavigateBookCatalogRoute())}
        />
        <Tab
          label="Library"
          icon={<BookOutlinedIcon />}
          iconPosition="start"
          sx={{ textTransform: "none", fontSize: "1.1rem" }}
          onClick={() => handleNavigation(NavigateLibraryPageRoute("library"))}
        />
        <Tab
          label="Account"
          icon={<AccountCircleOutlinedIcon />}
          iconPosition="start"
          sx={{ textTransform: "none", fontSize: "1.1rem" }}
          onClick={() => handleNavigation(NavigateAccountPageRoute())}
        />
      </Tabs>
    </Box>
  );
};

export default NavigationBar;
