import React, { useState, useEffect } from 'react';
import Leaderboard from './Components/Leaderboard';
import GameSelectionList from './Components/GameSelectionList';
import entriesData from './Components/entriesData';
import './App.css';

function App() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const [correctPicks, setCorrectPicks] = useState(0);
  const [incorrectPicks, setIncorrectPicks] = useState(0);
  const [correctTeams, setCorrectTeams] = useState(['49ers']);
  const [incorrectTeams, setIncorrectTeams] = useState(['Jets']);
  const [selectedPicks, setSelectedPicks] = useState({});
  const [activeComponent, setActiveComponent] = useState('leaderboard');

  // Mock data for Week 2 games
  const week2Games = [
    { id: 1, date: 'Thursday, September 14 at 8:15 PM ET', awayTeam: 'Minnesota Vikings', homeTeam: 'Philadelphia Eagles' },
    { id: 2, date: 'Sunday, September 17 at 1:00 PM ET', awayTeam: 'Green Bay Packers', homeTeam: 'Atlanta Falcons' },
    // Add more games here
  ];

  const updatePick = (id, isCorrect) => {
    if (isCorrect) {
      setCorrectPicks(prev => prev + 1);
    } else {
      setIncorrectPicks(prev => prev + 1);
    }
  };

  const handlePickSelection = (gameId, team) => {
    setSelectedPicks(prev => ({ ...prev, [gameId]: team }));
  };

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
        <nav>
          <button onClick={() => setActiveComponent('leaderboard')}>Leaderboard</button>
          <button onClick={() => setActiveComponent('gameSelection')}>Game Selection</button>
        </nav>
      </header>
      <main className="app-main">
        <div className="app-content">
          {error ? (
            <div className="error-message">{error}</div>
          ) : (
            activeComponent === 'leaderboard' ? (
              <Leaderboard 
                key={Date.now()}
                entriesData={entries} 
                updatePick={updatePick}
                correctPicks={correctPicks}
                incorrectPicks={incorrectPicks}
                correctTeams={correctTeams}
                incorrectTeams={incorrectTeams}
              />
            ) : (
              <GameSelectionList
                games={week2Games}
                onPickSelection={handlePickSelection}
                selectedPicks={selectedPicks}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
