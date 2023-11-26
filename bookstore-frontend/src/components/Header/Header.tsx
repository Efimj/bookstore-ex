import { useThemeContext } from "../../theming/ThemeContextProvider";
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightMode";
import { Toolbar, Typography, Box, IconButton, Paper } from "@mui/material";
import NavigationBar from "../NavigationBar/NavigationBar";
import SearchModal from "../SearchModal/SearchModal";

export interface IAppHeader {}

export default function Header(props: IAppHeader) {
  const { mode, toggleColorMode } = useThemeContext();

  return (
    <Paper elevation={0} sx={{ borderRadius: 0 }}>
      <Toolbar style={{ height: 72 }}>
        <Typography
          gutterBottom
          variant="h5"
          color="text.secondary"
          noWrap
          sx={{
            overflow: "visible",
            paddingRight: "20px",
            alignItems: "center",
            margin: 0,
            display: { xs: "flex", sm: "none", md: "flex" },
          }}
        >
          Book Store
        </Typography>
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
          <IconButton onClick={toggleColorMode}>
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
