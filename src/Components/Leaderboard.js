import React from 'react';
import entriesData from '../entriesData';

const Leaderboard = () => {
  // Sort entries alphabetically by name
  const sortedEntries = [...entriesData].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Score Prediction</th>
          </tr>
        </thead>
        <tbody>
          {sortedEntries.map((entry) => (
            <tr key={entry.email}>
              <td>{entry.name}</td>
              <td>{entry.email}</td>
              <td>
                {entry.scorePrediction.falcons} - {entry.scorePrediction.eagles}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
