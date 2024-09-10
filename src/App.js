import React, { useState, useEffect } from 'react';
import GameSelectionList from './Components/GameSelectionList';
import { supabase } from './supabaseClient';
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
    // Add more games as needed
  ];

  useEffect(() => {
    const initializeSupabase = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.from('entries').select('count', { count: 'exact', head: true });
        if (error) throw error;
        console.log('Supabase connection successful');
        setIsLoading(false);
      } catch (err) {
        console.error("Error connecting to Supabase:", err);
        setError(`Failed to connect to Supabase: ${err.message}`);
        setIsLoading(false);
      }
    };

    initializeSupabase();
  }, []);

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

  console.log('Rendering App component');
  console.log('week2Games:', week2Games);
  console.log('error:', error);
  console.log('isLoading:', isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>NFL Pick'em Pool - Week 2</h1>
      </header>
      <main className="app-main">
        <div className="app-content">
          {error ? (
            <div className="error-message">
              {error}
              <br />
              <small>Please check the console for more details.</small>
            </div>
          ) : (
            <>
              <p>Debug: Before GameSelectionList</p>
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
              <p>Debug: After GameSelectionList</p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
