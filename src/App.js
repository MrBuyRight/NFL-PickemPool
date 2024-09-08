import React, { useState, useEffect } from 'react';
import Leaderboard from './Components/Leaderboard';
import entriesData from './Components/entriesData'; // Ensure this file has updated entries
import './App.css';

function App() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const [correctPicks, setCorrectPicks] = useState(0); // Track correct picks
  const [incorrectPicks, setIncorrectPicks] = useState(0); // Track incorrect picks

  const updatePick = (id, isCorrect) => {
    // Logic to update correct/incorrect picks based on user input
    if (isCorrect) {
      setCorrectPicks(prev => prev + 1);
    } else {
      setIncorrectPicks(prev => prev + 1);
    }
  };

  useEffect(() => {
    try {
      setEntries(entriesData); // Check if entriesData is updated with new picks
    } catch (err) {
      console.error("Error loading entries data:", err);
      setError("Failed to load entries data. Please try again later.");
    }
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        {/* The h1 tag has been removed */}
      </header>
      <main className="app-main">
        <div className="app-content">
          {error ? (
            <div className="error-message">{error}</div>
          ) : (
            <Leaderboard 
              entriesData={entries} 
              updatePick={updatePick}
              correctPicks={correctPicks}
              incorrectPicks={incorrectPicks}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
