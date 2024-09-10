import React from 'react';
import './PickTracker.css';

const PickTracker = ({ selectedPicks, games, mondayScorePrediction }) => {
  const sortedPicks = Object.entries(selectedPicks).sort((a, b) => a[0] - b[0]);

  return (
    <div className="pick-tracker">
      <h3>Your Picks 📋</h3>
      <ul>
        {sortedPicks.map(([gameId, team]) => (
          <li key={gameId}>
            <span className="selected-team">🏈 {team}</span>
          </li>
        ))}
      </ul>
      {mondayScorePrediction.falcons && mondayScorePrediction.eagles && (
        <div className="monday-prediction">
          <h4>Monday Score Prediction 🔮</h4>
          <p>Falcons {mondayScorePrediction.falcons} - {mondayScorePrediction.eagles} Eagles</p>
        </div>
      )}
      <div className="progress-bar">
        <div 
          className="progress" 
          style={{ width: `${(sortedPicks.length / games.length) * 100}%` }}
        ></div>
      </div>
      <p>🏁 {sortedPicks.length} of {games.length} picks made</p>
    </div>
  );
};

export default PickTracker;
