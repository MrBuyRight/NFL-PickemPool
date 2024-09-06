import React, { useState, useEffect } from 'react';
import entriesData from './entriesData';
import './Leaderboard.css';

function Leaderboard() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    // Use local data instead of fetching from Supabase
    const shuffledEntries = entriesData.entries
      .map(entry => ({ ...entry, id: `User ${entry.id}` }))
      .sort(() => 0.5 - Math.random());
    setEntries(shuffledEntries);
  }, []);

  const gameHeaders = [
    "BAL@KC", "GB@PHI", "PIT@ATL", "ARI@BUF", "TEN@CHI", "NE@CIN", 
    "HOU@IND", "JAX@MIA", "CAR@NO", "MIN@NYG", "LV@LAC", "DEN@SEA", 
    "DAL@CLE", "WAS@TB", "LAR@DET", "NYJ@SF"
  ];

  function parsePicks(picks) {
    return gameHeaders.map((_, index) => picks[index + 1] || '-');
  }

  return (
    <div className="leaderboard">
      <h2>Week 1 Leaderboard</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              {gameHeaders.map(header => <th key={header}>{header}</th>)}
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.id}</td>
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
