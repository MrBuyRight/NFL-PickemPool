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

  return (
    <div className="leaderboard">
      <h2>Week 1 Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            {/* Add table headers for each game */}
            <th>Game 1</th>
            <th>Game 2</th>
            <th>Game 3</th>
            {/* Add more game columns as needed */}
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={entry.id}>
              <td>User {index + 1}</td>
              {/* Map through picks and display them */}
              {Object.values(entry.picks).map((pick, pickIndex) => (
                <td key={pickIndex}>{pick}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
