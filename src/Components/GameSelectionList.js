import React from 'react';
import './GameSelectionList.css';

const GameSelectionList = ({ games, onPickSelection, selectedPicks }) => {
	const groupedGames = games.reduce((acc, game) => {
		const date = game.date.split(',')[0] + ',' + game.date.split(',')[1];
		if (!acc[date]) acc[date] = [];
		acc[date].push(game);
		return acc;
	}, {});

	return (
		<div className="game-list">
			<h2>Week 2 Game Selection</h2>
			{Object.entries(groupedGames).map(([date, dateGames]) => (
				<div key={date} className="date-group">
					<h3 className="date-header">{date}</h3>
					<div className="game-group">
						{dateGames.map((game) => (
							<div key={game.id} className="game-row">
								<div className="game-info">
									<span className="game-time">{game.date.split('at')[1].trim()}</span>
								</div>
								<div className="teams-container">
									<button
										className={`team-button ${selectedPicks[game.id] === game.awayTeam ? 'selected' : ''}`}
										onClick={() => onPickSelection(game.id, game.awayTeam)}
									>
										{game.awayTeam}
									</button>
									<span className="vs">@</span>
									<button
										className={`team-button ${selectedPicks[game.id] === game.homeTeam ? 'selected' : ''}`}
										onClick={() => onPickSelection(game.id, game.homeTeam)}
									>
										{game.homeTeam}
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default GameSelectionList;
