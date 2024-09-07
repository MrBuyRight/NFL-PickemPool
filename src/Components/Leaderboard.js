import React from 'react';

function Leaderboard({ entriesData }) {
  if (!entriesData || entriesData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Total Points</th>
            {entriesData[0]?.picks.map((_, index) => (
              <th key={index}>Week {index + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {entriesData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.name}</td>
              <td>{entry.totalPoints}</td>
              {entry.picks.map((pick, pickIndex) => (
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
