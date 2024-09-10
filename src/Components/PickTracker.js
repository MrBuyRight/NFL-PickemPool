import React from 'react';
import './PickTracker.css';

const PickTracker = ({ selectedPicks, games }) => {
  const sortedPicks = Object.entries(selectedPicks).sort((a, b) => a[0] - b[0]);

  return (
    <div className="pick-tracker">
      <h3>Your Picks</h3>
      <ul>
        {sortedPicks.map(([gameId, team]) => {
          const game = games.find(g => g.id === parseInt(gameId));
          return (
            <li key={gameId}>
              {game.awayTeam} @ {game.homeTeam}: <span className="selected-team">{team}</span>
            </li>
          );
        })}
      </ul>
      <p>{sortedPicks.length} of {games.length} picks made</p>
    </div>
  );
};

export default PickTracker;
