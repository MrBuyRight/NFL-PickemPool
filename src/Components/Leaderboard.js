import React from 'react';
import './Leaderboard.css';

const Leaderboard = ({ entries }) => {
  const abbreviateName = (name) => {
    const nameParts = name.split(' ');
    return nameParts.length > 1 ? `${nameParts[0]} ${nameParts[1].charAt(0)}.` : name;
  };

  const sortedEntries = [...entries].sort((a, b) => a.name.localeCompare(b.name));

  const games = [
    { id: 1, teams: ['BUF', 'MIA'] },
    { id: 2, teams: ['LV', 'BAL'] },
    { id: 3, teams: ['IND', 'GB'] },
    { id: 4, teams: ['NYJ', 'TEN'] },
    { id: 5, teams: ['SEA', 'NE'] },
    { id: 6, teams: ['CLE', 'JAX'] },
    { id: 7, teams: ['NO', 'DAL'] },
    { id: 8, teams: ['LAC', 'CAR'] },
    { id: 9, teams: ['NYG', 'WAS'] },
    { id: 10, teams: ['SF', 'MIN'] },
    { id: 11, teams: ['TB', 'DET'] },
    { id: 12, teams: ['LAR', 'ARI'] },
    { id: 13, teams: ['CIN', 'KC'] },
    { id: 14, teams: ['PIT', 'DEN'] },
    { id: 15, teams: ['CHI', 'HOU'] },
    { id: 16, teams: ['ATL', 'PHI'] },
  ];

  return (
    <div className="leaderboard">
      <h2 className="leaderboard-title">Week 2 Entries - 2024 NFL Season</h2>
      <div className="leaderboard-container">
        <div className="table-wrapper">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th className="name-column">Name</th>
                {games.map((game) => (
                  <th key={game.id} className="pick-header">
                    <div className="game-header">
                      <span className="matchup">{game.teams.join(' vs ')}</span>
                    </div>
                  </th>
                ))}
                <th className="score-prediction-header">Score Prediction</th>
              </tr>
            </thead>
            <tbody>
              {sortedEntries.map((entry, index) => (
                <tr key={entry.email} className={`entry-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
                  <td className="name-column">
                    <div className="name-container">{abbreviateName(entry.name)}</div>
                  </td>
                  {games.map((game) => (
                    <td key={game.id} className="pick-cell">
                      <div className="pick-container">
                        <span className="pick-team">{entry.picks[game.id]}</span>
                      </div>
                    </td>
                  ))}
                  <td className="score-prediction-cell">
                    {entry.scorePrediction.falcons || '-'} - {entry.scorePrediction.eagles || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
