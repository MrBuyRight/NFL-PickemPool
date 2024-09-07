import React from 'react';

function Leaderboard({ entriesData }) {
  if (!entriesData || entriesData.length === 0) {
    return <div>Loading...</div>;
  }

  // Assuming Week 1 picks are at index 0
  const week1Picks = entriesData[0].picks[0];
  const gameCount = week1Picks ? week1Picks.length : 0;

  return (
    <div className="leaderboard">
      <h2>Week 1 Picks</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            {[...Array(gameCount)].map((_, index) => (
              <th key={index}>Game {index + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {entriesData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.name}</td>
              {entry.picks[0].map((pick, pickIndex) => (
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
