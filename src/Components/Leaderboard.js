import React, { useMemo, useState } from 'react';
import './Leaderboard.css';

function Leaderboard({ entriesData }) {
  const [selectedWeek, setSelectedWeek] = useState(1);

  const correctTeams = ['Kansas City Chiefs', 'Philadelphia Eagles'];
  const incorrectTeams = ['Baltimore Ravens', 'Green Bay Packers'];

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

  const sortedEntries = useMemo(() => {
    if (!entriesData || entriesData.length === 0) {
      return [];
    }

    return [...entriesData].sort((a, b) => a.name.localeCompare(b.name));
  }, [entriesData]);

  return (
    <div className="leaderboard">
      <h2>NFL Pick'em Pool - Week {selectedWeek}</h2>
      <div className="leaderboard-container">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th className="fixed-column name-column">Name</th>
              {gameHeaders.map((header, index) => (
                <th key={index} className="pick-header">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedEntries.map((entry, index) => (
              <tr key={index}>
                <td className="fixed-column name-column">{formatName(entry.name)}</td>
                {gameMatchups.map((matchup, pickIndex) => {
                  const pick = entry.picks[pickIndex + 1];
                  return (
                    <td key={pickIndex} className={`pick-cell ${getPickClass(pick)}`}>
                      <span className="pick-team">{teamAbbreviations[pick] || pick}</span>
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
