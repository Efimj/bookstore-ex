import { ThemeProvider } from "@emotion/react";
import { useThemeContext } from "./theming/ThemeContextProvider";
import {
  Box,
  CssBaseline,
  Grow,
  Typography,
  responsiveFontSizes,
  styled,
} from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./pages/router";
import { MaterialDesignContent, SnackbarProvider } from "notistack";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import userStore from "./store/UserStore";

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  "&.notistack-MuiContent-success": {
    borderRadius: "10px",
  },
  "&.notistack-MuiContent-error": {
    borderRadius: "10px",
  },
}));

function App() {
  const { theme } = useThemeContext();
  const resTheme = responsiveFontSizes(theme);
  const [loading, setLoading] = useState<boolean>(false);

  const tryAyth = async () => {
    setLoading(true);
    await userStore.tryRefreshAuth();
    setLoading(false);
  };

  useEffect(() => {
    tryAyth();
  }, []);

  const loadingComponent = (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Typography variant="h5" color="secondary">
        Just a second...
      </Typography>
    </Box>
  );

  return (
    <ThemeProvider theme={resTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={3}
          Components={{
            success: StyledMaterialDesignContent,
            error: StyledMaterialDesignContent,
          }}
          autoHideDuration={3000}
        />
        {!loading && <RouterProvider router={router} />}
        {loading && loadingComponent}
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
