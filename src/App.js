import React, { useState } from 'react';
import './App.css';
import Leaderboard from './Components/Leaderboard';
import GameSelectionList from './Components/GameSelectionList';

function App() {
  const [showLeaderboard, setShowLeaderboard] = useState(true);

  const toggleView = () => {
    setShowLeaderboard(!showLeaderboard);
    console.log("Toggled view. showLeaderboard:", !showLeaderboard);
  };

  console.log("Rendering App. showLeaderboard:", showLeaderboard);

  return (
    <div className="App">
      <header className="App-header">
        <h1>NFL Pick'em Pool</h1>
        <button className="toggle-button" onClick={toggleView}>
          {showLeaderboard ? 'Switch to Game Selection' : 'Switch to Leaderboard'}
        </button>
      </header>
      <main className="App-main">
        {showLeaderboard ? <Leaderboard /> : <GameSelectionList />}
      </main>
    </div>
  );
}

export default App;
