import { ThemeProvider } from "@emotion/react";
import { useThemeContext } from "./theming/ThemeContextProvider";
import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./router";

function App() {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
