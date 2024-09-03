import React from 'react';
import GameItem from './GameItem';

const GameSelectionList = ({ games, onSelect }) => {
    return (
        <div className="game-grid">
            {games.map(game => (
                <GameItem 
                    key={game.id}
                    homeTeam={game.homeTeam} 
                    awayTeam={game.awayTeam} 
                    date={game.date} 
                    onSelectTeam={(team) => onSelect(game.id, team)}
                />
            ))}
        </div>
    );
};

export default GameSelectionList;
