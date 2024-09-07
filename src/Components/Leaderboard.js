import React from 'react';
import './Leaderboard.css';

const Leaderboard = ({ entriesData }) => {
  console.log('Leaderboard received entriesData:', entriesData);

  if (!Array.isArray(entriesData) || entriesData.length === 0) {
    return <div>No entries data available</div>;
  }

  // Get all unique weeks
  const weeks = [...new Set(entriesData.flatMap(entry => Object.keys(entry.picks)))].sort((a, b) => a - b);

  // Get all unique matchups
  const matchups = [...new Set(entriesData.flatMap(entry => 
    Object.values(entry.picks).map(pick => pick.matchup)
  ))];

  // Sort entries by score (assuming score is the number of correct picks)
  const sortedEntries = entriesData.sort((a, b) => b.score - a.score);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="rank-column">Rank</th>
              <th className="name-column">Name</th>
              <th className="score-column">Score</th>
              {matchups.map((matchup, index) => (
                <th key={index} className="game-header">{matchup}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedEntries.map((entry, index) => (
              <tr key={entry.id}>
                <td className="rank-column">{index + 1}</td>
                <td className="name-column">{entry.name}</td>
                <td className="score-column">{entry.score}</td>
                {matchups.map((matchup, matchupIndex) => {
                  const pick = Object.values(entry.picks).find(p => p.matchup === matchup);
                  return (
                    <td key={matchupIndex} className={pick ? pick.result : ''}>
                      {pick ? pick.pick : '-'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
