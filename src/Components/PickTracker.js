import React from 'react';
import './PickTracker.css';

const PickTracker = ({ picks, games }) => {
  const progress = (Object.keys(picks).length / games.length) * 100;

  return (
    <div className="pick-tracker">
      <h3>Your Picks</h3>
      <ul>
        {games.map((game) => (
          <li key={game.id} className="pick-item">
            <span className="game-teams">
              {game.awayTeam} @ {game.homeTeam}
            </span>
            <span className={`pick-result ${picks[game.id] ? 'picked' : ''}`}>
              {picks[game.id] || 'Not picked'}
            </span>
          </li>
        ))}
      </ul>
      <div className="progress-bar">
        <div className="progress" style={{width: `${progress}%`}}></div>
      </div>
    </div>
  );
};

export default PickTracker;
