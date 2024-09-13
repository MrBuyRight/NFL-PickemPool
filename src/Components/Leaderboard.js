import React from 'react';
import entriesData from '../entriesData';

const Leaderboard = () => {
  // Sort entries by total correct picks (you may need to adjust this logic)
  const sortedEntries = [...entriesData].sort((a, b) => {
    const aCorrect = Object.values(a.picks).filter(pick => pick.correct).length;
    const bCorrect = Object.values(b.picks).filter(pick => pick.correct).length;
    return bCorrect - aCorrect;
  });

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Correct Picks</th>
          </tr>
        </thead>
        <tbody>
          {sortedEntries.map((entry, index) => {
            const correctPicks = Object.values(entry.picks).filter(pick => pick.correct).length;
            return (
              <tr key={entry.id}>
                <td>{index + 1}</td>
                <td>{entry.name}</td>
                <td>{correctPicks}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
