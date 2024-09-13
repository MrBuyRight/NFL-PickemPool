import React from 'react';
import './App.css';
import EntriesList from './Components/EntriesList';
import Leaderboard from './Components/Leaderboard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pickem Pool</h1>
      </header>
      <main>
        <EntriesList />
        <Leaderboard />
      </main>
    </div>
  );
}

export default App;
