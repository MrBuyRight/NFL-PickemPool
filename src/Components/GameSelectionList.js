import React, { useState, useMemo, useEffect } from 'react';
import PickTracker from './PickTracker';
import { supabase } from '../supabaseClient';
import './GameSelectionList.css';

const GameSelectionList = () => {
	const [selectedPicks, setSelectedPicks] = useState({});
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [submissionStatus, setSubmissionStatus] = useState('');
	const [expandedDates, setExpandedDates] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [mondayScorePrediction, setMondayScorePrediction] = useState({ falcons: '', eagles: '' });

	const getFormattedDate = (dateString) => {
		switch (dateString) {
			case '2024-09-12':
				return 'Thursday, Sept. 12th, 2024';
			case '2024-09-15':
				return 'Sunday, Sept. 15th, 2024';
			case '2024-09-16':
				return 'Monday, Sept. 16th, 2024';
			default:
				return dateString;
		}
	};

	const week2Games = [
		{ id: 1, awayTeam: 'Buffalo Bills', homeTeam: 'Miami Dolphins', date: '2024-09-12', time: '8:15pm ET' },
		{ id: 2, awayTeam: 'Las Vegas Raiders', homeTeam: 'Baltimore Ravens', date: '2024-09-15', time: '1:00pm ET' },
		{ id: 3, awayTeam: 'Indianapolis Colts', homeTeam: 'Green Bay Packers', date: '2024-09-15', time: '1:00pm ET' },
		{ id: 4, awayTeam: 'New York Jets', homeTeam: 'Tennessee Titans', date: '2024-09-15', time: '1:00pm ET' },
		{ id: 5, awayTeam: 'Seattle Seahawks', homeTeam: 'New England Patriots', date: '2024-09-15', time: '1:00pm ET' },
		{ id: 6, awayTeam: 'Cleveland Browns', homeTeam: 'Jacksonville Jaguars', date: '2024-09-15', time: '1:00pm ET' },
		{ id: 7, awayTeam: 'New Orleans Saints', homeTeam: 'Dallas Cowboys', date: '2024-09-15', time: '1:00pm ET' },
		{ id: 8, awayTeam: 'Los Angeles Chargers', homeTeam: 'Carolina Panthers', date: '2024-09-15', time: '1:00pm ET' },
		{ id: 9, awayTeam: 'New York Giants', homeTeam: 'Washington Commanders', date: '2024-09-15', time: '1:00pm ET' },
		{ id: 10, awayTeam: 'San Francisco 49ers', homeTeam: 'Minnesota Vikings', date: '2024-09-15', time: '1:00pm ET' },
		{ id: 11, awayTeam: 'Tampa Bay Buccaneers', homeTeam: 'Detroit Lions', date: '2024-09-15', time: '1:00pm ET' },
		{ id: 12, awayTeam: 'Los Angeles Rams', homeTeam: 'Arizona Cardinals', date: '2024-09-15', time: '4:05pm ET' },
		{ id: 13, awayTeam: 'Cincinnati Bengals', homeTeam: 'Kansas City Chiefs', date: '2024-09-15', time: '4:25pm ET' },
		{ id: 14, awayTeam: 'Pittsburgh Steelers', homeTeam: 'Denver Broncos', date: '2024-09-15', time: '4:25pm ET' },
		{ id: 15, awayTeam: 'Chicago Bears', homeTeam: 'Houston Texans', date: '2024-09-15', time: '8:20pm ET' },
		{ id: 16, awayTeam: 'Atlanta Falcons', homeTeam: 'Philadelphia Eagles', date: '2024-09-16', time: '8:15pm ET' },
	];

	const gamesByDate = useMemo(() => {
		return week2Games.reduce((acc, game) => {
			const formattedDate = getFormattedDate(game.date);
			if (!acc[formattedDate]) {
				acc[formattedDate] = [];
			}
			acc[formattedDate].push(game);
			return acc;
		}, {});
	}, []);

	useEffect(() => {
		const dates = Object.keys(gamesByDate);
		for (let i = 0; i < dates.length; i++) {
			const currentDateGames = gamesByDate[dates[i]];
			const allSelected = currentDateGames.every(game => selectedPicks[game.id]);
			
			if (allSelected && i < dates.length - 1) {
				setExpandedDates(prev => ({ ...prev, [dates[i+1]]: true }));
			}
		}
	}, [selectedPicks, gamesByDate]);

	const handlePickSelection = (gameId, team) => {
		setSelectedPicks(prev => ({ ...prev, [gameId]: team }));
	};

	const handleScorePredictionChange = (team, score) => {
		setMondayScorePrediction(prev => ({
			...prev,
			[team]: score
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmissionStatus('');

		try {
			const { data, error } = await supabase
				.from('entries')
				.insert([
					{ 
						name, 
						email, 
						picks: selectedPicks,
						monday_score_prediction: mondayScorePrediction
					}
				]);

			if (error) throw error;

			setSubmissionStatus('Picks submitted successfully!');
			setName('');
			setEmail('');
			setSelectedPicks({});
			setMondayScorePrediction({ falcons: '', eagles: '' });
		} catch (error) {
			console.error('Error submitting picks:', error);
			setSubmissionStatus(`Error submitting picks: ${error.message}`);
		} finally {
			setIsSubmitting(false);
		}
	};

	const toggleDateExpansion = (date) => {
		setExpandedDates(prev => ({ ...prev, [date]: !prev[date] }));
	};

	return (
		<div className="game-list-container">
			<div className="game-and-picks-wrapper">
				<div className="game-list">
					<h2>Game Selection 🏈</h2>
					{Object.entries(gamesByDate).map(([date, games]) => (
						<div key={date} className="date-group">
							<h3 className={`date-header ${expandedDates[date] ? 'expanded' : ''}`} data-date={date} onClick={() => toggleDateExpansion(date)}>
								{date}
							</h3>
							<div className={`game-grid ${expandedDates[date] ? 'expanded' : ''}`}>
								{games.map((game, index) => (
									<div key={game.id} className="game-card" style={{"--animation-order": index}}>
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
											<span className="vs">🆚</span>
											<button
												className={`team-button ${selectedPicks[game.id] === game.homeTeam ? 'selected' : ''}`}
												onClick={() => handlePickSelection(game.id, game.homeTeam)}
											>
												{game.homeTeam}
											</button>
										</div>
										{game.date === '2024-09-16' && (
											<div className="score-prediction">
												<h4>Score Prediction 🔮</h4>
												<div className="score-inputs">
													<input
														type="number"
														min="0"
														placeholder="Falcons"
														value={mondayScorePrediction.falcons}
														onChange={(e) => handleScorePredictionChange('falcons', e.target.value)}
													/>
													<span>-</span>
													<input
														type="number"
														min="0"
														placeholder="Eagles"
														value={mondayScorePrediction.eagles}
														onChange={(e) => handleScorePredictionChange('eagles', e.target.value)}
													/>
												</div>
											</div>
										)}
									</div>
								))}
							</div>
						</div>
					))}
				</div>
				<PickTracker selectedPicks={selectedPicks} games={week2Games} mondayScorePrediction={mondayScorePrediction} />
			</div>
			<form className="entry-form" onSubmit={handleSubmit}>
				<div className="input-group">
					<input
						type="text"
						placeholder="Your Name 👤"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>
				<div className="input-group">
					<input
						type="email"
						placeholder="Your Email 📧"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<button type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Submitting... ⏳' : 'Submit Picks 🚀'}
				</button>
			</form>
			{submissionStatus && <p className="submission-status">✅ {submissionStatus}</p>}
		</div>
	);
};

export default GameSelectionList;
