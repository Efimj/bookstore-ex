import { ThemeProvider } from "@emotion/react";
import { useThemeContext } from "./theming/ThemeContextProvider";
import { CssBaseline, responsiveFontSizes, styled } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./pages/router";
import { MaterialDesignContent, SnackbarProvider } from "notistack";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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
        <RouterProvider router={router} />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
