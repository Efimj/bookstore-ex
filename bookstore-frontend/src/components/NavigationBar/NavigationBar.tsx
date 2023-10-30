import { Box, Tabs, Tab, useTheme } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useCurrentRouteNumber } from "../../hooks/useCurrentRouteNumber";

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
