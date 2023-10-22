import { ThemeProvider } from "@emotion/react";
import { useThemeContext } from "./theming/ThemeContextProvider";
import { CssBaseline, responsiveFontSizes } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./router";

function App() {
  const { theme } = useThemeContext();
  const resTheme = responsiveFontSizes(theme)

  return (
    <ThemeProvider theme={resTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
