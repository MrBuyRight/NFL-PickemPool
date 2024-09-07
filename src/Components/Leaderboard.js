import React from 'react';
import './Leaderboard.css';

const Leaderboard = () => {
  const players = [
    { name: 'Player 1', score: 10 },
    { name: 'Player 2', score: 8 },
    { name: 'Player 3', score: 6 },
    // Add more players as needed
  ];

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
