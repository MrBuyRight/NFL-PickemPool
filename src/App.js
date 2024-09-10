import React, { useEffect, useState } from 'react';
import GameSelectionList from './Components/GameSelectionList';
import { supabase } from './supabaseClient';
import './App.css';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="App">
      <h1>NFL Pick'em Pool - Week 2</h1>
      {session ? (
        <GameSelectionList />
      ) : (
        <p>Please sign in to submit your picks.</p>
      )}
    </div>
  );
}

export default App;
