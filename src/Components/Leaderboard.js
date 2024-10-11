import React, { useEffect, useState } from 'react';
import './Leaderboard.css';
import Week6entries from './Week6entrydata';

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  const correctPicks = {
    '1': 'San Francisco 49ers',
  };

  useEffect(() => {
    try {
      console.log('Week6entries:', Week6entries);
      console.log('Week6entries length:', Week6entries.length);
      const scoredEntries = Week6entries.map(entry => ({
        ...entry,
        score: Object.keys(correctPicks).reduce((acc, gameId) => 
          acc + (entry.picks[gameId] === correctPicks[gameId] ? 1 : 0), 0)
      }));
      scoredEntries.sort((a, b) => b.score - a.score);
      setEntries(scoredEntries);
    } catch (err) {
      console.error('Error setting Week6entries:', err);
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
      'San Francisco 49ers': 'SF',
      'Seattle Seahawks': 'SEA',
      'Chicago Bears': 'CHI',
      'Jacksonville Jaguars': 'JAX',
      'Baltimore Ravens': 'BAL',
      'Washington Commanders': 'WAS',
      'Philadelphia Eagles': 'PHI',
      'Cleveland Browns': 'CLE',
      'Green Bay Packers': 'GB',
      'Arizona Cardinals': 'ARI',
      'Indianapolis Colts': 'IND',
      'Tennessee Titans': 'TEN',
      'Houston Texans': 'HOU',
      'New England Patriots': 'NE',
      'Tampa Bay Buccaneers': 'TB',
      'New Orleans Saints': 'NO',
      'Pittsburgh Steelers': 'PIT',
      'Las Vegas Raiders': 'LV',
      'Denver Broncos': 'DEN',
      'Los Angeles Chargers': 'LAC',
      'Atlanta Falcons': 'ATL',
      'Carolina Panthers': 'CAR',
      'Detroit Lions': 'DET',
      'Dallas Cowboys': 'DAL',
      'Cincinnati Bengals': 'CIN',
      'New York Giants': 'NYG',
      'Buffalo Bills': 'BUF',
      'New York Jets': 'NYJ'
    };
    return abbreviations[teamName] || teamName;
  };

  const games = [
    { id: '1', teams: ['SF', 'SEA'] },
    { id: '2', teams: ['CHI', 'JAX'] },
    { id: '3', teams: ['BAL', 'WAS'] },
    { id: '4', teams: ['PHI', 'CLE'] },
    { id: '5', teams: ['GB', 'ARI'] },
    { id: '6', teams: ['IND', 'TEN'] },
    { id: '7', teams: ['HOU', 'NE'] },
    { id: '8', teams: ['TB', 'NO'] },
    { id: '9', teams: ['PIT', 'LV'] },
    { id: '10', teams: ['DEN', 'LAC'] },
    { id: '11', teams: ['ATL', 'CAR'] },
    { id: '12', teams: ['DET', 'DAL'] },
    { id: '13', teams: ['CIN', 'NYG'] },
    { id: '14', teams: ['BUF', 'NYJ'] },
  ];

  return (
    <div className="leaderboard">
      <h2 className="leaderboard-title">Week 6 Leaderboard ({entries.length} entries)</h2>
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
                  <th className="prediction-header">BUF-NYJ</th>
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
                      {entry.tiebreaker.bills}-{entry.tiebreaker.jets}
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