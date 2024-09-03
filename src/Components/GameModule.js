import React from 'react';

function GameModule({ game, onSelect, selectedTeam }) {
  return (
    <div className="game-module">
      <h3>{game.name}</h3>
      <p className="game-date">{game.date}</p>
      <div className="teams">
        <button 
          onClick={() => onSelect(game.id, game.homeTeam)}
          className={selectedTeam === game.homeTeam ? 'selected' : ''}
        >
          {game.homeTeam}
        </button>
        <span>vs</span>
        <button 
          onClick={() => onSelect(game.id, game.awayTeam)}
          className={selectedTeam === game.awayTeam ? 'selected' : ''}
        >
          {game.awayTeam}
        </button>
      </div>
    </div>
  );
}

export default GameModule;
