import React from 'react';
import './App.css';
import Leaderboard from './Components/Leaderboard';
import entriesData from './Week2entriesData';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title"> Week 2 Pick 'em Pool</h1>
      </header>
      <main>
        <Leaderboard entries={entriesData} />
      </main>
    </div>
  );
}

export default App;
