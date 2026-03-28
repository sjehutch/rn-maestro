export type ThemeName = "light" | "dark";

export type ThemePreference = ThemeName | "system";

export type AppTheme = {
  colors: {
    background: string;
    text: string;
    primary: string;
    border: string;
    card: string;
    placeholder: string;
    danger: string;
  };
};
