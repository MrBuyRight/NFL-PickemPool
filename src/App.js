import React, { useState, useEffect } from 'react';
import GameSelectionList from './Components/GameSelectionList';
import PickTracker from './Components/PickTracker';
import './App.css';
import supabase from './supabaseClient';

function App() {
  const [picks, setPicks] = useState({});
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');
  const [isSubmitMessageVisible, setIsSubmitMessageVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const games = [
    { id: 1, homeTeam: "Kansas City Chiefs", awayTeam: "Baltimore Ravens", date: 'Thu, Sep 5th, 2024 at 8:20pm ET' },
    { id: 2, homeTeam: "Philadelphia Eagles", awayTeam: "Green Bay Packers", date: 'Fri, Sep 6th, 2024 at 8:15pm ET' },
    { id: 3, homeTeam: "Atlanta Falcons", awayTeam: "Pittsburgh Steelers", date: 'Sun, Sep 8th, 2024 at 1:00pm ET' },
    { id: 4, homeTeam: "Buffalo Bills", awayTeam: "Arizona Cardinals", date: 'Sun, Sep 8th, 2024 at 1:00pm ET' },
    { id: 5, homeTeam: "Chicago Bears", awayTeam: "Tennessee Titans", date: 'Sun, Sep 8th, 2024 at 1:00pm ET' },
    { id: 6, homeTeam: "Cincinnati Bengals", awayTeam: "New England Patriots", date: 'Sun, Sep 8th, 2024 at 1:00pm ET' },
    { id: 7, homeTeam: "Indianapolis Colts", awayTeam: "Houston Texans", date: 'Sun, Sep 8th, 2024 at 1:00pm ET' },
    { id: 8, homeTeam: "Miami Dolphins", awayTeam: "Jacksonville Jaguars", date: 'Sun, Sep 8th, 2024 at 1:00pm ET' },
    { id: 9, homeTeam: "New Orleans Saints", awayTeam: "Carolina Panthers", date: 'Sun, Sep 8th, 2024 at 1:00pm ET' },
    { id: 10, homeTeam: "New York Giants", awayTeam: "Minnesota Vikings", date: 'Sun, Sep 8th, 2024 at 1:00pm ET' },
    { id: 11, homeTeam: "Los Angeles Chargers", awayTeam: "Las Vegas Raiders", date: 'Sun, Sep 8th, 2024 at 4:05pm ET' },
    { id: 12, homeTeam: "Seattle Seahawks", awayTeam: "Denver Broncos", date: 'Sun, Sep 8th, 2024 at 4:05pm ET' },
    { id: 13, homeTeam: "Cleveland Browns", awayTeam: "Dallas Cowboys", date: 'Sun, Sep 8th, 2024 at 4:25pm ET' },
    { id: 14, homeTeam: "Tampa Bay Buccaneers", awayTeam: "Washington Commanders", date: 'Sun, Sep 8th, 2024 at 4:25pm ET' },
    { id: 15, homeTeam: "Detroit Lions", awayTeam: "Los Angeles Rams", date: 'Sun, Sep 8th, 2024 at 8:20pm ET' },
    { id: 16, homeTeam: "San Francisco 49ers", awayTeam: "New York Jets", date: 'Mon, Sep 9th, 2024 at 8:15pm ET' },
  ];

  const handleSelect = (gameId, team) => {
    setPicks(prevPicks => ({ ...prevPicks, [gameId]: team }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Form submitted');

    const entry = { 
      name, 
      phoneNumber, 
      picks: JSON.stringify(picks), // Stringify the picks object
    };
    console.log('Entry to be submitted:', entry);

    try {
      const { data, error } = await supabase.from('entries').insert([entry]);
      
      if (error) throw error;
      
      console.log('Entry submitted successfully:', data);
      
      setName('');
      setPhoneNumber('');
      setPicks({});
      setSubmitMessage('Entry submitted successfully!');
      setIsSubmitMessageVisible(true);
      setTimeout(() => setIsSubmitMessageVisible(false), 5000);
    } catch (error) {
      console.error('Error submitting entry:', error);
      setSubmitMessage(`Error submitting entry: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testSupabaseConnection = async () => {
    try {
      const { data, error } = await supabase.from('entries').select('count', { count: 'exact' });
      if (error) throw error;
      console.log('Supabase connection successful. Number of entries:', data[0].count);
    } catch (error) {
      console.error('Supabase connection test failed:', error);
    }
  };

  useEffect(() => {
    testSupabaseConnection();
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        <h1>NFL Week 1 Pick 'em Pool</h1>
      </header>
      <main className="content-wrapper">
        <section className="game-selection-section">
          <div className="game-list-container">
            <h2>Select Your Picks</h2>
            {GameSelectionList ? (
              <GameSelectionList games={games} onSelect={handleSelect} picks={picks} />
            ) : (
              <p className="error-message">Error: GameSelectionList component not found</p>
            )}
          </div>
          <div className="pick-tracker-container">
            {PickTracker ? (
              <PickTracker picks={picks} games={games} />
            ) : (
              <p className="error-message">Error: PickTracker component not found</p>
            )}
          </div>
        </section>
        <section className="entry-form-section">
          <div className="entry-form-container">
            <h3>Submit Your Entry</h3>
            <form className="entry-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="submit-button" disabled={isLoading || Object.keys(picks).length !== games.length}>
                {isLoading ? 'Submitting...' : 'Submit Entry'}
              </button>
            </form>
            {isSubmitMessageVisible && <p className="submit-message">{submitMessage}</p>}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
