import React from 'react';
import './Leaderboard.css';

const Leaderboard = ({ entriesData }) => {
  console.log('Leaderboard received entriesData:', entriesData);

  if (!Array.isArray(entriesData) || entriesData.length === 0) {
    return <div>No entries data available</div>;
  }

  // Sort entries by the number of picks (as a placeholder for the actual score)
  const sortedEntries = entriesData.sort((a, b) => Object.keys(b.picks).length - Object.keys(a.picks).length);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Picks</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {sortedEntries.map((entry, index) => (
            <tr key={entry.id}>
              <td>{index + 1}</td>
              <td>{entry.name}</td>
              <td>
                {Object.entries(entry.picks).map(([week, pick]) => (
                  <div key={week}>
                    Week {week}: {pick}
                  </div>
                ))}
              </td>
              <td>{Object.keys(entry.picks).length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
