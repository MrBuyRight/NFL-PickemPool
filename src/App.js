import React from 'react';
import { Helmet } from 'react-helmet';
import Leaderboard from './Components/Leaderboard';
import './App.css'; // Make sure you have this if you're using App-specific styles

function App() {
  return (
    <div className="App">
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Helmet>
      <h1>NFL Pick'em Pool</h1>
      <Leaderboard />
    </div>
  );
}

export default App;
