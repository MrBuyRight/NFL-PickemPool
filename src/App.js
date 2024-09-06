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
    { id: 6, date: "Sunday, September 8th, 2024 at 1:00pm ET", awayTeam: "New England Patriots", homeTeam: "Cincinnati Bengals" },
    { id: 7, date: "Sunday, September 8th, 2024 at 1:00pm ET", awayTeam: "Houston Texans", homeTeam: "Indianapolis Colts" },
    { id: 8, date: "Sunday, September 8th, 2024 at 1:00pm ET", awayTeam: "Jacksonville Jaguars", homeTeam: "Miami Dolphins" },
    { id: 9, date: "Sunday, September 8th, 2024 at 1:00pm ET", awayTeam: "Carolina Panthers", homeTeam: "New Orleans Saints" },
    { id: 10, date: "Sunday, September 8th, 2024 at 1:00pm ET", awayTeam: "Minnesota Vikings", homeTeam: "New York Giants" },
    { id: 11, date: "Sunday, September 8th, 2024 at 4:05pm ET", awayTeam: "Las Vegas Raiders", homeTeam: "Los Angeles Chargers" },
    { id: 12, date: "Sunday, September 8th, 2024 at 4:05pm ET", awayTeam: "Denver Broncos", homeTeam: "Seattle Seahawks" },
    { id: 13, date: "Sunday, September 8th, 2024 at 4:25pm ET", awayTeam: "Dallas Cowboys", homeTeam: "Cleveland Browns" },
    { id: 14, date: "Sunday, September 8th, 2024 at 4:25pm ET", awayTeam: "Washington Commanders", homeTeam: "Tampa Bay Buccaneers" },
    { id: 15, date: "Sunday, September 8th, 2024 at 8:20pm ET", awayTeam: "Los Angeles Rams", homeTeam: "Detroit Lions" },
    { id: 16, date: "Monday, September 9th, 2024 at 8:15pm ET", awayTeam: "New York Jets", homeTeam: "San Francisco 49ers" },
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
