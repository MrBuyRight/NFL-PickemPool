import React from 'react';
import './App.css';
import Leaderboard from './Components/Leaderboard';
import entriesData from './Week2entriesData';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pickem Pool - Week 2</h1>
      </header>
      <main>
        <Leaderboard entries={entriesData} />
      </main>
    </div>
  );
}

export default App;
