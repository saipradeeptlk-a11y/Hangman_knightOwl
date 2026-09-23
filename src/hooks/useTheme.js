import { useEffect } from "react";
import { WORD_CATEGORIES } from "../data/word";

export function useTheme(category) {
  useEffect(() => {
    if (!category) return;

    const { theme } = WORD_CATEGORIES[category];
    const root = document.documentElement;

    root.style.setProperty("--background", theme.background);
    root.style.setProperty("--surface", theme.surface);
    root.style.setProperty("--accent", theme.accent);
    root.style.setProperty("--accent-secondary", theme.accentSecondary);
    root.style.setProperty("--text", theme.text);
    root.style.setProperty("--font", theme.font);
  }, [category]);
}