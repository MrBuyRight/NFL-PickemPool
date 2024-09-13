import React, { useEffect } from 'react';
import './Leaderboard.css';
import entriesData from './entriesData';  // Make sure this path is correct

function Leaderboard() {
  useEffect(() => {
    console.log('Leaderboard component mounted');
    console.log('entriesData:', entriesData);
    console.log('First entry:', entriesData[0]);
    console.log('Number of entries:', entriesData.length);
  }, []);

  if (!Array.isArray(entriesData) || entriesData.length === 0) {
    console.error('entriesData is not a valid array:', entriesData);
    return <div>Error: Invalid or empty data</div>;
  }

  return (
    <div className="leaderboard" style={{backgroundColor: 'lightgray', padding: '20px'}}>
      <h2>Leaderboard</h2>
      <p>Number of entries: {entriesData.length}</p>
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
          {entriesData.map((entry, index) => (
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
