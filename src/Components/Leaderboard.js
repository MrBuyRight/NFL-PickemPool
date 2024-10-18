import React, { useEffect, useState } from 'react';
import './Leaderboard.css';
import Week7entries from './Week7entrydata';

const Leaderboard = () => {
  console.log('Rendering Leaderboard');
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  const correctPicks = {
    '1': 'Denver Broncos',
    // Other games are not included in the correct picks list
  };

  useEffect(() => {
    try {
      console.log('Week7entries:', Week7entries);
      console.log('Week7entries type:', typeof Week7entries);
      console.log('Is Week7entries an array?', Array.isArray(Week7entries));
      
      if (!Array.isArray(Week7entries)) {
        throw new Error('Week7entries is not an array');
      }

      const scoredEntries = Week7entries.map(entry => ({
        name: entry.name,
        picks: entry.picks,
        chargers: entry.chargers,
        cardinals: entry.cardinals,
        score: entry.picks[0] === correctPicks['1'] ? 1 : 0
      }));
      scoredEntries.sort((a, b) => b.score - a.score || 
        (Math.abs(parseInt(a.chargers) - parseInt(a.cardinals)) - Math.abs(parseInt(b.chargers) - parseInt(b.cardinals))));
      setEntries(scoredEntries);
    } catch (err) {
      console.error('Error processing Week7entries:', err);
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
      'Denver Broncos': 'DEN',
      'New Orleans Saints': 'NO',
      'Jacksonville Jaguars': 'JAX',
      'New England Patriots': 'NE',
      'Philadelphia Eagles': 'PHI',
      'New York Giants': 'NYG',
      'Green Bay Packers': 'GB',
      'Houston Texans': 'HOU',
      'Atlanta Falcons': 'ATL',
      'Seattle Seahawks': 'SEA',
      'Buffalo Bills': 'BUF',
      'Cincinnati Bengals': 'CIN',
      'Cleveland Browns': 'CLE',
      'Indianapolis Colts': 'IND',
      'Miami Dolphins': 'MIA',
      'Detroit Lions': 'DET',
      'Minnesota Vikings': 'MIN',
      'Washington Commanders': 'WAS',
      'Carolina Panthers': 'CAR',
      'Los Angeles Rams': 'LAR',
      'Las Vegas Raiders': 'LV',
      'Kansas City Chiefs': 'KC',
      'San Francisco 49ers': 'SF',
      'Pittsburgh Steelers': 'PIT',
      'New York Jets': 'NYJ',
      'Baltimore Ravens': 'BAL',
      'Tampa Bay Buccaneers': 'TB',
      'Arizona Cardinals': 'ARI',
      'Los Angeles Chargers': 'LAC',
    };
    return abbreviations[teamName] || teamName;
  };

  const games = [
    { id: '1', teams: ['DEN', 'NO'] },
    { id: '2', teams: ['JAX', 'NE'] },
    { id: '3', teams: ['PHI', 'NYG'] },
    { id: '4', teams: ['GB', 'HOU'] },
    { id: '5', teams: ['ATL', 'SEA'] },
    { id: '6', teams: ['BUF', 'TEN'] },
    { id: '7', teams: ['CIN', 'CLE'] },
    { id: '8', teams: ['IND', 'MIA'] },
    { id: '9', teams: ['DET', 'MIN'] },
    { id: '10', teams: ['WAS', 'CAR'] },
    { id: '11', teams: ['LAR', 'LV'] },
    { id: '12', teams: ['KC', 'SF'] },
    { id: '13', teams: ['PIT', 'NYJ'] },
    { id: '14', teams: ['BAL', 'TB'] },
    { id: '15', teams: ['LAC', 'ARI'] },
  ];

  return (
    <div className="leaderboard">
      <h2 className="leaderboard-title">Week 7 Leaderboard ({entries.length} entries)</h2>
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
                  <th className="prediction-header">LAC-ARI</th>
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
                    {entry.picks.map((pick, idx) => (
                      <td key={idx} className="pick-cell">
                        <div className={`pick-container ${idx === 0 && pick === correctPicks['1'] ? 'correct-pick' : ''}`}>
                          <span className="pick-team">{abbreviateTeam(pick)}</span>
                        </div>
                      </td>
                    ))}
                    <td className="prediction-cell">
                      {entry.chargers}-{entry.cardinals}
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
