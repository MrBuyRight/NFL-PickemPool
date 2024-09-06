import React, { useState, useEffect } from 'react';
import GameSelectionList from './Components/GameSelectionList';
import PickTracker from './Components/PickTracker';
import './App.css';
import supabase from './supabaseClient';

function App() {
  const [games, setGames] = useState([]);
  const [selectedPicks, setSelectedPicks] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      setGames(data);
      console.log('Games fetched:', data);
    } catch (error) {
      console.error('Error fetching games:', error);
      setError('Failed to fetch games. Please try again later.');
    }
  };

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
          <PickTracker selectedPicks={selectedPicks} games={games} />
        </div>
      </main>
    </div>
  );
}

export default App;
