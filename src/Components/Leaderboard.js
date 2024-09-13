import React from 'react';
import './Leaderboard.css';
import entriesData from './entriesData';

function Leaderboard() {
  console.log('Leaderboard component is rendering');
  console.log('entriesData:', entriesData);

  return (
    <div className="leaderboard" style={{backgroundColor: 'lightgray', padding: '20px'}}>
      <h2>Leaderboard</h2>
      <p>Number of entries: {entriesData ? entriesData.length : 0}</p>
    </div>
  );
}

export default Leaderboard;
