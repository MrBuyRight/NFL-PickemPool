import React, { useState, useEffect } from 'react';
// Remove these lines
// import { collection, addDoc } from 'firebase/firestore';
// import { db } from './firebase';
import GameSelectionList from './Components/GameSelectionList';
import PickTracker from './Components/PickTracker';
import './App.css';
import supabase from './supabaseClient';

function App() {
  const [picks, setPicks] = useState({});
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');

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
    console.log('Form submitted');

    const entry = { 
      name, 
      phoneNumber, 
      picks: picks,
    };
    console.log('Entry to be submitted:', JSON.stringify(entry, null, 2));

    try {
      // First, check if an entry with this name and phone number already exists
      const { data: existingEntries, error: fetchError } = await supabase
        .from('entries')
        .select('id')
        .eq('name', name)
        .eq('phoneNumber', phoneNumber);

      if (fetchError) throw fetchError;

      let result;
      if (existingEntries && existingEntries.length > 0) {
        // If entry exists, update it
        console.log('Updating existing entry...');
        result = await supabase
          .from('entries')
          .update({ picks: picks })
          .eq('id', existingEntries[0].id)
          .select();
      } else {
        // If entry doesn't exist, insert a new one
        console.log('Inserting new entry...');
        result = await supabase
          .from('entries')
          .insert([entry])
          .select();
      }

      if (result.error) throw result.error;
      
      console.log('Entry saved successfully:', JSON.stringify(result.data, null, 2));
      
      // Reset form and state
      setName('');
      setPhoneNumber('');
      setPicks({});
      setSubmitMessage('Entry submitted successfully!');

      setTimeout(() => setSubmitMessage(''), 5000);

    } catch (error) {
      console.error('Error submitting entry:', error.message);
      console.error('Full error object:', JSON.stringify(error, null, 2));
      setSubmitMessage(`Error submitting entry: ${error.message}`);
      setTimeout(() => setSubmitMessage(''), 5000);
    }
  };

  useEffect(() => {
    async function testSupabaseConnection() {
      console.log('Testing Supabase connection...');
      const { data, error } = await supabase
        .from('entries')
        .select('count', { count: 'exact' });
      
      if (error) {
        console.error('Supabase connection test failed:', JSON.stringify(error, null, 2));
      } else {
        console.log('Supabase connection successful. Number of entries:', data[0].count);
      }
    }

    testSupabaseConnection();
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        <h1>NFL Week 1 Pick 'em Pool</h1>
      </header>
      <main className="content-wrapper">
        <section className="game-list-container">
          {GameSelectionList ? (
            <GameSelectionList games={games} onSelect={handleSelect} picks={picks} />
          ) : (
            <p>Error: GameSelectionList component not found</p>
          )}
        </section>
        <aside className="sidebar">
          <div className="pick-tracker-container">
            {PickTracker ? (
              <PickTracker picks={picks} games={games} />
            ) : (
              <p>Error: PickTracker component not found</p>
            )}
          </div>
          <div className="entry-form-container">
            <form className="entry-form" onSubmit={handleSubmit}>
              <h3>Submit Your Entry</h3>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <button type="submit">Submit Entry</button>
            </form>
            {submitMessage && <p className="submit-message">{submitMessage}</p>}
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
