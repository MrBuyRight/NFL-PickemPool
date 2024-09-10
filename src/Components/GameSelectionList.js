import React from 'react';

const GameSelectionList = (props) => {
	console.log('Rendering GameSelectionList');
	console.log('Games:', props.games);
	console.log('Selected Picks:', props.selectedPicks);

	return (
		<div className="game-selection-list">
			<h2>Week 2 Game Selections</h2>
			{props.games.map(game => (
				<div key={game.id} className="game-item">
					<p>{game.date}</p>
					<button 
						onClick={() => props.onPickSelection(game.id, game.awayTeam)}
						className={props.selectedPicks[game.id] === game.awayTeam ? 'selected' : ''}
					>
						{game.awayTeam}
					</button>
					<button 
						onClick={() => props.onPickSelection(game.id, game.homeTeam)}
						className={props.selectedPicks[game.id] === game.homeTeam ? 'selected' : ''}
					>
						{game.homeTeam}
					</button>
				</div>
			))}
			<form onSubmit={props.onSubmit}>
				<input
					type="text"
					placeholder="Name"
					value={props.name}
					onChange={(e) => props.setName(e.target.value)}
					required
				/>
				<input
					type="email"
					placeholder="Email"
					value={props.email}
					onChange={(e) => props.setEmail(e.target.value)}
					required
				/>
				<button type="submit">Submit Picks</button>
			</form>
			{props.submissionStatus && <p>{props.submissionStatus}</p>}
		</div>
	);
}

export default GameSelectionList;
