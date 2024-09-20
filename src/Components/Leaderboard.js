import React, { useEffect, useState } from 'react';
import './Leaderboard.css';
import Week3entriesData from './Week3entriesData';

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    console.log('Week3entriesData:', Week3entriesData);
    if (Week3entriesData && typeof Week3entriesData === 'object') {
      const processedEntries = Object.entries(Week3entriesData).map(([name, data]) => ({
        name,
        ...data,
        correctPicks: calculateCorrectPicks(data.picks)
      }));
      setEntries(processedEntries);
    }
  }, []);

  const calculateCorrectPicks = (picks) => {
    // Placeholder function - replace with actual logic when available
    return Math.floor(Math.random() * 17);
  };

  const abbreviateTeam = (team) => {
    // Add your team abbreviation logic here
    return team ? team.split(' ').map(word => word[0]).join('') : '';
  };

  const sortedEntries = [...entries].sort((a, b) => b.correctPicks - a.correctPicks);

  return (
    <div className="leaderboard">
      <h2>Week 3 Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Correct Picks</th>
            <th>Picks</th>
            <th>Score Prediction</th>
          </tr>
        </thead>
        <tbody>
          {sortedEntries.map((entry, index) => (
            <tr key={entry.name}>
              <td>{index + 1}</td>
              <td>{entry.name}</td>
              <td>{entry.correctPicks}</td>
              <td>
                {Object.entries(entry.picks).map(([gameId, pick]) => (
                  <span key={gameId}>{abbreviateTeam(pick)} </span>
                ))}
              </td>
              <td>{entry.scorePrediction.jaguars}-{entry.scorePrediction.bills}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
