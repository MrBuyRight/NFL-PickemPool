import React from 'react';

const GameSelectionList = ({
  games,
  onPickSelection,
  selectedPicks,
  onSubmit,
  name,
  setName,
  email,
  setEmail,
  submissionStatus
}) => {
	return (
		<div className="game-selection-list">
			<h2>Select Your Picks</h2>
			{games.map((game) => (
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
					placeholder="Your Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
				<input
					type="email"
					placeholder="Your Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<button type="submit">Submit Picks</button>
			</form>
			{submissionStatus && <p className="submission-status">{submissionStatus}</p>}
		</div>
	);
};

export default GameSelectionList;
