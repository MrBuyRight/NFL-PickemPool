import React from 'react';
import './Leaderboard.css';

const Leaderboard = ({ entries }) => {
  // Sort entries alphabetically by name
  const sortedEntries = [...entries].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="leaderboard">
      <h2>Week 2 Entries</h2>
      <div className="leaderboard-container">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Score Prediction</th>
            </tr>
          </thead>
          <tbody>
            {sortedEntries.map((entry) => (
              <tr key={entry.email} className="entry-row">
                <td className="name-column">
                  <div className="name-container">{entry.name}</div>
                </td>
                <td>{entry.email}</td>
                <td className="score-prediction-cell">
                  {entry.scorePrediction.falcons || '-'} - {entry.scorePrediction.eagles || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
