import React from 'react';
import GameSelectionList from './Components/GameSelectionList';
import './App.css';

function App() {
  console.log('Rendering App component');

  return (
    <div className="App">
      <h1>NFL Pick'em Pool</h1>
      <p>This is a test render of the App component.</p>
      <GameSelectionList />
    </div>
  );
}

export default App;
