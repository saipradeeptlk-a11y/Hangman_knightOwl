import { CategoryMenu } from "./components/CategoryMenu/CategoryMenu";
import { useTheme } from "./hooks/useTheme";
import { useHangmanGame } from "./hooks/useHangmanGame";
import { HangmanFigure } from "./components/HangmanFigure/HangmanFigure";
import "./App.css";
import { WordDisplay } from "./components/WordDisplay/WordDisplay";
import { Keyboard } from "./components/Keyboard/Keyboard";
import { GameOverModal } from "./components/GameOverModal/GameOverModal";
import { WORD_CATEGORIES } from "./data/word";
import { useState, useEffect } from "react";
import { recordGameResult } from "./services/api";

function App() {
const[selectedCategory,setSelectedCategory] =  useState(null);
useTheme(selectedCategory);
if(!selectedCategory){
  return <CategoryMenu onSelectCategory={setSelectedCategory}/>;
}
return (
    <GameScreen
      category={selectedCategory}
      onChangeCategory={() => setSelectedCategory(null)}
    />
  );
};

function GameScreen({ category, onChangeCategory }) {
  const game = useHangmanGame(category);
  const label = WORD_CATEGORIES[category].theme.label;
  const [stats, setStats] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (game.isGameOver) {
      recordGameResult(game.isWinner).then(setStats);

      const timer = setTimeout(() => {
        setShowModal(true);
      }, 1200);

      return () => clearTimeout(timer);
    } else {
      setShowModal(false);
    }
  }, [game.isGameOver]);

  return (
    <div className="game-screen">
      <header className="game-header">
        <span className="category-label">{label}</span>
        <span className="lives-label">❤️ {game.livesRemaining}</span>
      </header>

      <HangmanFigure wrongCount={game.wrongGuesses.length} />
      <WordDisplay word={game.word} guessedLetters={game.guessedLetters} />
      <Keyboard
        word={game.word}
        guessedLetters={game.guessedLetters}
        onGuess={game.guessLetter}
        disabled={game.isGameOver}
      />

      <button className="change-category-btn" onClick={onChangeCategory}>
        ← Change Category
      </button>

      {showModal && (
        <GameOverModal
          isWinner={game.isWinner}
          word={game.word}
          onRestart={game.restart}
          onChangeCategory={onChangeCategory}
          stats={stats}
        />
      )}
    </div>
  );
}
export default App;