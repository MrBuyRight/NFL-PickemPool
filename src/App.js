import React, { useState, useEffect } from 'react';
import GameSelectionList from './Components/GameSelectionList';
import { supabase } from './supabaseClient';
import './App.css';

function App() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  console.log('Rendering App component');
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
              <GameSelectionList />
              <p>Debug: After GameSelectionList</p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
