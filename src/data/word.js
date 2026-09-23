export const WORD_CATEGORIES = {
  TechLanguages: {
    words: ["JAVASCRIPT", "PYTHON", "JAVA", "TYPESCRIPT", "PHP", "RUBY", "SWIFT", "KOTLIN", "RUST", "GOLANG"],
    theme: {
      label: "Tech & Languages",
      background: "#060b14",
      surface: "#0d1626",
      accent: "#00e5ff",
      accentSecondary: "#7c4dff",
      text: "#e6f7ff",
      font: "'Space Mono', monospace",
    },
  },
  SriLanka: {
    words: ["COLOMBO", "KANDY", "ANURADHAPURA", "GALLE", "JAFFNA", "NEGOMBO", "TRINCOMALEE", "BATTICALOA", "MATARA", "RATNAPURA", "KURUNEGALA", "BADULLA", "NUWARAELIYA", "DAMBULLA", "SIGIRIYA"],
    theme: {
      label: "Sri Lanka",
      background: "#1a0508",
      surface: "#2b0d12",
      accent: "#d4af37",
      accentSecondary: "#8b0000",
      text: "#fdf3e0",
      font: "'Cinzel', serif",
    },
  },
  Flowers: {
    words: ["ROSE", "LOTUS", "JASMINE", "SUNFLOWER", "ORCHID", "TULIP", "LILY", "HIBISCUS", "DAISY", "MARIGOLD"],
    theme: {
      label: "Flowers",
      background: "#1a0f1c",
      surface: "#2a1730",
      accent: "#ff5e9e",
      accentSecondary: "#ffb703",
      text: "#fff0f6",
      font: "'Quicksand', sans-serif",
    },
  },
};

export const CATEGORY_NAMES = Object.keys(WORD_CATEGORIES);