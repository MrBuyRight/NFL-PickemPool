import React, { Suspense } from 'react';
import './App.css';
import GameSelectionList from './Components/GameSelectionList';
const Leaderboard = React.lazy(() => import('./Components/Leaderboard'));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>NFL Pick'em Pool</h1>
      </header>
      <main>
        <GameSelectionList />
        <Suspense fallback={<div>Loading Leaderboard...</div>}>
          <Leaderboard />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
