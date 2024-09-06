import React from 'react';

function Leaderboard({ data, games }) {
  return (
    <div className="leaderboard">
      <table>
        <thead>
          <tr>
            <th>Entry #</th>
            {games.map(game => (
              <th key={game.id}>{game.homeTeam} vs {game.awayTeam}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={entry.id}>
              <td>{index + 1}</td>
              {games.map(game => (
                <td key={game.id}>{entry.picks[game.id] || '-'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
