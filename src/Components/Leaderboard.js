import React from 'react';
import './Leaderboard.css';

const Leaderboard = () => {
  const players = [
    { name: 'Player 1', picks: ['Philadelphia Eagles', 'Other Team'], score: 1 },
    { name: 'Player 2', picks: ['Green Bay Packers', 'Other Team'], score: 0 },
    // Add more players as needed
  ];

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Picks</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index}>
              <td>{player.name}</td>
              <td>
                {player.picks.map((pick, pickIndex) => (
                  <span key={pickIndex} className={pick === 'Philadelphia Eagles' ? 'correct-pick' : pick === 'Green Bay Packers' ? 'wrong-pick' : ''}>
                    {pick}
                    {pickIndex < player.picks.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
