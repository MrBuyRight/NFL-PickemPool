import React from 'react';
import './PickTracker.css';

function PickTracker({ picks, games }) {
  return (
    <div className="pick-tracker">
      <h2>Your Picks</h2>
      <ul>
        {games.map(game => (
          picks[game.id] && (
            <li key={game.id}>
              {picks[game.id]}
            </li>
          )
        ))}
      </ul>
    </div>
  );
}

export default PickTracker;
