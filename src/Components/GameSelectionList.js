import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // You'll need to create this file
import './GameSelectionList.css';

const GameSelectionList = ({ games, onPickSelection, selectedPicks }) => {
	const [expandedDate, setExpandedDate] = useState(null);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [submissionStatus, setSubmissionStatus] = useState(null);

	const groupedGames = games.reduce((acc, game) => {
		const date = game.date.split(',')[0] + ',' + game.date.split(',')[1];
		if (!acc[date]) acc[date] = [];
		acc[date].push(game);
		return acc;
	}, {});

	const toggleDate = (date) => {
		setExpandedDate(expandedDate === date ? null : date);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (Object.keys(selectedPicks).length !== games.length) {
			setSubmissionStatus('Please make selections for all games before submitting.');
			return;
		}

		try {
			const { data, error } = await supabase
				.from('entries')
				.insert([
					{ name, email, picks: selectedPicks }
				]);

			if (error) throw error;
			setSubmissionStatus('Entry submitted successfully!');
			setName('');
			setEmail('');
		} catch (error) {
			console.error('Error submitting entry:', error);
			setSubmissionStatus('Failed to submit entry. Please try again.');
		}
	};

	return (
		<div className="game-list">
			<h2>Week 2 Game Selection</h2>
			{Object.entries(groupedGames).map(([date, dateGames]) => (
				<div key={date} className="date-group">
					<h3 className="date-header" onClick={() => toggleDate(date)}>
						{date} {expandedDate === date ? '▼' : '▶'}
					</h3>
					{expandedDate === date && (
						<div className="game-grid">
							{dateGames.map((game) => (
								<div key={game.id} className="game-card">
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
					)}
				</div>
			))}
			<form onSubmit={handleSubmit} className="entry-form">
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Your Name"
					required
				/>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Your Email"
					required
				/>
				<button type="submit">Submit Picks</button>
			</form>
			{submissionStatus && <p className="submission-status">{submissionStatus}</p>}
		</div>
	);
};

export default GameSelectionList;
