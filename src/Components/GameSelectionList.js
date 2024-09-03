import React, { useState } from 'react';
import './GameSelectionList.css';

const GameSelectionList = ({ games, onSelect, picks }) => {
	const [expandedDate, setExpandedDate] = useState(null);

	const groupedGames = games.reduce((acc, game) => {
		const date = game.date.split(',')[0] + ',' + game.date.split(',')[1];
		if (!acc[date]) acc[date] = [];
		acc[date].push(game);
		return acc;
	}, {});

	const toggleDate = (date) => {
		setExpandedDate(expandedDate === date ? null : date);
	};

	return (
		<div className="game-list">
			{Object.entries(groupedGames).map(([date, dateGames]) => (
				<div key={date} className="date-group">
					<button className="date-header" onClick={() => toggleDate(date)}>
						{date}
						<span className={`arrow ${expandedDate === date ? 'up' : 'down'}`}></span>
					</button>
					{expandedDate === date && (
						<div className="game-group">
							{dateGames.map((game) => (
								<div key={game.id} className="game-row">
									<div className="game-info">
										<span className="game-time">{game.date.split('at')[1].trim()}</span>
									</div>
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
					)}
				</div>
			))}
		</div>
	);
};

export default GameSelectionList;
