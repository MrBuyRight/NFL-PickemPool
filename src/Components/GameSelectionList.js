import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './GameSelectionList.css';

// Initialize Supabase client
const supabase = createClient('https://grnjclpmqlawncskxhqf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdybmpjbHBtcWxhd25jc2t4aHFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzMjI4NTUsImV4cCI6MjA0MDg5ODg1NX0.tBAWOEnq2rEOoWF976tvdcqy2spZUDzQXqlat_XtPMo');

const GameSelectionList = () => {
  const [selectedTeams, setSelectedTeams] = useState({});
  const [scorePrediction, setScorePrediction] = useState({ jets: '', steelers: '' });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');

  const week7Games = [
    { id: 1, date: 'Thursday, October 17th, 2024', time: '8:15pm ET', away: 'Denver Broncos', home: 'New Orleans Saints' },
    { id: 2, date: 'Sunday, October 20th, 2024', time: '9:30am ET', away: 'New England Patriots', home: 'Jacksonville Jaguars' },
    { id: 3, date: 'Sunday, October 20th, 2024', time: '1:00pm ET', away: 'Philadelphia Eagles', home: 'New York Giants' },
    { id: 4, date: 'Sunday, October 20th, 2024', time: '1:00pm ET', away: 'Houston Texans', home: 'Green Bay Packers' },
    { id: 5, date: 'Sunday, October 20th, 2024', time: '1:00pm ET', away: 'Seattle Seahawks', home: 'Atlanta Falcons' },
    { id: 6, date: 'Sunday, October 20th, 2024', time: '1:00pm ET', away: 'Tennessee Titans', home: 'Buffalo Bills' },
    { id: 7, date: 'Sunday, October 20th, 2024', time: '1:00pm ET', away: 'Cincinnati Bengals', home: 'Cleveland Browns' },
    { id: 8, date: 'Sunday, October 20th, 2024', time: '1:00pm ET', away: 'Miami Dolphins', home: 'Indianapolis Colts' },
    { id: 9, date: 'Sunday, October 20th, 2024', time: '1:00pm ET', away: 'Detroit Lions', home: 'Minnesota Vikings' },
    { id: 10, date: 'Sunday, October 20th, 2024', time: '4:05pm ET', away: 'Carolina Panthers', home: 'Washington Commanders' },
    { id: 11, date: 'Sunday, October 20th, 2024', time: '4:05pm ET', away: 'Las Vegas Raiders', home: 'Los Angeles Rams' },
    { id: 12, date: 'Sunday, October 20th, 2024', time: '4:25pm ET', away: 'Kansas City Chiefs', home: 'San Francisco 49ers' },
    { id: 13, date: 'Sunday, October 20th, 2024', time: '8:20pm ET', away: 'New York Jets', home: 'Pittsburgh Steelers' },
    { id: 14, date: 'Monday, October 21st, 2024', time: '8:15pm ET', away: 'Baltimore Ravens', home: 'Tampa Bay Buccaneers' },
    { id: 15, date: 'Monday, October 21st, 2024', time: '9:00pm ET', away: 'Los Angeles Chargers', home: 'Arizona Cardinals' },
  ];

  const handleTeamSelect = (gameId, team) => {
    setSelectedTeams(prev => ({
      ...prev,
      [gameId]: team
    }));
  };

  const submitEntry = async (entry) => {
    try {
      const { data, error } = await supabase
        .from('entries')
        .insert([entry]);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Error in submitEntry:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('Submitting...');

    try {
      if (Object.keys(selectedTeams).length !== 15) {
        throw new Error('Please select a team for all 15 games.');
      }

      const entry = {
        name,
        email,
        picks: selectedTeams,
        score_prediction: JSON.stringify(scorePrediction),
        // Remove the week field for now
      };

      console.log('Submitting entry:', entry);
      await submitEntry(entry);
      setSubmissionStatus('Your picks have been submitted successfully!');
      
      // Reset form
      setSelectedTeams({});
      setScorePrediction({ jets: '', steelers: '' });
      setName('');
      setEmail('');

      // Scroll to the top of the form
      window.scrollTo(0, 0);

    } catch (error) {
      console.error('Error submitting entry:', error);
      setSubmissionStatus(`Error: ${error.message || 'There was an error submitting your picks. Please try again.'}`);
    }
  };

  const groupedGames = week7Games.reduce((acc, game) => {
    if (!acc[game.date]) {
      acc[game.date] = [];
    }
    acc[game.date].push(game);
    return acc;
  }, {});

  return (
    <div className="game-list-container">
      <h2 className="week-title">Week 7 Game Selection</h2>
      <form onSubmit={handleSubmit}>
        {submissionStatus && (
          <div className={`submission-status ${submissionStatus.startsWith('Error') ? 'error' : 'success'}`}>
            {submissionStatus}
          </div>
        )}
        <div className="games-section">
          {Object.entries(groupedGames).map(([date, games]) => (
            <div key={date} className="date-group">
              <h3 className="date-header">{date}</h3>
              <div className="game-grid">
                {games.map(game => (
                  <div key={game.id} className="game-card">
                    <div className="game-time">{game.time}</div>
                    <div className="teams-container">
                      <button
                        type="button"
                        className={`team-button ${selectedTeams[game.id] === game.away ? 'selected' : ''}`}
                        onClick={() => handleTeamSelect(game.id, game.away)}
                      >
                        {game.away}
                      </button>
                      <span className="at-symbol">@</span>
                      <button
                        type="button"
                        className={`team-button ${selectedTeams[game.id] === game.home ? 'selected' : ''}`}
                        onClick={() => handleTeamSelect(game.id, game.home)}
                      >
                        {game.home}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="score-prediction">
          <h3>Score Prediction: Jets @ Steelers</h3>
          <div className="score-inputs">
            <input
              type="number"
              placeholder="Jets"
              value={scorePrediction.jets}
              onChange={(e) => setScorePrediction(prev => ({ ...prev, jets: e.target.value }))}
              required
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Steelers"
              value={scorePrediction.steelers}
              onChange={(e) => setScorePrediction(prev => ({ ...prev, steelers: e.target.value }))}
              required
            />
          </div>
        </div>
        <PickTracker picks={selectedTeams} />
        <div className="entry-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={Object.keys(selectedTeams).length !== 15}>
            Submit Picks
          </button>
        </div>
      </form>
    </div>
  );
};

const PickTracker = ({ picks }) => {
  const pickCount = Object.keys(picks).length;

  return (
    <div className="pick-tracker">
      <h3>Your Picks: {pickCount}/15</h3>
      <div className="pick-list">
        {Object.entries(picks).map(([gameId, team]) => (
          <div key={gameId} className="pick-item">
            Game {gameId}: {team}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameSelectionList;
