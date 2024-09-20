import React, { useEffect, useState } from 'react';
import './Leaderboard.css';
import Week3entriesData from './Week3entriesData';

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
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

  const games = [
    { id: '1', teams: ['NE', 'NYJ'] },
    { id: '2', teams: ['NO', 'PHI'] },
    { id: '3', teams: ['TEN', 'GB'] },
    { id: '4', teams: ['PIT', 'LAC'] },
    { id: '5', teams: ['CHI', 'IND'] },
    { id: '6', teams: ['MIN', 'HOU'] },
    { id: '7', teams: ['CLE', 'NYG'] },
    { id: '8', teams: ['TB', 'DEN'] },
    { id: '9', teams: ['SEA', 'MIA'] },
    { id: '10', teams: ['CAR', 'LV'] },
    { id: '11', teams: ['BAL', 'DAL'] },
    { id: '12', teams: ['ARI', 'DET'] },
    { id: '13', teams: ['SF', 'LAR'] },
    { id: '14', teams: ['KC', 'ATL'] },
    { id: '15', teams: ['BUF', 'JAX'] },
    { id: '16', teams: ['CIN', 'WAS'] },
  ];

  const sortedEntries = [...entries].sort((a, b) => b.correctPicks - a.correctPicks);

  return (
    <div className="leaderboard">
      <h2>Week 3 Leaderboard</h2>
      <div className="leaderboard-container">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th className="sticky-header rank-header">Rank</th>
              <th className="sticky-header name-header">Name</th>
              <th className="sticky-header score-header">Score</th>
              {games.map((game) => (
                <th key={game.id} className="game-header">
                  {game.teams[0]}<br/>{game.teams[1]}
                </th>
              ))}
              <th className="sticky-header prediction-header">Prediction</th>
            </tr>
          </thead>
          <tbody>
            {sortedEntries.map((entry, index) => (
              <tr key={entry.name}>
                <td className="rank-cell">{index + 1}</td>
                <td className="name-cell">{entry.name}</td>
                <td className="score-cell">{entry.correctPicks}</td>
                {games.map((game) => (
                  <td key={game.id} className="pick-cell">
                    {abbreviateTeam(entry.picks[game.id])}
                  </td>
                ))}
                <td className="prediction-cell">
                  {entry.scorePrediction.jaguars}-{entry.scorePrediction.bills}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
