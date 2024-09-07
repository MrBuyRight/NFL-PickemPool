import React, { useMemo } from 'react';
import './Leaderboard.css';

function Leaderboard({ entriesData }) {
  const correctTeams = ['Kansas City Chiefs', 'Philadelphia Eagles'];
  const incorrectTeams = ['Baltimore Ravens', 'Green Bay Packers'];

  // Add a mapping of team names to abbreviations
  const teamAbbreviations = {
    'Kansas City Chiefs': 'KC',
    'Philadelphia Eagles': 'PHI',
    'Baltimore Ravens': 'BAL',
    'Green Bay Packers': 'GB',
    'Detroit Lions': 'DET',
    'San Francisco 49ers': 'SF',
    'Cincinnati Bengals': 'CIN',
    'Cleveland Browns': 'CLE',
    'Jacksonville Jaguars': 'JAX',
    'Indianapolis Colts': 'IND',
    'Tampa Bay Buccaneers': 'TB',
    'Minnesota Vikings': 'MIN',
    'Tennessee Titans': 'TEN',
    'New Orleans Saints': 'NO',
    'Carolina Panthers': 'CAR',
    'Atlanta Falcons': 'ATL',
    'Houston Texans': 'HOU',
    'Pittsburgh Steelers': 'PIT',
    'Arizona Cardinals': 'ARI',
    'Washington Commanders': 'WAS',
    'Chicago Bears': 'CHI',
    'Los Angeles Rams': 'LAR',
    'Las Vegas Raiders': 'LV',
    'Denver Broncos': 'DEN',
    'New England Patriots': 'NE',
    'Miami Dolphins': 'MIA',
    'Los Angeles Chargers': 'LAC',
    'New York Jets': 'NYJ',
    'Seattle Seahawks': 'SEA',
    'Dallas Cowboys': 'DAL',
    'New York Giants': 'NYG',
    'Buffalo Bills': 'BUF',
  };

  // Add game matchups for Week 1
  const gameMatchups = [
    { home: 'Kansas City Chiefs', away: 'Baltimore Ravens' },
    { home: 'Philadelphia Eagles', away: 'Green Bay Packers' },
    { home: 'Atlanta Falcons', away: 'Pittsburgh Steelers' },
    { home: 'Buffalo Bills', away: 'Arizona Cardinals' },
    { home: 'Chicago Bears', away: 'Tennessee Titans' },
    { home: 'Cincinnati Bengals', away: 'New England Patriots' },
    { home: 'Indianapolis Colts', away: 'Houston Texans' },
    { home: 'Miami Dolphins', away: 'Jacksonville Jaguars' },
    { home: 'New Orleans Saints', away: 'Carolina Panthers' },
    { home: 'New York Giants', away: 'Minnesota Vikings' },
    { home: 'Los Angeles Chargers', away: 'Las Vegas Raiders' },
    { home: 'Seattle Seahawks', away: 'Denver Broncos' },
    { home: 'Cleveland Browns', away: 'Dallas Cowboys' },
    { home: 'Tampa Bay Buccaneers', away: 'Washington Commanders' },
    { home: 'Detroit Lions', away: 'Los Angeles Rams' },
    { home: 'San Francisco 49ers', away: 'New York Jets' },
  ];

  const getPickClass = (pick) => {
    if (correctTeams.includes(pick)) return 'correct';
    if (incorrectTeams.includes(pick)) return 'wrong';
    return '';
  };

  const formatName = (name) => {
    const nameParts = name.split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0]} ${nameParts[1].charAt(0)}.`;
    }
    return name;
  };

  const calculateScore = (picks) => {
    return Object.values(picks).reduce((score, pick) => {
      return score + (correctTeams.includes(pick) ? 1 : 0);
    }, 0);
  };

  const rankedEntries = useMemo(() => {
    if (!entriesData || entriesData.length === 0) {
      return [];
    }

    return entriesData
      .map(entry => ({
        ...entry,
        score: calculateScore(entry.picks)
      }))
      .sort((a, b) => b.score - a.score)
      .map((entry, index, array) => ({
        ...entry,
        rank: index === 0 || entry.score !== array[index - 1].score ? index + 1 : array[index - 1].rank
      }));
  }, [entriesData]);

  if (rankedEntries.length === 0) {
    return <div>Loading...</div>;
  }

  // Generate game headers based on the first entry's picks
  const gameHeaders = Object.keys(rankedEntries[0].picks).map(game => {
    const [away, home] = game.split(' @ ');
    return `${teamAbbreviations[away] || 'TBD'}@${teamAbbreviations[home] || 'TBD'}`;
  });

  return (
    <div className="leaderboard">
      <h2>Week 1 Leaderboard</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="rank-column">Rank</th>
              <th className="name-column">Name</th>
              <th className="score-column">Score</th>
              {gameHeaders.map((header, index) => (
                <th key={index} className="game-header">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rankedEntries.map((entry, index) => (
              <tr key={index}>
                <td className="rank-column">{entry.rank}</td>
                <td className="name-column">{formatName(entry.name)}</td>
                <td className="score-column">{entry.score}</td>
                {Object.values(entry.picks).map((pick, pickIndex) => (
                  <td key={pickIndex} className="pick-cell">
                    <div className={`pick-info ${getPickClass(pick)}`}>
                      <span className="pick-team">{teamAbbreviations[pick] || pick}</span>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
