import React, { useState } from 'react';
import GameSelectionList from './Components/GameSelectionList';
import PickTracker from './Components/PickTracker';
import './App.css';

function App() {
  const [selectedPicks, setSelectedPicks] = useState({});
  const week2Games = [
    // ... (copy the games array from GameSelectionList)
  ];

  return (
    <div className="App">
      <h1>NFL Pick'em Pool - Week 2</h1>
      <GameSelectionList 
        selectedPicks={selectedPicks} 
        setSelectedPicks={setSelectedPicks}
        games={week2Games}
      />
      <PickTracker selectedPicks={selectedPicks} games={week2Games} />
    </div>
  );
}

export default App;
