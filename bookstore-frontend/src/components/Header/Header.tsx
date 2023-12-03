import { useThemeContext } from "../../theming/ThemeContextProvider";
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightMode";
import {
  Toolbar,
  Typography,
  Box,
  IconButton,
  Paper,
  CardActionArea,
  useTheme,
} from "@mui/material";
import NavigationBar from "../NavigationBar/NavigationBar";
import SearchModal from "../SearchModal/SearchModal";
import { useNavigate } from "react-router-dom";

export interface IAppHeader {}

export default function Header(props: IAppHeader) {
  const theme = useTheme();
  const { mode, toggleColorMode } = useThemeContext();
  const navigate = useNavigate();

  return (
    <Paper elevation={0} sx={{ borderRadius: 0 }}>
      <Toolbar style={{ height: 72 }}>
        <CardActionArea
          sx={{
            overflow: "visible",
            paddingRight: "20px",
            alignItems: "center",
            margin: 0,
            display: { xs: "flex", sm: "none", md: "flex" },
            cursor: "pointer",
            height: "100%",
            width: "fit-content",
          }}
          onClick={() => navigate("/")}
        >
          <Typography
            gutterBottom
            variant="h5"
            sx={{ marginBottom: "0" }}
            color="text.secondary"
            noWrap
          >
            Book Store
          </Typography>
        </CardActionArea>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <NavigationBar />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            width: "100%",
            gap: "1rem",
          }}
        >
          <SearchModal></SearchModal>
          <IconButton
            onClick={toggleColorMode}
            sx={{ color: theme.palette.text.secondary }}
          >
            {mode === "light" ? (
              <Brightness4OutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
        </Box>
      </Toolbar>
    </Paper>
  );
}
