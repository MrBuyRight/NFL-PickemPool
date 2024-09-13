import React from 'react';
import './Leaderboard.css';

function Leaderboard({ entries }) {
  console.log('Leaderboard component is rendering');
  console.log('Number of entries:', entries.length);

  return (
    <div className="leaderboard" style={{backgroundColor: 'lightgray', padding: '20px'}}>
      <h2>Leaderboard</h2>
      <p>The leaderboard is currently being updated. Check back soon!</p>
    </div>
  );
}

export default Leaderboard;
