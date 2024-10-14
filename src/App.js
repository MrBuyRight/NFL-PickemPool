import React, { useState } from 'react';
import './App.css';
import Leaderboard from './Components/Leaderboard';
import GameSelectionList from './Components/GameSelectionList';

function App() {
  const [showGameSelection, setShowGameSelection] = useState(false);
  const [picks, setPicks] = useState({});

  const toggleGameSelection = () => {
    setShowGameSelection(!showGameSelection);
  };

  const updatePicks = (newPicks) => {
    setPicks(newPicks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>NFL Pick'em Pool</h1>
        <button className="toggle-button" onClick={toggleGameSelection}>
          {showGameSelection ? 'Close Picks' : 'Make Picks'}
        </button>
      </header>
      <main className="App-main">
        <div className="leaderboard-container">
          <h2>Leaderboard</h2>
          <Leaderboard />
        </div>
        {showGameSelection && (
          <div className="game-selection-overlay">
            <div className="game-selection-window">
              <button className="close-button" onClick={toggleGameSelection}>×</button>
              <h2>Game Selection</h2>
              <GameSelectionList updatePicks={updatePicks} />
            </div>
          </div>
        )}
        <PickTracker picks={picks} />
      </main>
    </div>
  );
}

const PickTracker = ({ picks }) => {
  const pickCount = Object.keys(picks).length;

  return (
    <div className="pick-tracker">
      <h3>Your Picks: {pickCount}/15</h3>
      <div className="pick-list">
        {Object.entries(picks).map(([gameId, team]) => (
          <div key={gameId} className="pick-item">
            Game {gameId}: {team}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
