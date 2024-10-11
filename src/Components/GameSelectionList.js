import React from 'react';
import './GameSelectionList.css';

const GameSelectionList = () => {
  return (
    <div className="game-list-container">
      <h2 className="week-title">Week 6 Game Selection</h2>
      <div className="picking-closed-message">
        <p>Picking for Week 6 is now closed as games have started.</p>
      </div>
    </div>
  );
};

export default GameSelectionList;