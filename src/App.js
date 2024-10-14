import React, { useState } from 'react';
import './App.css';
import Leaderboard from './Components/Leaderboard';
import GameSelectionList from './Components/GameSelectionList';

function App() {
  const [showGameSelection, setShowGameSelection] = useState(false);

  const toggleGameSelection = () => {
    setShowGameSelection(!showGameSelection);
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
          <Leaderboard />
        </div>
        {showGameSelection && (
          <div className="game-selection-overlay">
            <div className="game-selection-window">
              <button className="close-button" onClick={toggleGameSelection}>×</button>
              <GameSelectionList />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
