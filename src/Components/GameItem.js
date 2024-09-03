import React, { useState } from 'react';
import './GameItem.css';

const GameItem = ({ homeTeam, awayTeam, date, onSelectTeam }) => {
    const [selectedTeam, setSelectedTeam] = useState(null);

    const handleTeamClick = (team) => {
        setSelectedTeam(team);
        onSelectTeam(team);
    };

    return (
        <div className="game-module">
            <h3>{date}</h3>
            <div className="teams">
                <button 
                    className={`team-button ${selectedTeam === awayTeam ? 'selected' : ''}`}
                    onClick={() => handleTeamClick(awayTeam)}
                >
                    {awayTeam}
                </button>
                <span>@</span>
                <button 
                    className={`team-button ${selectedTeam === homeTeam ? 'selected' : ''}`}
                    onClick={() => handleTeamClick(homeTeam)}
                >
                    {homeTeam}
                </button>
            </div>
        </div>
    );
};

export default GameItem;
