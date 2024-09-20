import React, { useState } from 'react';
import './App.css';
import Leaderboard from './Components/Leaderboard';
import GameSelectionList from './Components/GameSelectionList';

function App() {
  const [activeView, setActiveView] = useState('leaderboard');

  return (
    <div className="App">
      <header className="App-header">
        <h1>NFL Pick'em Pool</h1>
        <nav>
          <button
            className={activeView === 'leaderboard' ? 'active' : ''}
            onClick={() => setActiveView('leaderboard')}
          >
            Leaderboard
          </button>
          <button
            className={activeView === 'gameSelection' ? 'active' : ''}
            onClick={() => setActiveView('gameSelection')}
          >
            Make Picks
          </button>
        </nav>
      </header>
      <main className="App-main">
        {activeView === 'gameSelection' ? (
          <GameSelectionList />
        ) : (
          <Leaderboard />
        )}
      </main>
    </div>
  );
}

export default App;
