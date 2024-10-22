import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './GameSelectionList.css';

// Initialize Supabase client
const supabase = createClient('https://grnjclpmqlawncskxhqf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdybmpjbHBtcWxhd25jc2t4aHFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzMjI4NTUsImV4cCI6MjA0MDg5ODg1NX0.tBAWOEnq2rEOoWF976tvdcqy2spZUDzQXqlat_XtPMo');

const GameSelectionList = () => {
  const [selectedTeams, setSelectedTeams] = useState({});
  const [scorePrediction, setScorePrediction] = useState({ cowboys: '', niners: '' });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [isSubmissionClosed, setIsSubmissionClosed] = useState(false);

  const week8Games = [
    { id: 1, date: 'Thursday, October 24th, 2024', time: '8:15pm ET', away: 'Minnesota Vikings', home: 'Los Angeles Rams' },
    { id: 2, date: 'Sunday, October 27th, 2024', time: '1:00pm ET', away: 'Baltimore Ravens', home: 'Cleveland Browns' },
    { id: 3, date: 'Sunday, October 27th, 2024', time: '1:00pm ET', away: 'Philadelphia Eagles', home: 'Cincinnati Bengals' },
    { id: 4, date: 'Sunday, October 27th, 2024', time: '1:00pm ET', away: 'Green Bay Packers', home: 'Jacksonville Jaguars' },
    { id: 5, date: 'Sunday, October 27th, 2024', time: '1:00pm ET', away: 'Atlanta Falcons', home: 'Tampa Bay Buccaneers' },
    { id: 6, date: 'Sunday, October 27th, 2024', time: '1:00pm ET', away: 'Arizona Cardinals', home: 'Miami Dolphins' },
    { id: 7, date: 'Sunday, October 27th, 2024', time: '1:00pm ET', away: 'Tennessee Titans', home: 'Detroit Lions' },
    { id: 8, date: 'Sunday, October 27th, 2024', time: '1:00pm ET', away: 'New York Jets', home: 'New England Patriots' },
    { id: 9, date: 'Sunday, October 27th, 2024', time: '1:00pm ET', away: 'Indianapolis Colts', home: 'Houston Texans' },
    { id: 10, date: 'Sunday, October 27th, 2024', time: '4:05pm ET', away: 'Buffalo Bills', home: 'Seattle Seahawks' },
    { id: 11, date: 'Sunday, October 27th, 2024', time: '4:05pm ET', away: 'New Orleans Saints', home: 'Los Angeles Chargers' },
    { id: 12, date: 'Sunday, October 27th, 2024', time: '4:25pm ET', away: 'Kansas City Chiefs', home: 'Las Vegas Raiders' },
    { id: 13, date: 'Sunday, October 27th, 2024', time: '4:25pm ET', away: 'Chicago Bears', home: 'Washington Commanders' },
    { id: 14, date: 'Sunday, October 27th, 2024', time: '4:25pm ET', away: 'Carolina Panthers', home: 'Denver Broncos' },
    { id: 15, date: 'Sunday, October 27th, 2024', time: '8:20pm ET', away: 'Dallas Cowboys', home: 'San Francisco 49ers' },
    { id: 16, date: 'Monday, October 28th, 2024', time: '8:15pm ET', away: 'New York Giants', home: 'Pittsburgh Steelers' },
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
      if (Object.keys(selectedTeams).length !== 16) {
        throw new Error('Please select a team for all 16 games.');
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
      setScorePrediction({ cowboys: '', niners: '' });
      setName('');
      setEmail('');

      // Scroll to the top of the form
      window.scrollTo(0, 0);

    } catch (error) {
      console.error('Error submitting entry:', error);
      setSubmissionStatus(`Error: ${error.message || 'There was an error submitting your picks. Please try again.'}`);
    }
  };

  const groupedGames = week8Games.reduce((acc, game) => {
    if (!acc[game.date]) {
      acc[game.date] = [];
    }
    acc[game.date].push(game);
    return acc;
  }, {});

  return (
    <div className="game-list-container">
      <h2 className="week-title">Week 8 Game Selection</h2>
      {isSubmissionClosed ? (
        <div className="submission-closed-message">
          <h3>Submissions are now closed for this week.</h3>
          <p>Thank you for participating! Check back next week for new games.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
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
            <h3>Score Prediction: Cowboys @ 49ers</h3>
            <div className="score-inputs">
              <input
                type="number"
                placeholder="Cowboys"
                value={scorePrediction.cowboys}
                onChange={(e) => setScorePrediction(prev => ({ ...prev, cowboys: e.target.value }))}
                required
              />
              <span>-</span>
              <input
                type="number"
                placeholder="49ers"
                value={scorePrediction.niners}
                onChange={(e) => setScorePrediction(prev => ({ ...prev, niners: e.target.value }))}
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
            <button type="submit" disabled={Object.keys(selectedTeams).length !== 16}>
              Submit Picks
            </button>
            {submissionStatus && (
              <div className={`submission-status ${submissionStatus.startsWith('Error') ? 'error' : 'success'}`}>
                {submissionStatus}
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

const PickTracker = ({ picks }) => {
  const pickCount = Object.keys(picks).length;

  return (
    <div className="pick-tracker">
      <h3>Your Picks: {pickCount}/16</h3>
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
