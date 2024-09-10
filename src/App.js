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
  const [activeComponent, setActiveComponent] = useState('gameSelection');

  // Week 2 games data
  const week2Games = [
    { id: 1, date: 'Thursday, September 12th, 2024 at 8:15pm ET', awayTeam: 'Buffalo Bills', homeTeam: 'Miami Dolphins' },
    { id: 2, date: 'Sunday, September 15th, 2024 at 1:00pm ET', awayTeam: 'Las Vegas Raiders', homeTeam: 'Baltimore Ravens' },
    { id: 3, date: 'Sunday, September 15th, 2024 at 1:00pm ET', awayTeam: 'Indianapolis Colts', homeTeam: 'Green Bay Packers' },
    { id: 4, date: 'Sunday, September 15th, 2024 at 1:00pm ET', awayTeam: 'New York Jets', homeTeam: 'Tennessee Titans' },
    { id: 5, date: 'Sunday, September 15th, 2024 at 1:00pm ET', awayTeam: 'Seattle Seahawks', homeTeam: 'New England Patriots' },
    { id: 6, date: 'Sunday, September 15th, 2024 at 1:00pm ET', awayTeam: 'Cleveland Browns', homeTeam: 'Jacksonville Jaguars' },
    { id: 7, date: 'Sunday, September 15th, 2024 at 1:00pm ET', awayTeam: 'New Orleans Saints', homeTeam: 'Dallas Cowboys' },
    { id: 8, date: 'Sunday, September 15th, 2024 at 1:00pm ET', awayTeam: 'Los Angeles Chargers', homeTeam: 'Carolina Panthers' },
    { id: 9, date: 'Sunday, September 15th, 2024 at 1:00pm ET', awayTeam: 'New York Giants', homeTeam: 'Washington Commanders' },
    { id: 10, date: 'Sunday, September 15th, 2024 at 1:00pm ET', awayTeam: 'San Francisco 49ers', homeTeam: 'Minnesota Vikings' },
    { id: 11, date: 'Sunday, September 15th, 2024 at 1:00pm ET', awayTeam: 'Tampa Bay Buccaneers', homeTeam: 'Detroit Lions' },
    { id: 12, date: 'Sunday, September 15th, 2024 at 4:05pm ET', awayTeam: 'Los Angeles Rams', homeTeam: 'Arizona Cardinals' },
    { id: 13, date: 'Sunday, September 15th, 2024 at 4:25pm ET', awayTeam: 'Cincinnati Bengals', homeTeam: 'Kansas City Chiefs' },
    { id: 14, date: 'Sunday, September 15th, 2024 at 4:25pm ET', awayTeam: 'Pittsburgh Steelers', homeTeam: 'Denver Broncos' },
    { id: 15, date: 'Sunday, September 15th, 2024 at 8:20pm ET', awayTeam: 'Chicago Bears', homeTeam: 'Houston Texans' },
    { id: 16, date: 'Monday, September 16th, 2024 at 8:15pm ET', awayTeam: 'Atlanta Falcons', homeTeam: 'Philadelphia Eagles' },
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
          <button onClick={() => setActiveComponent('gameSelection')}>Week 2 Picks</button>
          <button onClick={() => setActiveComponent('leaderboard')}>Leaderboard</button>
        </nav>
      </header>
      <main className="app-main">
        <div className="app-content">
          {error ? (
            <div className="error-message">{error}</div>
          ) : (
            activeComponent === 'gameSelection' ? (
              <GameSelectionList
                games={week2Games}
                onPickSelection={handlePickSelection}
                selectedPicks={selectedPicks}
              />
            ) : (
              <Leaderboard 
                key={Date.now()}
                entriesData={entries} 
                updatePick={updatePick}
                correctPicks={correctPicks}
                incorrectPicks={incorrectPicks}
                correctTeams={correctTeams}
                incorrectTeams={incorrectTeams}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
