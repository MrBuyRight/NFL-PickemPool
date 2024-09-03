import React from 'react';
import './PickTracker.css';

const PickTracker = ({ picks, games }) => {
  const picksCount = Object.keys(picks).length;
  const progress = (picksCount / games.length) * 100;

  return (
    <div className="pick-tracker">
      <h3>Your Picks</h3>
      <div className="picks-summary">
        <span className="picks-count">{picksCount}</span>
        <span className="picks-total">/ {games.length}</span>
      </div>
      <div className="progress-bar">
        <div className="progress" style={{width: `${progress}%`}}></div>
      </div>
      <ul className="picks-list">
        {Object.entries(picks).map(([gameId, team]) => (
          <li key={gameId} className="pick-item">{team}</li>
        ))}
      </ul>
    </div>
  );
};

export default PickTracker;
