import { useState, useCallback, useEffect, useRef } from "react";

const MAX_WRONG_GUESSES = 6;

// Math.random() gives a decimal from 0 up to (not including) 1; multiplying by the
// list length scales it to the list size, and Math.floor rounds down to a valid index.
function pickRandomWord(data) {
  return data[Math.floor(Math.random() * data.length)];
}

export function useHangmanGame(category) {
  const [word, setWord] = useState();
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [showHint, setIsHint] = useState(false);
  const wordList = useRef([]); // keeps the fetched words between renders for restart

  useEffect(() => {
    async function loadDatabase() {
      try {
        const res = await fetch(`/api/words?category=${category}`);
        if (!res.ok) throw new Error("Request failed");
        const data = await res.json();

        wordList.current = data;
        setWord(pickRandomWord(data));
        setGuessedLetters(new Set());
      } catch (err) {
        console.error("Failed to load words:", err);
      }
    }
    loadDatabase();
  }, [category]);

  const { word: w = "", hint } = word ?? {};

  const wrongGuesses = [...guessedLetters].filter(
    (letter) => !w.includes(letter)
  );

  const livesRemaining = MAX_WRONG_GUESSES - wrongGuesses.length;

  // word !== undefined stops an empty word counting as a win before it loads
  const isWinner =
    word !== undefined && [...w].every((letter) => guessedLetters.has(letter));
  const isLoser = livesRemaining <= 0;
  const isGameOver = isWinner || isLoser;

  const guessLetter = useCallback(
    (letter) => {
      if (isGameOver || guessedLetters.has(letter)) return;
      setGuessedLetters((currentLetter) => new Set(currentLetter).add(letter));
    },
    [guessedLetters, isGameOver]
  );

  const restart = useCallback(() => {
    setWord(pickRandomWord(wordList.current));
    setGuessedLetters(new Set());
  }, []);

  return {
    word,
    guessedLetters,
    wrongGuesses,
    livesRemaining,
    isWinner,
    isLoser,
    isGameOver,
    guessLetter,
    restart,
  };
}