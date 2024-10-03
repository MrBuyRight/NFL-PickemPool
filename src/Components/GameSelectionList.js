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
  const [mondayScorePrediction, setMondayScorePrediction] = useState({ saints: '', chiefs: '' });
  const [isFormComplete, setIsFormComplete] = useState(false);

  const getFormattedDate = (dateString) => {
    const date = new Date(dateString + 'T00:00:00'); // Add time to ensure correct date
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  const week5Games = [
    { id: 1, awayTeam: 'Tampa Bay Buccaneers', homeTeam: 'Atlanta Falcons', date: '2024-10-03', time: '8:15pm ET' },
    { id: 2, awayTeam: 'New York Jets', homeTeam: 'Minnesota Vikings', date: '2024-10-06', time: '9:30am ET' },
    { id: 3, awayTeam: 'Baltimore Ravens', homeTeam: 'Cincinnati Bengals', date: '2024-10-06', time: '1:00pm ET' },
    { id: 4, awayTeam: 'Buffalo Bills', homeTeam: 'Houston Texans', date: '2024-10-06', time: '1:00pm ET' },
    { id: 5, awayTeam: 'Carolina Panthers', homeTeam: 'Chicago Bears', date: '2024-10-06', time: '1:00pm ET' },
    { id: 6, awayTeam: 'Miami Dolphins', homeTeam: 'New England Patriots', date: '2024-10-06', time: '1:00pm ET' },
    { id: 7, awayTeam: 'Indianapolis Colts', homeTeam: 'Jacksonville Jaguars', date: '2024-10-06', time: '1:00pm ET' },
    { id: 8, awayTeam: 'Cleveland Browns', homeTeam: 'Washington Commanders', date: '2024-10-06', time: '1:00pm ET' },
    { id: 9, awayTeam: 'Arizona Cardinals', homeTeam: 'San Francisco 49ers', date: '2024-10-06', time: '4:05pm ET' },
    { id: 10, awayTeam: 'Las Vegas Raiders', homeTeam: 'Denver Broncos', date: '2024-10-06', time: '4:05pm ET' },
    { id: 11, awayTeam: 'Green Bay Packers', homeTeam: 'Los Angeles Rams', date: '2024-10-06', time: '4:25pm ET' },
    { id: 12, awayTeam: 'New York Giants', homeTeam: 'Seattle Seahawks', date: '2024-10-06', time: '4:25pm ET' },
    { id: 13, awayTeam: 'Dallas Cowboys', homeTeam: 'Pittsburgh Steelers', date: '2024-10-06', time: '8:20pm ET' },
    { id: 14, awayTeam: 'New Orleans Saints', homeTeam: 'Kansas City Chiefs', date: '2024-10-07', time: '8:15pm ET' },
  ];

  const gamesByDate = useMemo(() => {
    const groupedGames = week5Games.reduce((acc, game) => {
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
    const firstGameDate = new Date('2024-10-03T20:15:00-04:00'); // First game of Week 5
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
    const allGamesPicked = week5Games.every(game => selectedPicks[game.id]);
    const mondayScorePredicted = mondayScorePrediction.saints !== '' && mondayScorePrediction.chiefs !== '';
    const nameAndEmailFilled = name.trim() !== '' && email.trim() !== '';

    setIsFormComplete(allGamesPicked && mondayScorePredicted && nameAndEmailFilled);
  }, [selectedPicks, mondayScorePrediction, name, email, week5Games]);

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
    if (!isFormComplete) {
      setSubmissionStatus('Please complete all picks and the Monday night score prediction before submitting.');
      return;
    }

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
      setMondayScorePrediction({ saints: '', chiefs: '' });
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
          <h2>Week 5 Game Selection</h2>
          {isPickingClosed ? (
            <div className="picking-closed-message">
              <p>Picking for Week 5 is now closed as games have started.</p>
            </div>
          ) : (
            <div className="game-selection">
              {Object.entries(gamesByDate).map(([date, games]) => (
                <div key={date} className="date-group">
                  <h3 
                    className={`date-header ${expandedDates[date] ? 'expanded' : ''}`}
                    onClick={() => toggleDateExpansion(date)}
                  >
                    {date}
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
                    placeholder="NO"
                    value={mondayScorePrediction.saints}
                    onChange={(e) => handleScorePredictionChange('saints', e.target.value)}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="KC"
                    value={mondayScorePrediction.chiefs}
                    onChange={(e) => handleScorePredictionChange('chiefs', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <PickTracker selectedPicks={selectedPicks} games={week5Games} mondayScorePrediction={mondayScorePrediction} />
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
    </div>
  );
};

export default GameSelectionList;