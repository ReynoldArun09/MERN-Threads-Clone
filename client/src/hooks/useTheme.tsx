import { ThemeProviderContext } from "@/context/themeProvider";
import { useContext } from "react";

export default function useTheme() {
  const context = useContext(ThemeProviderContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
}
