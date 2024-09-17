import React, { useState } from 'react';
import './App.css';
import Leaderboard from './Components/Leaderboard';
import GameSelectionList from './Components/GameSelectionList';
import entriesData from './Week2entriesData';

function App() {
  const [activeView, setActiveView] = useState('gameSelection');

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">NFL Pick 'em Pool</h1>
        <div className="view-toggle">
          <button
            className={`toggle-button ${activeView === 'gameSelection' ? 'active' : ''}`}
            onClick={() => setActiveView('gameSelection')}
          >
            Week 3 Game Selection
          </button>
          <button
            className={`toggle-button ${activeView === 'leaderboard' ? 'active' : ''}`}
            onClick={() => setActiveView('leaderboard')}
          >
            Week 2 Leaderboard
          </button>
        </div>
      </header>
      <main>
        {activeView === 'gameSelection' ? (
          <GameSelectionList />
        ) : (
          <Leaderboard entries={entriesData} />
        )}
      </main>
    </div>
  );
}

export default App;
