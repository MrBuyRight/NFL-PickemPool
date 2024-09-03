import React from 'react';
import './GameSelectionList.css';

const GameSelectionList = ({ games, onSelect, picks }) => {
    return (
        <div className="game-list">
            {games.map((game) => (
                <div key={game.id} className="game-card">
                    <h3 className="game-date">{game.date}</h3>
                    <div className="teams-container">
                        <button
                            className={`team-button ${picks[game.id] === game.awayTeam ? 'selected' : ''}`}
                            onClick={() => onSelect(game.id, game.awayTeam)}
                        >
                            {game.awayTeam}
                        </button>
                        <span className="vs">VS</span>
                        <button
                            className={`team-button ${picks[game.id] === game.homeTeam ? 'selected' : ''}`}
                            onClick={() => onSelect(game.id, game.homeTeam)}
                        >
                            {game.homeTeam}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GameSelectionList;
