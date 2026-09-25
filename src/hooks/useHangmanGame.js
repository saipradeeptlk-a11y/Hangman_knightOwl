import { useState, useCallback } from "react";
import { WORD_CATEGORIES } from "../data/word";



const MAX_WRONG_GUESSES = 6;

//The function here is for the generation of the word so it uses the Math.random which generates a decimal number and it is multiplied by the lenght of the words array in order to main the range and rounded of using the Math.floor
function pickRandomWord(category){
    const words = WORD_CATEGORIES[category].words;
    return words[Math.floor(Math.random() * words.length)];
}



export function useHangmanGame(category){
    const [word , setWord] = useState(() => pickRandomWord(category));// So here the we use pickRandomWord(category) function to set the word
    const [guessedLetters,setGuessedLetters] = useState(new Set());
    const [showHint,setIsHint] = useState(false) 

const wrongGuesses = [...guessedLetters].filter(
    (letter) => !word.word.includes(letter)
  ); 

  const livesRemaining = MAX_WRONG_GUESSES - wrongGuesses.length;
  const isWinner = [...word.word].every((letter) => guessedLetters.has(letter));//here the word is broken into array and each letter is checked with the guessed letter.
  const isLoser = livesRemaining <= 0;
  const isGameOver = isWinner || isLoser;

  const guessLetter = useCallback(
    (letter) => {
      if (isGameOver || guessedLetters.has(letter)) return; // ignore repeats or guesses after game ends
      setGuessedLetters((currentLetter) => new Set(currentLetter).add(letter));
    },
    [guessedLetters, isGameOver]
  );

  const restart = useCallback(() => {
    setWord(pickRandomWord(category));
    setGuessedLetters(new Set());
  }, [category]);

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

