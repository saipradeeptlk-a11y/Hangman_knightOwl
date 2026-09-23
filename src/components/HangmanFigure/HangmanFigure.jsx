import "./HangmanFigure.css";

export function HangmanFigure({ wrongCount }) {
  return (
    <svg viewBox="0 0 200 250" className="hangman-figure">
      {wrongCount >= 1 && (
        <>
          <line x1="20" y1="230" x2="120" y2="230" stroke="var(--text)" strokeWidth="4" className="part" />
          <line x1="50" y1="230" x2="50" y2="20" stroke="var(--text)" strokeWidth="4" className="part" />
        </>
      )}
      {wrongCount >= 2 && (
        <line x1="50" y1="20" x2="130" y2="20" stroke="var(--text)" strokeWidth="4" className="part" />
      )}
      {wrongCount >= 3 && (
        <line x1="130" y1="20" x2="130" y2="50" stroke="var(--text)" strokeWidth="4" className="part" />
      )}
      {wrongCount >= 4 && (
        <circle cx="130" cy="70" r="20" stroke="var(--accent-secondary)" strokeWidth="4" fill="none" className="part" />
      )}
      {wrongCount >= 5 && (
        <>
          <line x1="130" y1="90" x2="130" y2="150" stroke="var(--accent-secondary)" strokeWidth="4" className="part" />
          <line x1="130" y1="105" x2="105" y2="130" stroke="var(--accent-secondary)" strokeWidth="4" className="part" />
          <line x1="130" y1="105" x2="155" y2="130" stroke="var(--accent-secondary)" strokeWidth="4" className="part" />
        </>
      )}
      {wrongCount >= 6 && (
        <>
          <line x1="130" y1="150" x2="110" y2="190" stroke="var(--accent-secondary)" strokeWidth="4" className="part" />
          <line x1="130" y1="150" x2="150" y2="190" stroke="var(--accent-secondary)" strokeWidth="4" className="part" />
        </>
      )}
    </svg>
  );
}