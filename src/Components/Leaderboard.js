import React, { useMemo, useState } from 'react';
import './Leaderboard.css';

function Leaderboard({ entriesData, updatePick, correctPicks, incorrectPicks }) {
  console.log('Leaderboard updated with new correct and incorrect teams');
  const [selectedWeek, setSelectedWeek] = useState(1);

  // Update correctTeams and incorrectTeams
  const correctTeams = [
    'Kansas City Chiefs', 'Philadelphia Eagles', 'New England Patriots',
    'Buffalo Bills', 'Minnesota Vikings', 'Chicago Bears', 'New Orleans Saints',
    'Pittsburgh Steelers', 'Miami Dolphins', 'Houston Texans',
    'Los Angeles Chargers', 'Seattle Seahawks', 'Dallas Cowboys', 
    'Tampa Bay Buccaneers', 'Detroit Lions', 'San Francisco 49ers'
  ];
  const incorrectTeams = [
    'Baltimore Ravens', 'Green Bay Packers', 'Cincinnati Bengals',
    'Arizona Cardinals', 'Tennessee Titans', 'Carolina Panthers',
    'Atlanta Falcons', 'Jacksonville Jaguars', 'Indianapolis Colts',
    'New York Giants', 'Las Vegas Raiders', 'Denver Broncos', 
    'Cleveland Browns', 'Washington Commanders', 'Los Angeles Rams', 'New York Jets'
  ];

  // Add the teamAbbreviations definition
  const teamAbbreviations = {
    'Kansas City Chiefs': 'KC',
    'Detroit Lions': 'DET',
    'Philadelphia Eagles': 'PHI',
    'New England Patriots': 'NE',
    'Baltimore Ravens': 'BAL',
    'Houston Texans': 'HOU',
    'Atlanta Falcons': 'ATL',
    'Carolina Panthers': 'CAR',
    'Minnesota Vikings': 'MIN',
    'Tampa Bay Buccaneers': 'TB',
    'Indianapolis Colts': 'IND',
    'Jacksonville Jaguars': 'JAX',
    'Washington Commanders': 'WAS',
    'Arizona Cardinals': 'ARI',
    'Pittsburgh Steelers': 'PIT',
    'San Francisco 49ers': 'SF',
    'Cleveland Browns': 'CLE',
    'Cincinnati Bengals': 'CIN',
    'New Orleans Saints': 'NO',
    'Tennessee Titans': 'TEN',
    'Chicago Bears': 'CHI',
    'Green Bay Packers': 'GB',
    'Denver Broncos': 'DEN',
    'Las Vegas Raiders': 'LV',
    'Los Angeles Chargers': 'LAC',
    'Miami Dolphins': 'MIA',
    'Seattle Seahawks': 'SEA',
    'Los Angeles Rams': 'LAR',
    'New York Giants': 'NYG',
    'Dallas Cowboys': 'DAL',
    'New York Jets': 'NYJ',
    'Buffalo Bills': 'BUF'
  };

  // Update the gameMatchups definition
  const gameMatchups = [
    { away: 'Baltimore Ravens', home: 'Kansas City Chiefs' },
    { away: 'Green Bay Packers', home: 'Philadelphia Eagles' },
    { away: 'Pittsburgh Steelers', home: 'Atlanta Falcons' },
    { away: 'Arizona Cardinals', home: 'Buffalo Bills' },
    { away: 'Tennessee Titans', home: 'Chicago Bears' },
    { away: 'New England Patriots', home: 'Cincinnati Bengals' },
    { away: 'Houston Texans', home: 'Indianapolis Colts' },
    { away: 'Jacksonville Jaguars', home: 'Miami Dolphins' },
    { away: 'Carolina Panthers', home: 'New Orleans Saints' },
    { away: 'Minnesota Vikings', home: 'New York Giants' },
    { away: 'Las Vegas Raiders', home: 'Los Angeles Chargers' },
    { away: 'Denver Broncos', home: 'Seattle Seahawks' },
    { away: 'Dallas Cowboys', home: 'Cleveland Browns' },
    { away: 'Washington Commanders', home: 'Tampa Bay Buccaneers' },
    { away: 'Los Angeles Rams', home: 'Detroit Lions' },
    { away: 'New York Jets', home: 'San Francisco 49ers' }
  ];

  // Add the gameHeaders definition
  const gameHeaders = gameMatchups.map((matchup, index) => `${teamAbbreviations[matchup.away]} @ ${teamAbbreviations[matchup.home]}`);

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
    return Object.values(picks).filter(pick => correctTeams.includes(pick)).length;
  };

  const calculateIncorrectPicks = (picks) => {
    return Object.values(picks).filter(pick => incorrectTeams.includes(pick)).length;
  };

  const rankedEntries = useMemo(() => {
    if (!entriesData || entriesData.length === 0) {
      return [];
    }

    const entries = entriesData
      .map(entry => ({
        ...entry,
        score: calculateScore(entry.picks),
        incorrectPicks: calculateIncorrectPicks(entry.picks)
      }))
      .sort((a, b) => b.score - a.score || a.incorrectPicks - b.incorrectPicks || a.name.localeCompare(b.name));

    const minIncorrectPicks = Math.min(...entries.map(e => e.incorrectPicks));

    return entries.map((entry, index, array) => ({
      ...entry,
      rank: index === 0 || entry.score !== array[index - 1].score ? index + 1 : array[index - 1].rank,
      isLeastIncorrect: entry.incorrectPicks === minIncorrectPicks
    }));
  }, [entriesData]);

  return (
    <div className="leaderboard">
      <h2>NFL Pick'em Pool - Week {selectedWeek}</h2>
      <div className="leaderboard-container">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th className="fixed-column name-column">
                <span className="name-header">Name</span>
              </th>
              {gameHeaders.map((header, index) => (
                <th key={index} className="pick-header">
                  <div className="game-header">
                    <span className="game-number">Game {index + 1}</span>
                    <span className="matchup">{header}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rankedEntries.map((entry, index) => (
              <tr key={index} className={`entry-row ${entry.isLeastIncorrect ? 'least-incorrect' : ''}`}>
                <td className="fixed-column name-column">
                  <div className="name-container" title={entry.name}>
                    {formatName(entry.name)}
                  </div>
                </td>
                {gameMatchups.map((matchup, pickIndex) => {
                  const pick = entry.picks[pickIndex + 1];
                  return (
                    <td key={pickIndex} className="pick-cell">
                      <div className={`pick-container ${getPickClass(pick)}`}>
                        <span className="pick-team">{teamAbbreviations[pick] || pick}</span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
