import React from 'react';
import './Leaderboard.css';
import Week3entriesData from '../Week3entriesData';

const Leaderboard = () => {
  const abbreviateName = (name) => {
    const nameParts = name.split(' ');
    return nameParts.length > 1 ? `${nameParts[0]} ${nameParts[1].charAt(0)}.` : name;
  };

  const abbreviateTeam = (team) => {
    const teamAbbreviations = {
      'Buffalo Bills': 'BUF',
      'Miami Dolphins': 'MIA',
      'Las Vegas Raiders': 'LV',
      'Baltimore Ravens': 'BAL',
      'Indianapolis Colts': 'IND',
      'Green Bay Packers': 'GB',
      'New York Jets': 'NYJ',
      'Tennessee Titans': 'TEN',
      'Seattle Seahawks': 'SEA',
      'New England Patriots': 'NE',
      'Cleveland Browns': 'CLE',
      'Jacksonville Jaguars': 'JAX',
      'New Orleans Saints': 'NO',
      'Dallas Cowboys': 'DAL',
      'Los Angeles Chargers': 'LAC',
      'Carolina Panthers': 'CAR',
      'New York Giants': 'NYG',
      'Washington Commanders': 'WAS',
      'San Francisco 49ers': 'SF',
      'Minnesota Vikings': 'MIN',
      'Tampa Bay Buccaneers': 'TB',
      'Detroit Lions': 'DET',
      'Los Angeles Rams': 'LAR',
      'Arizona Cardinals': 'ARI',
      'Cincinnati Bengals': 'CIN',
      'Kansas City Chiefs': 'KC',
      'Pittsburgh Steelers': 'PIT',
      'Denver Broncos': 'DEN',
      'Chicago Bears': 'CHI',
      'Houston Texans': 'HOU',
      'Atlanta Falcons': 'ATL',
      'Philadelphia Eagles': 'PHI'
    };
    return teamAbbreviations[team] || team;
  };

  const games = [
    { id: 1, teams: ['NYJ', 'NE'] },
    { id: 2, teams: ['NO', 'PHI'] },
    { id: 3, teams: ['TEN', 'GB'] },
    { id: 4, teams: ['PIT', 'LAC'] },
    { id: 5, teams: ['CHI', 'IND'] },
    { id: 6, teams: ['HOU', 'MIN'] },
    { id: 7, teams: ['CLE', 'NYG'] },
    { id: 8, teams: ['TB', 'DEN'] },
    { id: 9, teams: ['SEA', 'MIA'] },
    { id: 10, teams: ['LV', 'CAR'] },
    { id: 11, teams: ['BAL', 'DAL'] },
    { id: 12, teams: ['ARI', 'DET'] },
    { id: 13, teams: ['SF', 'LAR'] },
    { id: 14, teams: ['KC', 'ATL'] },
    { id: 15, teams: ['BUF', 'JAX'] },
    { id: 16, teams: ['CIN', 'WAS'] },
  ];

  const getPickClass = (pick, gameId) => {
    // This function should be updated with the correct picks for Week 3
    // For now, it returns an empty string
    return '';
  };

  const calculateCorrectPicks = (picks) => {
    // This function should be updated to calculate correct picks for Week 3
    // For now, it returns 0
    return 0;
  };

  const entries = Object.entries(Week3entriesData).map(([name, data]) => ({
    name,
    ...data,
    correctPicks: calculateCorrectPicks(data.picks)
  }));

  const sortedEntries = [...entries]
    .sort((a, b) => b.correctPicks - a.correctPicks || a.name.localeCompare(b.name));

  return (
    <div className="leaderboard">
      <h2 className="leaderboard-title">Leaderboard</h2>
      <div className="leaderboard-container">
        <div className="table-wrapper">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th className="sticky-column rank-column">#</th>
                <th className="sticky-column name-score-column">Name</th>
                {games.map((game) => (
                  <th key={game.id} className="pick-header">
                    <div className="game-header">
                      <span className="matchup">{game.teams.join('/')}</span>
                    </div>
                  </th>
                ))}
                <th className="score-prediction-header">Prediction</th>
              </tr>
            </thead>
            <tbody>
              {sortedEntries.map((entry, index) => (
                <tr key={entry.name} className={`entry-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
                  <td className="sticky-column rank-column">{index + 1}</td>
                  <td className="sticky-column name-score-column">
                    <div className="name-score-container">
                      <span className="name">{abbreviateName(entry.name)}</span>
                      <span className="score">{entry.correctPicks}</span>
                    </div>
                  </td>
                  {games.map((game) => (
                    <td key={game.id} className="pick-cell">
                      <div className={`pick-container ${getPickClass(entry.picks[game.id], game.id)}`}>
                        <span className="pick-team">{abbreviateTeam(entry.picks[game.id])}</span>
                      </div>
                    </td>
                  ))}
                  <td className="score-prediction-cell">
                    {entry.scorePrediction.jaguars || '-'}-{entry.scorePrediction.bills || '-'}
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
