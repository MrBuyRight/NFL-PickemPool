import React, { useState } from 'react';
import './GameSelectionList.css';

const GameSelectionList = ({ games, onSelect, picks }) => {
	const [activeDate, setActiveDate] = useState(null);

	// Group games by date
	const gamesByDate = games.reduce((acc, game) => {
		const date = game.date.split(',')[0] + ',' + game.date.split(',')[1];
		if (!acc[date]) acc[date] = [];
		acc[date].push(game);
		return acc;
	}, {});

	// Set initial active date
	React.useEffect(() => {
		if (!activeDate && Object.keys(gamesByDate).length > 0) {
			setActiveDate(Object.keys(gamesByDate)[0]);
		}
	}, [gamesByDate, activeDate]);

	return (
		<div className="game-list">
			<div className="date-tabs">
				{Object.keys(gamesByDate).map(date => (
					<button
						key={date}
						className={`date-tab ${activeDate === date ? 'active' : ''}`}
						onClick={() => setActiveDate(date)}
					>
						{date}
					</button>
				))}
			</div>
			<div className="games-container">
				{activeDate && gamesByDate[activeDate].map((game) => (
					<div key={game.id} className="game-card">
						<h3 className="game-time">{game.date.split('at')[1]}</h3>
						<div className="teams-container">
							<button
								className={`team-button ${picks[game.id] === game.awayTeam ? 'selected' : ''}`}
								onClick={() => onSelect(game.id, game.awayTeam)}
							>
								{game.awayTeam}
							</button>
							<span className="vs">@</span>
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
		</div>
	);
};

export default GameSelectionList;
