import React from 'react';
import './App.css';
import Leaderboard from './Components/Leaderboard';
import GameSelectionList from './Components/GameSelectionList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>NFL Pick'em Pool</h1>
      </header>
      <main className="App-main">
        <div className="component-container">
          <div className="component-wrapper">
            <h2>Leaderboard</h2>
            <Leaderboard />
          </div>
          <div className="component-wrapper">
            <h2>Game Selection</h2>
            <GameSelectionList />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
