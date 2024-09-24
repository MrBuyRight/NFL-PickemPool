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
  const [mondayScorePrediction, setMondayScorePrediction] = useState({ titans: '', dolphins: '' });

  const getFormattedDate = (dateString) => {
    switch (dateString) {
      case '2024-09-26':
        return 'Thursday, Sept. 26th, 2024';
      case '2024-09-29':
        return 'Sunday, Sept. 29th, 2024';
      case '2024-09-30':
        return 'Monday, Sept. 30th, 2024';
      default:
        return dateString;
    }
  };

  const week4Games = [
    { id: 1, awayTeam: 'Dallas Cowboys', homeTeam: 'New York Giants', date: '2024-09-26', time: '8:15pm ET' },
    { id: 2, awayTeam: 'Philadelphia Eagles', homeTeam: 'Tampa Bay Buccaneers', date: '2024-09-29', time: '1:00pm ET' },
    { id: 3, awayTeam: 'Minnesota Vikings', homeTeam: 'Green Bay Packers', date: '2024-09-29', time: '1:00pm ET' },
    { id: 4, awayTeam: 'New Orleans Saints', homeTeam: 'Atlanta Falcons', date: '2024-09-29', time: '1:00pm ET' },
    { id: 5, awayTeam: 'Pittsburgh Steelers', homeTeam: 'Indianapolis Colts', date: '2024-09-29', time: '1:00pm ET' },
    { id: 6, awayTeam: 'Los Angeles Rams', homeTeam: 'Chicago Bears', date: '2024-09-29', time: '1:00pm ET' },
    { id: 7, awayTeam: 'Cincinnati Bengals', homeTeam: 'Carolina Panthers', date: '2024-09-29', time: '1:00pm ET' },
    { id: 8, awayTeam: 'Jacksonville Jaguars', homeTeam: 'Houston Texans', date: '2024-09-29', time: '1:00pm ET' },
    { id: 9, awayTeam: 'Denver Broncos', homeTeam: 'New York Jets', date: '2024-09-29', time: '1:00pm ET' },
    { id: 10, awayTeam: 'Washington Commanders', homeTeam: 'Arizona Cardinals', date: '2024-09-29', time: '4:05pm ET' },
    { id: 11, awayTeam: 'New England Patriots', homeTeam: 'San Francisco 49ers', date: '2024-09-29', time: '4:05pm ET' },
    { id: 12, awayTeam: 'Kansas City Chiefs', homeTeam: 'Los Angeles Chargers', date: '2024-09-29', time: '4:25pm ET' },
    { id: 13, awayTeam: 'Cleveland Browns', homeTeam: 'Las Vegas Raiders', date: '2024-09-29', time: '4:25pm ET' },
    { id: 14, awayTeam: 'Buffalo Bills', homeTeam: 'Baltimore Ravens', date: '2024-09-29', time: '8:20pm ET' },
    { id: 15, awayTeam: 'Tennessee Titans', homeTeam: 'Miami Dolphins', date: '2024-09-30', time: '7:30pm ET' },
    { id: 16, awayTeam: 'Seattle Seahawks', homeTeam: 'Detroit Lions', date: '2024-09-30', time: '8:15pm ET' },
  ];

  const gamesByDate = useMemo(() => {
    return week4Games.reduce((acc, game) => {
      const formattedDate = getFormattedDate(game.date);
      if (!acc[formattedDate]) {
        acc[formattedDate] = [];
      }
      acc[formattedDate].push(game);
      return acc;
    }, {});
  }, []);

  const isPickingClosed = useMemo(() => {
    const now = new Date();
    const firstGameDate = new Date('2024-09-26T20:15:00-04:00'); // First game start time
    return now >= firstGameDate;
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
      setMondayScorePrediction({ titans: '', dolphins: '' });
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
          <h2>Game Selection</h2>
          {isPickingClosed && (
            <div className="picking-closed-message">
              <p>Picking for Week 4 is now closed as games have started.</p>
            </div>
          )}
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
                        className={`team-button away ${selectedPicks[game.id] === game.awayTeam ? 'selected' : ''}`}
                        onClick={() => handlePickSelection(game.id, game.awayTeam)}
                      >
                        {game.awayTeam}
                      </button>
                      <span className="at-symbol">@</span>
                      <button
                        className={`team-button home ${selectedPicks[game.id] === game.homeTeam ? 'selected' : ''}`}
                        onClick={() => handlePickSelection(game.id, game.homeTeam)}
                      >
                        {game.homeTeam}
                      </button>
                    </div>
                    {game.id === 15 && (
                      <div className="score-prediction">
                        <h4>Score Prediction</h4>
                        <div className="score-inputs">
                          <input
                            type="number"
                            min="0"
                            placeholder={game.awayTeam}
                            value={mondayScorePrediction.titans}
                            onChange={(e) => handleScorePredictionChange('titans', e.target.value)}
                          />
                          <span>-</span>
                          <input
                            type="number"
                            min="0"
                            placeholder={game.homeTeam}
                            value={mondayScorePrediction.dolphins}
                            onChange={(e) => handleScorePredictionChange('dolphins', e.target.value)}
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
        <PickTracker selectedPicks={selectedPicks} games={week4Games} mondayScorePrediction={mondayScorePrediction} />
      </div>
      {!isPickingClosed && (
        <form className="entry-form" onSubmit={handleSubmit}>
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
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Picks'}
          </button>
        </form>
      )}
      {submissionStatus && <p className="submission-status">{submissionStatus}</p>}
    </div>
  );
};

export default GameSelectionList;
