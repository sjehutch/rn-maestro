import type React from "react";
import { createContext } from "react";
import { useColorScheme } from "react-native";
import { resolveAppTheme } from "./theme.tokens";
import type { AppTheme, ThemePreference } from "./theme.types";

export const ThemeContext = createContext<AppTheme>(resolveAppTheme("light"));

type ThemeProviderProps = {
  children: React.ReactNode;
  preference?: ThemePreference;
};

export const ThemeProvider = ({
  children,
  preference = "system"
}: ThemeProviderProps) => {
  const colorScheme = useColorScheme();
  const theme = resolveAppTheme(colorScheme, preference);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};
