import React, { useState } from 'react';
import GameSelectionList from './Components/GameSelectionList';
import PickTracker from './Components/PickTracker';
import Leaderboard from './Components/Leaderboard';
import './App.css';

function App() {
  const [games] = useState([
    { id: 1, date: "Thursday, September 5th, 2024 at 8:20pm ET", awayTeam: "Baltimore Ravens", homeTeam: "Kansas City Chiefs" },
    { id: 2, date: "Friday, September 6th, 2024 at 8:15pm ET", awayTeam: "Green Bay Packers", homeTeam: "Philadelphia Eagles" },
    { id: 3, date: "Sunday, September 8th, 2024 at 1:00pm ET", awayTeam: "Pittsburgh Steelers", homeTeam: "Atlanta Falcons" },
    { id: 4, date: "Sunday, September 8th, 2024 at 1:00pm ET", awayTeam: "Arizona Cardinals", homeTeam: "Buffalo Bills" },
    { id: 5, date: "Sunday, September 8th, 2024 at 1:00pm ET", awayTeam: "Tennessee Titans", homeTeam: "Chicago Bears" },
    // ... add the rest of the games here
  ]);
  const [selectedPicks, setSelectedPicks] = useState({});

  const handlePickSelection = (gameId, teamPicked) => {
    setSelectedPicks(prevPicks => ({
      ...prevPicks,
      [gameId]: teamPicked
    }));
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>NFL Pickem Pool</h1>
      </header>
      <main className="content-wrapper">
        <div className="game-selection-section">
          <GameSelectionList 
            games={games} 
            selectedPicks={selectedPicks} 
            onPickSelection={handlePickSelection} 
          />
          <PickTracker picks={selectedPicks} games={games} />
        </div>
        <Leaderboard />
      </main>
    </div>
  );
}

export default App;
