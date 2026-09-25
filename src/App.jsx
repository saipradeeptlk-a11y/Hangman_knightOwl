import { CategoryMenu } from "./components/CategoryMenu/CategoryMenu";
import { useTheme } from "./hooks/useTheme";
import { Info } from "lucide-react";
import { useHangmanGame } from "./hooks/useHangmanGame";
import { HangmanFigure } from "./components/HangmanFigure/HangmanFigure";
import "./App.css";
import { WordDisplay } from "./components/WordDisplay/WordDisplay";
import { Keyboard } from "./components/Keyboard/Keyboard";
import { GameOverModal } from "./components/GameOverModal/GameOverModal";
import { WORD_CATEGORIES } from "./data/word";
import { useState, useEffect } from "react";
import { recordGameResult } from "./services/api";
import {Hint} from "./components/HintModal/HintModal";

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
  const [showHint, setShowHintModal] = useState(false);
  const [lookedHint,setlookedHint] = useState(true);

  useEffect(() => {
    if (game.isGameOver) {
      recordGameResult(game.isWinner).then(setStats);

      const timer = setTimeout(() => {
        setShowModal(true);
        
      }, 1200);
      

      return () => clearTimeout(timer);
      
    } else {
      setShowModal(false);
      setlookedHint(true);
      setShowHintModal(false);
      
    }
  }, [game.isGameOver]);



  return (
    <div className="game-screen">
      <header className="game-header">
        <span className="category-label">{label}</span>
        <span className="lives-label">❤️ {game.livesRemaining}</span>
        <button onClick={()=>{setShowHintModal(true); }}> <Info size={24} strokeWidth={2} /> </button>

      </header>

      <HangmanFigure wrongCount={game.wrongGuesses.length} />
      <WordDisplay word={game.word.word} guessedLetters={game.guessedLetters} />
      <Keyboard
        word={game.word.word}
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
          word={game.word.word}
          onRestart={game.restart}
          onChangeCategory={onChangeCategory}
          stats={stats}
        />
      )}

      { 
        showHint && (
          lookedHint && (
          <Hint Hint={game.word.hint} onclose={()=>{setShowHintModal(false); setlookedHint(false);}}/>)
          
        )
      }
    </div>
  );
}
export default App;