import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Make sure you have this file set up
import './Leaderboard.css'; // Import the CSS file

function Leaderboard() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchEntries();
  }, []);

  async function fetchEntries() {
    const { data, error } = await supabase
      .from('entries_rows')
      .select('id, picks');

    if (error) {
      console.error('Error fetching entries:', error);
    } else {
      // Randomize the order of entries
      const shuffledEntries = data.sort(() => 0.5 - Math.random());
      setEntries(shuffledEntries);
    }
  }

  const gameHeaders = [
    "BAL@KC", "GB@PHI", "PIT@ATL", "ARI@BUF", "TEN@CHI", "NE@CIN", 
    "HOU@IND", "JAX@MIA", "CAR@NO", "MIN@NYG", "LV@LAC", "DEN@SEA", 
    "DAL@CLE", "WAS@TB", "LAR@DET", "NYJ@SF"
  ];

  function parsePicks(picksString) {
    const picksObject = JSON.parse(picksString.replace(/'/g, '"'));
    return gameHeaders.map((_, index) => picksObject[index + 1] || '-');
  }

  return (
    <div className="leaderboard">
      <h2>Week 1 Leaderboard</h2>
      <div className="table-container">
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
                {parsePicks(entry.picks).map((pick, pickIndex) => (
                  <td key={pickIndex}>{pick}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
