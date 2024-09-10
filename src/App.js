import React, { useState, useEffect } from 'react';
import GameSelectionList from './Components/GameSelectionList';
import { initSupabase } from './supabaseClient';
import './App.css';

function App() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPicks, setSelectedPicks] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null);

  // Week 2 games data
  const week2Games = [
    { id: 1, date: 'Thursday, September 12th, 2024 at 8:15pm ET', awayTeam: 'Buffalo Bills', homeTeam: 'Miami Dolphins' },
    { id: 2, date: 'Sunday, September 15th, 2024 at 1:00pm ET', awayTeam: 'Las Vegas Raiders', homeTeam: 'Baltimore Ravens' },
    // ... rest of the games ...
  ];

  const handlePickSelection = (gameId, team) => {
    setSelectedPicks(prev => ({ ...prev, [gameId]: team }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(selectedPicks).length !== week2Games.length) {
      setSubmissionStatus('Please make selections for all games before submitting.');
      return;
    }

    try {
      const supabase = await initSupabase();
      if (!supabase) {
        throw new Error('Supabase client is not initialized');
      }

      console.log('Submitting picks:', { name, email, picks: selectedPicks });
      const { data, error } = await supabase
        .from('entries')
        .insert([
          { name, email, picks: selectedPicks }
        ]);

      if (error) throw error;
      
      console.log('Submission successful:', data);
      setSubmissionStatus('Entry submitted successfully!');
      setName('');
      setEmail('');
      setSelectedPicks({});
    } catch (error) {
      console.error('Error submitting entry:', error);
      setSubmissionStatus('Failed to submit entry. Please try again.');
    }
  };

  useEffect(() => {
    const fetchEntries = async () => {
      setIsLoading(true);
      try {
        console.log('Initializing Supabase...');
        const supabase = await initSupabase();
        if (!supabase) {
          throw new Error('Failed to initialize Supabase client');
        }
        console.log('Supabase initialized successfully');

        console.log('Fetching entries...');
        const { data, error } = await supabase
          .from('entries')
          .select('*');
        
        if (error) {
          console.error('Supabase query error:', error);
          throw error;
        }
        console.log('Entries fetched successfully:', data);
        setEntries(data || []);
      } catch (err) {
        console.error("Error in fetchEntries:", err);
        setError(`Failed to load entries data: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();

    // Log environment variables
    console.log('REACT_APP_SUPABASE_URL:', process.env.REACT_APP_SUPABASE_URL);
    console.log('REACT_APP_SUPABASE_ANON_KEY:', process.env.REACT_APP_SUPABASE_ANON_KEY ? 'Set' : 'Not set');
  }, []);

  console.log('Rendering App component');
  console.log('Active component:', activeComponent);
  console.log('Error state:', error);
  console.log('Is Loading:', isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>NFL Pick'em Pool</h1>
        <nav>
          <button onClick={() => setActiveComponent('gameSelection')}>Week 2 Picks</button>
        </nav>
      </header>
      <main className="app-main">
        <div className="app-content">
          {error ? (
            <div className="error-message">{error}</div>
          ) : (
            <GameSelectionList
              games={week2Games}
              onPickSelection={handlePickSelection}
              selectedPicks={selectedPicks}
              onSubmit={handleSubmit}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              submissionStatus={submissionStatus}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
