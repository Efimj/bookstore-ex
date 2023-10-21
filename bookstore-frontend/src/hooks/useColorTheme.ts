import { createTheme, PaletteMode } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import { getDesignTokens } from "../theming/Theme";
import { getSavedTheme, saveTheme } from "../theming/ThemeContextProvider";

export const useColorTheme = () => {
  const [mode, setMode] = useState<PaletteMode>(getSavedTheme());

  useEffect(() => {
    saveTheme(mode);
  }, [mode]);

  const toggleColorMode = () =>
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));

  const modifiedTheme = useMemo(
    () => createTheme(getDesignTokens(mode)),
    [mode]
  );

  return {
    theme: modifiedTheme,
    mode,
    toggleColorMode,
  };
};
