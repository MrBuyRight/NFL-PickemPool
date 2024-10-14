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
          {showGameSelection ? 'View Leaderboard' : 'Make Picks'}
        </button>
      </header>
      <main className="App-main">
        <div className={`component-container ${showGameSelection ? 'show-game-selection' : ''}`}>
          <div className="component-wrapper leaderboard-wrapper">
            <Leaderboard />
          </div>
          <div className="component-wrapper game-selection-wrapper">
            <GameSelectionList />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
