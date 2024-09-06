import React, { useState, useEffect } from 'react';
import Leaderboard from './Leaderboard';
import supabase from '../supabaseClient';

function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [games, setGames] = useState([]);

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

  const fetchGames = async () => {
    try {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;

      setGames(data);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
    fetchGames();
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      <Leaderboard data={leaderboardData} games={games} />
    </div>
  );
}

export default LeaderboardPage;
