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
    if (gameId === 1) {
      if (pick === 'Buffalo Bills') return 'correct-pick';
      if (pick === 'Miami Dolphins') return 'incorrect-pick';
    }
    return '';
  };

  const calculateCorrectPicks = (picks) => {
    let correctPicks = 0;
    if (picks[1] === 'Buffalo Bills') correctPicks++;
    return correctPicks;
  };

  const sortedEntries = [...entries]
    .map(entry => ({
      ...entry,
      correctPicks: calculateCorrectPicks(entry.picks)
    }))
    .sort((a, b) => b.correctPicks - a.correctPicks || a.name.localeCompare(b.name));

  return (
    <div className="leaderboard">
      <h2 className="leaderboard-title">2024 NFL Season</h2>
      <div className="leaderboard-container">
        <div className="table-wrapper">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th className="rank-column">#</th>
                <th className="name-column">Name</th>
                <th className="score-column">Score</th>
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
                  <td className="rank-column">{index + 1}</td>
                  <td className="name-column">
                    <div className="name-container">{abbreviateName(entry.name)}</div>
                  </td>
                  <td className="score-column">{entry.correctPicks}</td>
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
