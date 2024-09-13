import React, { useEffect } from 'react';
import './App.css';
import Leaderboard from './Components/Leaderboard';
import entriesData from './Components/entriesData';

function App() {
  useEffect(() => {
    console.log('App component mounted');
    console.log('entriesData in App:', entriesData);
  }, []);

  return (
    <div className="App">
      <h1>NFL Pick'em Pool</h1>
      <Leaderboard />
    </div>
  );
}

export default App;
