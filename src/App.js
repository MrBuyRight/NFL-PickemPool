import React from 'react';
import './App.css';
import Leaderboard from './Components/Leaderboard';
import entriesData from './Components/entriesData';

function App() {
  return (
    <div className="App">
      <h1>NFL Pick'em Pool</h1>
      <Leaderboard entries={entriesData} />
    </div>
  );
}

export default App;
