import { PaletteMode } from "@mui/material";
import { green, grey, lightGreen } from "@mui/material/colors";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          background: {
            default: "#fff",
          },
          primary: {
            main: green[700],
            dark: green[800],
          },
          secondary: {
            main: green[700],
            dark: green[800],
          },
          text: {
            primary: "#000",
            secondary: grey[700],
          },
        }
      : {
          background: {
            default: "#121212",
          },
          primary: {
            main: green[500],
            dark: green[800],
          },
          secondary: {
            main: green[500],
            dark: green[800],
          },
          text: {
            primary: "#fff",
            secondary: grey[500],
          },
        }),
  },
});
