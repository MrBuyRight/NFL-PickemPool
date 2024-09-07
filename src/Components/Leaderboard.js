import React from 'react';
import './Leaderboard.css';

const Leaderboard = ({ entriesData }) => {
  console.log('Leaderboard received entriesData:', entriesData);

  if (!Array.isArray(entriesData) || entriesData.length === 0) {
    return <div>No entries data available</div>;
  }

  // Get all unique weeks
  const weeks = [...new Set(entriesData.flatMap(entry => Object.keys(entry.picks)))].sort((a, b) => a - b);

  // Sort entries by score
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
              {weeks.map(week => (
                <th key={week} className="week-header">Week {week}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedEntries.map((entry, index) => (
              <tr key={entry.id}>
                <td className="rank-column">{index + 1}</td>
                <td className="name-column">{entry.name}</td>
                <td className="score-column">{entry.score}</td>
                {weeks.map(week => {
                  const pick = entry.picks[week];
                  return (
                    <td key={week} className="pick-cell">
                      {pick ? (
                        <div className={`pick-info ${pick.result}`}>
                          <div className="pick-matchup">{pick.matchup}</div>
                          <div className="pick-team">{pick.pick}</div>
                        </div>
                      ) : '-'}
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
