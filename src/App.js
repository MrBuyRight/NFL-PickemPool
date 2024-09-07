import React, { useState, useEffect } from 'react';
import Leaderboard from './Components/Leaderboard';
import entriesData from './Components/entriesData';
import './App.css';

function App() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setEntries(entriesData);
    } catch (err) {
      console.error("Error loading entries data:", err);
      setError("Failed to load entries data. Please try again later.");
    }
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        <h1>NFL Pick'em Pool</h1>
      </header>
      <main className="app-main">
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <Leaderboard entriesData={entries} />
        )}
      </main>
    </div>
  );
}

export default App;
