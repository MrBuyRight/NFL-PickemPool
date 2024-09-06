import React, { useState, useEffect } from 'react';
import GameSelectionList from './Components/GameSelectionList';
import PickTracker from './Components/PickTracker';
import Leaderboard from './Components/Leaderboard';
import './App.css';
import supabase from './supabaseClient';

function App() {
  // ... existing state variables ...
  const [leaderboardData, setLeaderboardData] = useState([]);

  // ... existing code ...

  const fetchLeaderboardData = async () => {
    try {
      const { data, error } = await supabase
        .from('entries')
        .select('id, picks')
        .order('id', { ascending: true });

      if (error) throw error;

      setLeaderboardData(data.map(entry => ({
        id: entry.id,
        picks: JSON.parse(entry.picks)
      })));
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    }
  };

  useEffect(() => {
    testSupabaseConnection();
    fetchLeaderboardData();
  }, []);

  return (
    <div className="App">
      {/* ... existing header and main content ... */}
      <section className="leaderboard-section">
        <h2>Leaderboard</h2>
        <Leaderboard data={leaderboardData} games={games} />
      </section>
      {/* ... existing footer ... */}
    </div>
  );
}

export default App;
