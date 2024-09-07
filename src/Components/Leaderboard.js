import React from 'react';
import './Leaderboard.css';

function Leaderboard({ entriesData }) {
  if (!entriesData || entriesData.length === 0) {
    return <div>Loading...</div>;
  }

  const gameCount = Object.keys(entriesData[0].picks).length;

  return (
    <div className="leaderboard">
      <h2>Week 1 Picks</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="name-column">Name</th>
              <th className="picks-column">
                <div className="picks-scroll">
                  <table>
                    <tr>
                      {[...Array(gameCount)].map((_, index) => (
                        <th key={index} className="game-header">Game {index + 1}</th>
                      ))}
                    </tr>
                  </table>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {entriesData.map((entry, index) => (
              <tr key={index}>
                <td className="name-column">{entry.name}</td>
                <td className="picks-column">
                  <div className="picks-scroll">
                    <table>
                      <tr>
                        {Object.values(entry.picks).map((pick, pickIndex) => (
                          <td key={pickIndex} className="pick-cell">
                            <div className="pick-info">
                              <span className="pick-team">{pick}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                    </table>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
