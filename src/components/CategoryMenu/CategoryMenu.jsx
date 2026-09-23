import { WORD_CATEGORIES, CATEGORY_NAMES } from "../../data/word";
import { Laptop, Flower2, Palmtree } from "lucide-react";
import "./CategoryMenu.css";

const ICONS = {
  TechLanguages: Laptop,
  SriLanka: Palmtree,
  Flowers: Flower2,
};

export function CategoryMenu({ onSelectCategory }) {
  return (
    <div className="category-menu">
      <h1 className="category-title">Hangman</h1>
      <p className="category-subtitle">Choose a category to begin</p>

      <div className="category-circles">
        {CATEGORY_NAMES.map((name) => {
          const Icon = ICONS[name];
          const { theme } = WORD_CATEGORIES[name];

          return (
            <div>
            <button
              key={name}
              className="category-circle-btn"
              style={{
                "--circle-accent": theme.accent,
              }}
              onClick={() => onSelectCategory(name)}
            >
              <span className="category-circle">
                <Icon size={36} strokeWidth={1.75} />
              </span>
              
            </button>
            <span className="category-name">{theme.label}</span>
            </div>
            
          );
        })}
      </div>
    </div>
  );
}