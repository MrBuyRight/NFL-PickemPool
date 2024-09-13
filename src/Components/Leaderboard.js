import React from 'react';
import './Leaderboard.css';

function Leaderboard({ entries }) {
  console.log('Leaderboard component is rendering');
  console.log('Number of entries:', entries.length);

  if (!Array.isArray(entries) || entries.length === 0) {
    console.error('entries is not a valid array:', entries);
    return <div>Error: Invalid or empty data</div>;
  }

  return (
    <div className="leaderboard" style={{backgroundColor: 'lightgray', padding: '20px'}}>
      <h2>Leaderboard</h2>
      <p>Number of entries: {entries.length}</p>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Pick 1</th>
            <th>Pick 2</th>
            <th>Pick 3</th>
            <th>Score Prediction</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.name}</td>
              <td>{entry.picks && entry.picks["1"]}</td>
              <td>{entry.picks && entry.picks["2"]}</td>
              <td>{entry.picks && entry.picks["3"]}</td>
              <td>
                {entry.scorePrediction && `${entry.scorePrediction.falcons} - ${entry.scorePrediction.eagles}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
