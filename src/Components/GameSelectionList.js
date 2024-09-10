import React from 'react';

function GameSelectionList({ games, onPickSelection, selectedPicks, onSubmit, name, setName, email, setEmail, submissionStatus }) {
	console.log('Rendering GameSelectionList');
	console.log('Games:', games);
	console.log('Selected Picks:', selectedPicks);

	return (
		<div className="game-selection-list">
			<h2>Week 2 Game Selections</h2>
			{games.map(game => (
				<div key={game.id} className="game-item">
					<p>{game.date}</p>
					<button 
						onClick={() => onPickSelection(game.id, game.awayTeam)}
						className={selectedPicks[game.id] === game.awayTeam ? 'selected' : ''}
					>
						{game.awayTeam}
					</button>
					<button 
						onClick={() => onPickSelection(game.id, game.homeTeam)}
						className={selectedPicks[game.id] === game.homeTeam ? 'selected' : ''}
					>
						{game.homeTeam}
					</button>
				</div>
			))}
			<form onSubmit={onSubmit}>
				<input
					type="text"
					placeholder="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<button type="submit">Submit Picks</button>
			</form>
			{submissionStatus && <p>{submissionStatus}</p>}
		</div>
	);
}

export default GameSelectionList;
