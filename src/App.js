import React, { useState, useEffect } from 'react';
import Leaderboard from './Components/Leaderboard';
import entriesData from './Components/entriesData';
import './App.css';

function App() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    setEntries(entriesData);
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        <h1>NFL Pick'em Pool</h1>
      </header>
      <main className="app-main">
        <Leaderboard entriesData={entries} />
      </main>
    </div>
  );
}

export default App;
