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
      <h1>NFL Pick'em Pool</h1>
      <Leaderboard entriesData={entries} />
    </div>
  );
}

export default App;
