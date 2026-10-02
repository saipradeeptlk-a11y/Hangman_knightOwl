import { CategoryMenu } from "./components/CategoryMenu/CategoryMenu";

import { Info} from "lucide-react";
import { LogOut } from "lucide-react";
import { LogIn } from "lucide-react";
import { useHangmanGame } from "./hooks/useHangmanGame";
import { HangmanFigure } from "./components/HangmanFigure/HangmanFigure";
import "./App.css";
import { useTheme } from "./hooks/useTheme";
import { WordDisplay } from "./components/WordDisplay/WordDisplay";
import { Keyboard } from "./components/Keyboard/Keyboard";
import { GameOverModal } from "./components/GameOverModal/GameOverModal";
import { WORD_CATEGORIES } from "./data/word";
import { useState, useEffect } from "react";
import { recordGameResult,fetchStats } from "./services/api";
import {Hint} from "./components/HintModal/HintModal";
import { AuthForm } from "./components/AuthForm/AuthForm";
import {useAuth} from "./hooks/useAuth";


function App() {
const[selectedCategory,setSelectedCategory] =  useState(null);
const { user, token, login, logout } = useAuth();
const [guestMode, setGuestMode] = useState(false);

useTheme(selectedCategory);

function fLogin(){
return(<AuthForm
  onAuthSuccess={(userData, tokenValue) => login(userData, tokenValue)}
  onPlayAsGuest={() => setGuestMode(true)}
/>)
}

if(!user && guestMode === false){
  return fLogin();
}


if(!selectedCategory){
  return <CategoryMenu onSelectCategory={setSelectedCategory}/>;
}


return (
    <GameScreen
      category={selectedCategory}
      onChangeCategory={() => setSelectedCategory(null)}
      user={user}
      token={token}
      onLogout={()=>logout()}
      guestMode={guestMode}
      setGuestMode={()=>setGuestMode(false)}

      
    />
  );
};

function GameScreen({ category, onChangeCategory,user,token,onLogout,guestMode,setGuestMode}) {
  const game = useHangmanGame(category);
  const label = WORD_CATEGORIES[category].theme.label;
  const [stats, setStats] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showHint, setShowHintModal] = useState(false);
  const [lookedHint,setlookedHint] = useState(true);
  
  

  useEffect(() => {
    if (game.isGameOver) {
      if (token) {
    recordGameResult(token, {
      category,
      word: game.word.word,
      won: game.isWinner,
      wrongGuesses: game.wrongGuesses.length,
    }).then(() => {
  fetchStats(token).then(setStats);
});
  console.log({
    category,
    word: game.word.word,
    won: game.isWinner,
    wrongGuesses: game.wrongGuesses.length,
  });
}

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

  // Wait for the word to load from the API before rendering the board
  if (!game.word) return <p>Loading...</p>;

  return (
    <div className="game-screen">
      <header className="game-header">
        <span className="category-label">{label}</span>
        <span className="lives-label">❤️ {game.livesRemaining}</span>
        
        <button className="hint-btn" onClick={()=>{setShowHintModal(true); }}> <Info size={24} strokeWidth={2} /> </button>
        
        {guestMode ?
        <button className="hint-btn" onClick={()=>{ setGuestMode()}}><LogIn size={24} strokeWidth={2} /> </button> :
        <button className="hint-btn" onClick={()=>{ onLogout()}}><LogOut size={24} strokeWidth={2} /> </button>
        }
        
        
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