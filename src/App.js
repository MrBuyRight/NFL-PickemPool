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
        <div className="header-content">
          <h1>NFL Pick'em Pool</h1>
          <button className="toggle-button" onClick={toggleGameSelection}>
            {showGameSelection ? 'View Leaderboard' : 'Make Picks'}
          </button>
        </div>
      </header>
      <main className="App-main">
        {showGameSelection ? (
          <GameSelectionList />
        ) : (
          <Leaderboard />
        )}
      </main>
    </div>
  );
}

export default App;
