import React from 'react';
import Leaderboard from './Components/Leaderboard';
import './App.css'; // Make sure you have this if you're using App-specific styles

function App() {
  return (
    <div className="App">
      <h1>Pickem Pool</h1>
      <Leaderboard />
    </div>
  );
}

export default App;
