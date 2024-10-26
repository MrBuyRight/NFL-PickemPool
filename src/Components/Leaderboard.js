import React from 'react';
import './Leaderboard.css';
import Week8entries from './Week8entrydata';

const Leaderboard = () => {
  const games = [
    { id: 1, teams: ['MIN', 'LAR'] },
    { id: 2, teams: ['BAL', 'CLE'] },
    { id: 3, teams: ['PHI', 'CIN'] },
    { id: 4, teams: ['GB', 'JAX'] },
    { id: 5, teams: ['ATL', 'TB'] },
    { id: 6, teams: ['ARI', 'MIA'] },
    { id: 7, teams: ['TEN', 'DET'] },
    { id: 8, teams: ['NYJ', 'NE'] },
    { id: 9, teams: ['IND', 'HOU'] },
    { id: 10, teams: ['BUF', 'SEA'] },
    { id: 11, teams: ['NO', 'LAC'] },
    { id: 12, teams: ['KC', 'LV'] },
    { id: 13, teams: ['CHI', 'WAS'] },
    { id: 14, teams: ['CAR', 'DEN'] },
    { id: 15, teams: ['DAL', 'SF'] },
    { id: 16, teams: ['NYG', 'PIT'] },
  ];

  const abbreviateTeam = (teamName) => {
    const abbreviations = {
      'Minnesota Vikings': 'MIN',
      'Los Angeles Rams': 'LAR',
      'Baltimore Ravens': 'BAL',
      'Cleveland Browns': 'CLE',
      'Philadelphia Eagles': 'PHI',
      'Cincinnati Bengals': 'CIN',
      'Green Bay Packers': 'GB',
      'Jacksonville Jaguars': 'JAX',
      'Atlanta Falcons': 'ATL',
      'Tampa Bay Buccaneers': 'TB',
      'Arizona Cardinals': 'ARI',
      'Miami Dolphins': 'MIA',
      'Tennessee Titans': 'TEN',
      'Detroit Lions': 'DET',
      'New York Jets': 'NYJ',
      'New England Patriots': 'NE',
      'Indianapolis Colts': 'IND',
      'Houston Texans': 'HOU',
      'Buffalo Bills': 'BUF',
      'Seattle Seahawks': 'SEA',
      'New Orleans Saints': 'NO',
      'Los Angeles Chargers': 'LAC',
      'Kansas City Chiefs': 'KC',
      'Las Vegas Raiders': 'LV',
      'Chicago Bears': 'CHI',
      'Washington Commanders': 'WAS',
      'Carolina Panthers': 'CAR',
      'Denver Broncos': 'DEN',
      'Dallas Cowboys': 'DAL',
      'San Francisco 49ers': 'SF',
      'New York Giants': 'NYG',
      'Pittsburgh Steelers': 'PIT',
    };
    return abbreviations[teamName] || teamName;
  };

  return (
    <div className="leaderboard">
      <h2 className="leaderboard-title">Week 8 Leaderboard</h2>
      <div className="leaderboard-container">
        <div className="table-container">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th className="sticky-column name-column">Name</th>
                {games.map((game) => (
                  <th key={game.id} className="pick-header">
                    <div className="game-header">
                      <span className="matchup">{game.teams[0]} vs {game.teams[1]}</span>
                    </div>
                  </th>
                ))}
                <th className="prediction-header">DAL-SF</th>
              </tr>
            </thead>
            <tbody>
              {Week8entries.map((entry, index) => (
                <tr key={index} className={`entry-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
                  <td className="sticky-column name-column">{entry.name}</td>
                  {entry.picks.map((pick, pickIndex) => (
                    <td key={pickIndex} className="pick-cell">
                      {abbreviateTeam(pick)}
                    </td>
                  ))}
                  <td className="prediction-cell">
                    {entry.cowboys}-{entry.niners}
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
