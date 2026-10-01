import { useEffect } from "react";
import { WORD_CATEGORIES , DEFAULT_THEME} from "../data/word";


export function useTheme(category) {
  useEffect(() => {
    

    const theme = category
      ? WORD_CATEGORIES[category].theme
      : DEFAULT_THEME;

    const root = document.documentElement;

    root.style.setProperty("--background", theme.background);
    root.style.setProperty("--surface", theme.surface);
    root.style.setProperty("--accent", theme.accent);
    root.style.setProperty("--accent-secondary", theme.accentSecondary);
    root.style.setProperty("--text", theme.text);
    root.style.setProperty("--font", theme.font);
  }, [category]);
}