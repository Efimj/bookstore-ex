import { Box, Tabs, Tab, useTheme } from "@mui/material";
import { useState, useEffect, FC } from "react";
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

export interface INavigationBar {}

const NavigationBar: FC<INavigationBar> = ({}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedTab, setSelectedTab] = useState<number>(
    getRouteNumber(location.pathname)
  );

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleNavigation = (position: string) => {
    navigate(position);
  };

  useEffect(() => {
    setSelectedTab(getRouteNumber(location.pathname));
  }, [location]);

  return (
    <Box sx={{ backgroundColor: theme.palette.background.paper }}>
      <Tabs value={selectedTab} onChange={handleChangeTab}>
        <Tab
          label="Shop"
          icon={<ReceiptLongOutlinedIcon />}
          iconPosition="start"
          sx={{ textTransform: "none", fontSize: "1.1rem" }}
          onClick={() => handleNavigation("bookcatalog")}
        />
        <Tab
          label="Library"
          icon={<BookOutlinedIcon />}
          iconPosition="start"
          sx={{ textTransform: "none", fontSize: "1.1rem" }}
          onClick={() => handleNavigation("library")}
        />
        <Tab
          label="Account"
          icon={<AccountCircleOutlinedIcon />}
          iconPosition="start"
          sx={{ textTransform: "none", fontSize: "1.1rem" }}
          onClick={() => handleNavigation("settings")}
        />
      </Tabs>
    </Box>
  );
};

export default NavigationBar;
