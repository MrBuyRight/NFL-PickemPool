import React from 'react';
import './Leaderboard.css';

const Leaderboard = ({ entriesData }) => {
  console.log('Leaderboard received entriesData:', entriesData);

  if (!Array.isArray(entriesData) || entriesData.length === 0) {
    return <div>No entries data available</div>;
  }

  // Get all games from Week 1
  const week1Games = entriesData[0].picks["1"] ? Object.values(entriesData[0].picks["1"]) : [];

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
              {week1Games.map((game, index) => (
                <th key={index} className="game-header">{game.matchup}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedEntries.map((entry, index) => (
              <tr key={entry.id}>
                <td className="rank-column">{index + 1}</td>
                <td className="name-column">{entry.name}</td>
                <td className="score-column">{entry.score}</td>
                {week1Games.map((game, gameIndex) => {
                  const pick = entry.picks["1"][gameIndex + 1];
                  return (
                    <td key={gameIndex} className="pick-cell">
                      {pick ? (
                        <div className={`pick-info ${pick.result}`}>
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
