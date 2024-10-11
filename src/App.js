import React, { Suspense, useState } from 'react';
import './App.css';
import GameSelectionList from './Components/GameSelectionList';
const Leaderboard = React.lazy(() => import('./Components/Leaderboard'));

function App() {
  const [showLeaderboard, setShowLeaderboard] = useState(true);  // Changed to true

  const toggleView = () => {
    setShowLeaderboard(!showLeaderboard);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>NFL Pick'em Pool</h1>
        <button onClick={toggleView} className="toggle-button">
          {showLeaderboard ? 'Make Picks' : 'View Leaderboard'}
        </button>
      </header>
      <main className="App-main">
        {showLeaderboard ? (
          <Suspense fallback={<div className="loading">Loading Leaderboard...</div>}>
            <Leaderboard />
          </Suspense>
        ) : (
          <GameSelectionList />
        )}
      </main>
    </div>
  );
}

export default App;
