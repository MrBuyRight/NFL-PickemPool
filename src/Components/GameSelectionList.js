import React, { useState, useMemo } from 'react';
import PickTracker from './PickTracker';
import './GameSelectionList.css';

const GameSelectionList = () => {
	const [selectedPicks, setSelectedPicks] = useState({});
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [submissionStatus, setSubmissionStatus] = useState('');
	const [expandedDates, setExpandedDates] = useState({});

	const week2Games = [
		{ id: 1, awayTeam: 'Buffalo Bills', homeTeam: 'Miami Dolphins', date: 'Thursday, September 12th, 2024', time: '8:15pm ET' },
		{ id: 2, awayTeam: 'Las Vegas Raiders', homeTeam: 'Baltimore Ravens', date: 'Sunday, September 15th, 2024', time: '1:00pm ET' },
		{ id: 3, awayTeam: 'Indianapolis Colts', homeTeam: 'Green Bay Packers', date: 'Sunday, September 15th, 2024', time: '1:00pm ET' },
		{ id: 4, awayTeam: 'New York Jets', homeTeam: 'Tennessee Titans', date: 'Sunday, September 15th, 2024', time: '1:00pm ET' },
		{ id: 5, awayTeam: 'Seattle Seahawks', homeTeam: 'New England Patriots', date: 'Sunday, September 15th, 2024', time: '1:00pm ET' },
		{ id: 6, awayTeam: 'Cleveland Browns', homeTeam: 'Jacksonville Jaguars', date: 'Sunday, September 15th, 2024', time: '1:00pm ET' },
		{ id: 7, awayTeam: 'New Orleans Saints', homeTeam: 'Dallas Cowboys', date: 'Sunday, September 15th, 2024', time: '1:00pm ET' },
		{ id: 8, awayTeam: 'Los Angeles Chargers', homeTeam: 'Carolina Panthers', date: 'Sunday, September 15th, 2024', time: '1:00pm ET' },
		{ id: 9, awayTeam: 'New York Giants', homeTeam: 'Washington Commanders', date: 'Sunday, September 15th, 2024', time: '1:00pm ET' },
		{ id: 10, awayTeam: 'San Francisco 49ers', homeTeam: 'Minnesota Vikings', date: 'Sunday, September 15th, 2024', time: '1:00pm ET' },
		{ id: 11, awayTeam: 'Tampa Bay Buccaneers', homeTeam: 'Detroit Lions', date: 'Sunday, September 15th, 2024', time: '1:00pm ET' },
		{ id: 12, awayTeam: 'Los Angeles Rams', homeTeam: 'Arizona Cardinals', date: 'Sunday, September 15th, 2024', time: '4:05pm ET' },
		{ id: 13, awayTeam: 'Cincinnati Bengals', homeTeam: 'Kansas City Chiefs', date: 'Sunday, September 15th, 2024', time: '4:25pm ET' },
		{ id: 14, awayTeam: 'Pittsburgh Steelers', homeTeam: 'Denver Broncos', date: 'Sunday, September 15th, 2024', time: '4:25pm ET' },
		{ id: 15, awayTeam: 'Chicago Bears', homeTeam: 'Houston Texans', date: 'Sunday, September 15th, 2024', time: '8:20pm ET' },
		{ id: 16, awayTeam: 'Atlanta Falcons', homeTeam: 'Philadelphia Eagles', date: 'Monday, September 16th, 2024', time: '8:15pm ET' },
	];

	const gamesByDate = useMemo(() => {
		return week2Games.reduce((acc, game) => {
			if (!acc[game.date]) {
				acc[game.date] = [];
			}
			acc[game.date].push(game);
			return acc;
		}, {});
	}, []);

	const handlePickSelection = (gameId, team) => {
		setSelectedPicks(prev => ({ ...prev, [gameId]: team }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Here you would typically send the data to your backend
		console.log('Submitting picks:', { name, email, picks: selectedPicks });
		setSubmissionStatus('Picks submitted successfully!');
	};

	const toggleDateExpansion = (date) => {
		setExpandedDates(prev => ({ ...prev, [date]: !prev[date] }));
	};

	return (
		<div className="game-list-container">
			<div className="game-and-picks-wrapper">
				<div className="game-list">
					<h2>Week 2 Game Selection</h2>
					{Object.entries(gamesByDate).map(([date, games]) => (
						<div key={date} className="date-group">
							<h3 className="date-header" onClick={() => toggleDateExpansion(date)}>
								{date} {expandedDates[date] ? '▼' : '▶'}
							</h3>
							{expandedDates[date] && (
								<div className="game-grid">
									{games.map((game) => (
										<div key={game.id} className="game-card">
											<div className="game-info">
												<div className="game-time">{game.time}</div>
											</div>
											<div className="teams-container">
												<button
													className={`team-button ${selectedPicks[game.id] === game.awayTeam ? 'selected' : ''}`}
													onClick={() => handlePickSelection(game.id, game.awayTeam)}
												>
													{game.awayTeam}
												</button>
												<span className="vs">@</span>
												<button
													className={`team-button ${selectedPicks[game.id] === game.homeTeam ? 'selected' : ''}`}
													onClick={() => handlePickSelection(game.id, game.homeTeam)}
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
				<PickTracker selectedPicks={selectedPicks} games={week2Games} />
			</div>
			<form className="entry-form" onSubmit={handleSubmit}>
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
