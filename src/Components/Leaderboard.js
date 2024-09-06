import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Make sure you have this file set up

function Leaderboard() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchEntries();
  }, []);

  async function fetchEntries() {
    const { data, error } = await supabase
      .from('entries')
      .select('id, picks')
      .eq('week', 1); // Assuming we're showing Week 1 picks

    if (error) {
      console.error('Error fetching entries:', error);
    } else {
      setEntries(data);
    }
  }

  const gameHeaders = Array.from({ length: 16 }, (_, i) => `Game ${i + 1}`);

  return (
    <div className="leaderboard">
      <h2>Week 1 Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            {gameHeaders.map(header => <th key={header}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={entry.id}>
              <td>User {index + 1}</td>
              {gameHeaders.map((_, gameIndex) => (
                <td key={gameIndex}>
                  {entry.picks[gameIndex + 1] || '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
