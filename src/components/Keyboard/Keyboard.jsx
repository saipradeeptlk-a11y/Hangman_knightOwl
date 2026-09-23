import { useEffect } from "react";
import "./Keyboard.css";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function Keyboard({ guessedLetters, word, onGuess, disabled }) {
  // physical keyboard support
  useEffect(() => {
    function handleKeyDown(e) {
      const letter = e.key.toUpperCase();
      if (LETTERS.includes(letter)) {
        onGuess(letter);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onGuess]);

  return (
    <div className="keyboard">
      {LETTERS.map((letter) => {
        const isGuessed = guessedLetters.has(letter);
        const isCorrect = isGuessed && word.includes(letter);
        const isWrong = isGuessed && !word.includes(letter);

        return (
          <button
            key={letter}
            onClick={() => onGuess(letter)}
            disabled={isGuessed || disabled}
            className={
              "key" +
              (isCorrect ? " key-correct" : "") +
              (isWrong ? " key-wrong" : "")
            }
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}