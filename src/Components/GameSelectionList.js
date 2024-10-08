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
  const [mondayScorePrediction, setMondayScorePrediction] = useState({ bills: '', jets: '' });
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const getFormattedDate = (dateString) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  const week6Games = [
    { id: 1, awayTeam: 'San Francisco 49ers', homeTeam: 'Seattle Seahawks', date: '2024-10-10', time: '8:15pm ET' },
    { id: 2, awayTeam: 'Jacksonville Jaguars', homeTeam: 'Chicago Bears', date: '2024-10-13', time: '9:30am ET' },
    { id: 3, awayTeam: 'Washington Commanders', homeTeam: 'Baltimore Ravens', date: '2024-10-13', time: '1:00pm ET' },
    { id: 4, awayTeam: 'Cleveland Browns', homeTeam: 'Philadelphia Eagles', date: '2024-10-13', time: '1:00pm ET' },
    { id: 5, awayTeam: 'Arizona Cardinals', homeTeam: 'Green Bay Packers', date: '2024-10-13', time: '1:00pm ET' },
    { id: 6, awayTeam: 'Indianapolis Colts', homeTeam: 'Tennessee Titans', date: '2024-10-13', time: '1:00pm ET' },
    { id: 7, awayTeam: 'Houston Texans', homeTeam: 'New England Patriots', date: '2024-10-13', time: '1:00pm ET' },
    { id: 8, awayTeam: 'Tampa Bay Buccaneers', homeTeam: 'New Orleans Saints', date: '2024-10-13', time: '1:00pm ET' },
    { id: 9, awayTeam: 'Pittsburgh Steelers', homeTeam: 'Las Vegas Raiders', date: '2024-10-13', time: '4:05pm ET' },
    { id: 10, awayTeam: 'Los Angeles Chargers', homeTeam: 'Denver Broncos', date: '2024-10-13', time: '4:05pm ET' },
    { id: 11, awayTeam: 'Atlanta Falcons', homeTeam: 'Carolina Panthers', date: '2024-10-13', time: '4:25pm ET' },
    { id: 12, awayTeam: 'Detroit Lions', homeTeam: 'Dallas Cowboys', date: '2024-10-13', time: '4:25pm ET' },
    { id: 13, awayTeam: 'Cincinnati Bengals', homeTeam: 'New York Giants', date: '2024-10-13', time: '8:20pm ET' },
    { id: 14, awayTeam: 'Buffalo Bills', homeTeam: 'New York Jets', date: '2024-10-14', time: '8:15pm ET' },
  ];

  const gamesByDate = useMemo(() => {
    const groupedGames = week6Games.reduce((acc, game) => {
      const formattedDate = getFormattedDate(game.date);
      console.log(`Original date: ${game.date}, Formatted date: ${formattedDate}`);
      if (!acc[formattedDate]) {
        acc[formattedDate] = [];
      }
      acc[formattedDate].push(game);
      return acc;
    }, {});
    console.log('Grouped games:', groupedGames);
    return groupedGames;
  }, []);

  const isPickingClosed = useMemo(() => {
    const now = new Date();
    const firstGameDate = new Date('2024-10-10T20:15:00-04:00'); // First game of Week 6
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

  useEffect(() => {
    // Expand the first date group by default
    const firstDate = Object.keys(gamesByDate)[0];
    setExpandedDates({ [firstDate]: true });
  }, [gamesByDate]);

  useEffect(() => {
    const allGamesPicked = week6Games.every(game => selectedPicks[game.id]);
    const mondayScorePredicted = mondayScorePrediction.bills !== '' && mondayScorePrediction.jets !== '';
    const nameAndEmailFilled = name.trim() !== '' && email.trim() !== '';

    setIsFormComplete(allGamesPicked && mondayScorePredicted && nameAndEmailFilled);
  }, [selectedPicks, mondayScorePrediction, name, email, week6Games]);

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
      setShowSuccessMessage(true);
      setSelectedPicks({});
      setName('');
      setEmail('');
      setMondayScorePrediction({ bills: '', jets: '' });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
        setSubmissionStatus('');
      }, 5000);
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
      <h2 className="week-title">Week 6 Game Selection</h2>
      {showSuccessMessage && (
        <div className="success-message">
          <p>{submissionStatus}</p>
        </div>
      )}
      {isPickingClosed ? (
        <div className="picking-closed-message">
          <p>Picking for Week 6 is now closed as games have started.</p>
        </div>
      ) : (
        <div className="game-selection">
          {Object.entries(gamesByDate).map(([date, games]) => (
            <div key={date} className="date-group">
              <h3 
                className={`date-header ${expandedDates[date] ? 'expanded' : ''}`}
                onClick={() => toggleDateExpansion(date)}
              >
                {date} <span className="expand-icon">{expandedDates[date] ? '▼' : '▶'}</span>
              </h3>
              <div className={`game-grid ${expandedDates[date] ? 'expanded' : ''}`}>
                {games.map((game, gameIndex) => (
                  <div key={game.id} className="game-card" style={{'--animation-order': gameIndex}}>
                    <div className="game-time">{game.time}</div>
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
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="score-prediction">
            <h4>Monday Night Score Prediction</h4>
            <div className="score-inputs">
              <input
                type="number"
                placeholder="BUF"
                value={mondayScorePrediction.bills}
                onChange={(e) => handleScorePredictionChange('bills', e.target.value)}
              />
              <span>-</span>
              <input
                type="number"
                placeholder="NYJ"
                value={mondayScorePrediction.jets}
                onChange={(e) => handleScorePredictionChange('jets', e.target.value)}
              />
            </div>
          </div>
          <PickTracker selectedPicks={selectedPicks} games={week6Games} mondayScorePrediction={mondayScorePrediction} />
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
            <button type="submit" disabled={isSubmitting || !isFormComplete}>
              {isSubmitting ? 'Submitting...' : 'Submit Picks'}
            </button>
          </form>
          {submissionStatus && <p className="submission-status">{submissionStatus}</p>}
        </div>
      )}
    </div>
  );
};

export default GameSelectionList;