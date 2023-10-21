import { createTheme, PaletteMode, Theme } from "@mui/material";
import { createContext, FC, PropsWithChildren, useContext } from "react";
import { useColorTheme } from "../hooks/useColorTheme";

type ThemeContextType = {
  mode: string;
  toggleColorMode: () => void;
  theme: Theme;
};

export const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleColorMode: () => {},
  theme: createTheme(),
});

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const value = useColorTheme();
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

export const getSavedTheme = (): PaletteMode => {
  const theme = `${window?.localStorage?.getItem("application-theme")}`;
  if (theme === "light" || theme === "dark") {
    return theme;
  }

  const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
  if (userMedia.matches) {
    return "dark";
  }

  return "light";
};

export const saveTheme = (theme: PaletteMode): void => {
  localStorage.setItem("application-theme", theme);
};
