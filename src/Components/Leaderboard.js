import React, { useEffect, useState } from 'react';
import './Leaderboard.css';
import Week5entries from './Week5entries';

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  const correctPicks = {
    '1': 'Atlanta Falcons',
    '2': 'Minnesota Vikings',
    '3': 'Baltimore Ravens',
    '4': 'Houston Texans',
    '5': 'Chicago Bears',
    '6': 'Miami Dolphins',
    '7': 'Jacksonville Jaguars',
    '8': 'Washington Commanders',
    '9': 'Arizona Cardinals',
    '10': 'Denver Broncos',
    '11': 'Green Bay Packers',
    '12': 'New York Giants',
    '13': 'Dallas Cowboys'
    // '14': 'Kansas City Chiefs' - removed
  };

  useEffect(() => {
    try {
      console.log('Week5entries:', Week5entries);
      console.log('Week5entries length:', Week5entries.length);
      const scoredEntries = Week5entries.map(entry => ({
        ...entry,
        score: Object.keys(correctPicks).reduce((acc, gameId) => 
          acc + (entry.picks[gameId] === correctPicks[gameId] ? 1 : 0), 0)
      }));
      scoredEntries.sort((a, b) => b.score - a.score);
      setEntries(scoredEntries);
    } catch (err) {
      console.error('Error setting Week5entries:', err);
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    console.log('Entries state updated:', entries);
  }, [entries]);

  const abbreviateName = (name) => {
    const nameParts = name.split(' ');
    if (nameParts.length === 1) return name;
    return `${nameParts[0]} ${nameParts[1].charAt(0)}.`;
  };

  const abbreviateTeam = (teamName) => {
    const abbreviations = {
      'Tampa Bay Buccaneers': 'TB',
      'Minnesota Vikings': 'MIN',
      'Cincinnati Bengals': 'CIN',
      'Buffalo Bills': 'BUF',
      'Carolina Panthers': 'CAR',
      'New England Patriots': 'NE',
      'Jacksonville Jaguars': 'JAX',
      'Cleveland Browns': 'CLE',
      'San Francisco 49ers': 'SF',
      'Denver Broncos': 'DEN',
      'Green Bay Packers': 'GB',
      'Seattle Seahawks': 'SEA',
      'Dallas Cowboys': 'DAL',
      'New Orleans Saints': 'NO',
      'Atlanta Falcons': 'ATL',
      'New York Jets': 'NYJ',
      'Baltimore Ravens': 'BAL',
      'Houston Texans': 'HOU',
      'Chicago Bears': 'CHI',
      'Miami Dolphins': 'MIA',
      'Indianapolis Colts': 'IND',
      'Washington Commanders': 'WAS',
      'Arizona Cardinals': 'ARI',
      'Las Vegas Raiders': 'LV',
      'Los Angeles Rams': 'LAR',
      'Philadelphia Eagles': 'PHI',
      'Pittsburgh Steelers': 'PIT',
      'Kansas City Chiefs': 'KC'
    };
    return abbreviations[teamName] || teamName;
  };

  const games = [
    { id: '1', teams: ['ATL', 'TB'] },
    { id: '2', teams: ['MIN', 'NYJ'] },
    { id: '3', teams: ['BAL', 'CIN'] },
    { id: '4', teams: ['BUF', 'HOU'] },
    { id: '5', teams: ['CHI', 'CAR'] },
    { id: '6', teams: ['NE', 'MIA'] },
    { id: '7', teams: ['IND', 'JAX'] },
    { id: '8', teams: ['WAS', 'CLE'] },
    { id: '9', teams: ['SF', 'ARI'] },
    { id: '10', teams: ['DEN', 'LV'] },
    { id: '11', teams: ['GB', 'LAR'] },
    { id: '12', teams: ['SEA', 'PHI'] },
    { id: '13', teams: ['DAL', 'PIT'] },
    { id: '14', teams: ['KC', 'NO'] },
  ];

  return (
    <div className="leaderboard">
      <h2 className="leaderboard-title">Week 5 Leaderboard ({entries.length} entries)</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : entries.length === 0 ? (
        <p>Loading entries...</p>
      ) : (
        <div className="leaderboard-container">
          <div className="leaderboard-scroll-container">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th className="sticky-column rank-column">Rank</th>
                  <th className="sticky-column name-score-column">Name</th>
                  {games.map((game) => (
                    <th key={game.id} className="pick-header">
                      <div className="game-header">
                        <span className="matchup">{game.teams[0]} vs {game.teams[1]}</span>
                      </div>
                    </th>
                  ))}
                  <th className="prediction-header">KC-NO</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={index} className={`entry-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
                    <td className="sticky-column rank-column">{index + 1}</td>
                    <td className="sticky-column name-score-column">
                      <div className="name-score-container">
                        <span className="name">{abbreviateName(entry.name)}</span>
                        <span className="score-badge">{entry.score}</span>
                      </div>
                    </td>
                    {games.map((game) => (
                      <td key={game.id} className="pick-cell">
                        <div className={`pick-container ${entry.picks[game.id] === correctPicks[game.id] ? 'correct-pick' : 'incorrect-pick'}`}>
                          <span className="pick-team">{abbreviateTeam(entry.picks[game.id])}</span>
                        </div>
                      </td>
                    ))}
                    <td className="prediction-cell">
                      {entry.tiebreaker.chiefs}-{entry.tiebreaker.saints}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;