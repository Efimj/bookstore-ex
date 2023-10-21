import { PaletteMode } from "@mui/material";
import { grey, lightGreen } from "@mui/material/colors";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          background: {
            default: "#fff",
          },
          primary: {
            main: lightGreen[700],
            dark: lightGreen[800],
          },
          secondary: {
            main: lightGreen[700],
            dark: lightGreen[800],
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
            main: lightGreen[500],
            dark: lightGreen[800],
          },
          secondary: {
            main: lightGreen[500],
            dark: lightGreen[800],
          },
          text: {
            primary: "#fff",
            secondary: grey[500],
          },
        }),
  },
});
