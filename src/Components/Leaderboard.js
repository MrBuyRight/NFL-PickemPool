import React, { useState, useEffect } from 'react';
import entriesData from './entriesData';
import './Leaderboard.css'; // Make sure this path is correct

function Leaderboard() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const sortedEntries = entriesData.map(entry => ({
      ...entry,
      correctPicks: Object.values(entry.picks).filter(pick => pick === "Kansas City Chiefs").length
    })).sort((a, b) => b.correctPicks - a.correctPicks);

    let rank = 1;
    let prevScore = null;
    const rankedEntries = sortedEntries.map((entry, index) => {
      if (entry.correctPicks !== prevScore) {
        rank = index + 1;
      }
      prevScore = entry.correctPicks;
      return { ...entry, rank };
    });

    setEntries(rankedEntries);
  }, []);

  const gameHeaders = [
    "BAL@KC", "GB@PHI", "PIT@ATL", "ARI@BUF", "TEN@CHI", "NE@CIN", 
    "HOU@IND", "JAX@MIA", "CAR@NO", "MIN@NYG", "LV@LAC", "DEN@SEA", 
    "DAL@CLE", "WAS@TB", "LAR@DET", "NYJ@SF"
  ];

  function parsePicks(picks) {
    return gameHeaders.map((_, index) => picks[index + 1] || '-');
  }

  function getPickClassName(pick) {
    if (pick === "Kansas City Chiefs") return "correct-pick";
    if (pick === "Baltimore Ravens") return "wrong-pick";
    return "";
  }

  function formatName(name) {
    const parts = name.split(' ');
    if (parts.length === 1) return name; // Keep one-word names unchanged
    return `${parts[0]} ${parts[1].charAt(0)}.`; // Abbreviate the second name
  }

  return (
    <div className="leaderboard">
      <h1>NFL Week 1 Pick'em Pool Leaderboard</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="rank-column">Rank</th>
              <th className="name-column">User</th>
              <th className="score-column">Score</th>
              {gameHeaders.map(header => <th key={header} className="game-header">{header}</th>)}
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td className="rank-column">{entry.rank}</td>
                <td className="name-column">{formatName(entry.name)}</td>
                <td className="score-column">{entry.correctPicks}</td>
                {parsePicks(entry.picks).map((pick, pickIndex) => (
                  <td key={pickIndex} className={getPickClassName(pick)}>{pick}</td>
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
