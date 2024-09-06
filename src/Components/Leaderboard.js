import React, { useState, useEffect } from 'react';
import entriesData from './entriesData';
import './Leaderboard.css'; // Make sure this path is correct

function Leaderboard() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    setEntries(entriesData);
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
              <th className="name-column">User</th>
              {gameHeaders.map(header => <th key={header}>{header}</th>)}
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td className="name-column">{entry.name}</td>
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
