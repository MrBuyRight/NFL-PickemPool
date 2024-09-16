import React from 'react';
import './Leaderboard.css';

const Leaderboard = ({ entries }) => {
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

  const getPickClass = (pick, gameId) => {
    const correctPicks = {
      1: 'Buffalo Bills', 2: 'Las Vegas Raiders', 3: 'Green Bay Packers',
      4: 'New York Jets', 5: 'Seattle Seahawks', 6: 'Cleveland Browns',
      7: 'New Orleans Saints', 8: 'Los Angeles Chargers', 9: 'Washington Commanders', 
      10: 'Minnesota Vikings', 11: 'Tampa Bay Buccaneers', 12: 'Arizona Cardinals',
      13: 'Kansas City Chiefs', 14: 'Pittsburgh Steelers', 15: 'Houston Texans'
    };
    
    if (correctPicks[gameId] === pick) return 'correct-pick';
    if (correctPicks[gameId] && correctPicks[gameId] !== pick) return 'incorrect-pick';
    return '';
  };

  const calculateCorrectPicks = (picks) => {
    return Object.entries(picks).reduce((count, [gameId, pick]) => {
      return count + (getPickClass(pick, parseInt(gameId)) === 'correct-pick' ? 1 : 0);
    }, 0);
  };

  const sortedEntries = [...entries]
    .map(entry => ({
      ...entry,
      correctPicks: calculateCorrectPicks(entry.picks)
    }))
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
                <tr key={entry.email} className={`entry-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
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
                    {entry.scorePrediction.falcons || '-'}-{entry.scorePrediction.eagles || '-'}
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
