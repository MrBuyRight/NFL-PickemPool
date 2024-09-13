import React from 'react';
import './Leaderboard.css';
import entriesData from './entriesData';  // Import entriesData directly

function Leaderboard() {  // Remove the { entries } prop
  console.log('Leaderboard component is rendering');
  console.log('Number of entries:', entriesData.length);

  return (
    <div className="leaderboard" style={{backgroundColor: 'lightgray', padding: '20px'}}>
      <h2>Leaderboard</h2>
      <p>The leaderboard is currently being updated. Check back soon!</p>
      <p>Number of entries: {entriesData.length}</p>  // Display the number of entries
    </div>
  );
}

export default Leaderboard;
