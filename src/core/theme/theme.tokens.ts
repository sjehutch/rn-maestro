import type { AppTheme, ThemeName, ThemePreference } from "./theme.types";

export const lightTheme: AppTheme = {
  colors: {
    background: "#FFFFFF",
    text: "#111111",
    primary: "#1E40AF",
    border: "#E5E7EB",
    card: "#F9FAFB",
    placeholder: "#9CA3AF",
    danger: "#DC2626"
  }
};

export const darkTheme: AppTheme = {
  colors: {
    background: "#0B0F1A",
    text: "#F3F4F6",
    primary: "#60A5FA",
    border: "#1F2937",
    card: "#111827",
    placeholder: "#6B7280",
    danger: "#F87171"
  }
};

export const themeByName: Record<ThemeName, AppTheme> = {
  light: lightTheme,
  dark: darkTheme
};

export const resolveThemeName = (
  colorScheme: "light" | "dark" | null | undefined,
  preference: ThemePreference = "system"
): ThemeName => {
  if (preference === "light" || preference === "dark") {
    return preference;
  }

  return colorScheme === "dark" ? "dark" : "light";
};

export const resolveAppTheme = (
  colorScheme: "light" | "dark" | null | undefined,
  preference: ThemePreference = "system"
): AppTheme => {
  return themeByName[resolveThemeName(colorScheme, preference)];
};
