import "./GameOverModal.css";

export function GameOverModal({ isWinner, word, onRestart, onChangeCategory, stats }) {
  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2 className={isWinner ? "modal-title win" : "modal-title lose"}>
          {isWinner ? "You Won!" : "Game Over"}
        </h2>
        <p className="modal-word">
          The word was <strong>{word}</strong>
        </p>

        {stats && (
          <p className="modal-stats">
            Games: {stats.gamesPlayed} · Wins: {stats.wins} · Streak: {stats.currentStreak}
          </p>
        )}

        <div className="modal-actions">
          <button className="btn btn-primary" onClick={onRestart}>
            Play Again
          </button>
          <button className="btn btn-secondary" onClick={onChangeCategory}>
            Change Category
          </button>
        </div>
      </div>
    </div>
  );
}