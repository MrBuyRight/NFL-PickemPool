import React from 'react';
import './App.css';
import Leaderboard from './Components/Leaderboard';

function App() {
  console.log('App component is rendering');
  return (
    <div className="App">
      <h1>NFL Pick'em Pool</h1>
      <Leaderboard />
    </div>
  );
}

export default App;
