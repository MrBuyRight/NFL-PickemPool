import React from 'react';
import './App.css';
import Leaderboard from './Components/Leaderboard';
import RawData from './Components/RawData';
import { DataProvider } from './DataContext';

function App() {
  return (
    <DataProvider>
      <div className="App">
        <h1>NFL Pick'em Pool</h1>
        <Leaderboard />
        <RawData />
      </div>
    </DataProvider>
  );
}

export default App;
