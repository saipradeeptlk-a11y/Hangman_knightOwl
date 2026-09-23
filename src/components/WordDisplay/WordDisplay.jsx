import "./WordDisplay.css";

export function WordDisplay({ word, guessedLetters }) {
  return (
    <div className="word-display">
      {[...word].map((letter, index) => (
        <span key={index} className="letter-slot">
          {guessedLetters.has(letter) ? letter : ""}
        </span>
      ))}
    </div>
  );
}