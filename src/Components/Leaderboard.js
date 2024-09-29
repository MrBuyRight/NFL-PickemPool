import React, { useEffect, useState } from 'react';
import './Leaderboard.css';
import week4EntryData from './Week4entrydata'; // Updated import

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      console.log('week4EntryData:', week4EntryData);
      const processedEntries = Object.entries(week4EntryData).map(([name, data]) => {
        console.log('Processing entry:', name, data);
        const correctPicks = data.picks['1'] === 'Dallas Cowboys' ? 1 : 0;
        return {
          name,
          picks: data.picks,
          tiebreaker: data.tiebreaker,
          correctPicks: correctPicks
        };
      });
      // Sort entries by correctPicks in descending order
      processedEntries.sort((a, b) => b.correctPicks - a.correctPicks);
      console.log('Processed entries:', processedEntries);
      setEntries(processedEntries);
    } catch (err) {
      console.error('Error processing Week4EntryData:', err);
      setError(err.message);
    }
  }, []);

  const abbreviateName = (name) => {
    const nameParts = name.split(' ');
    if (nameParts.length === 1) return name;
    return `${nameParts[0]} ${nameParts[1].charAt(0)}.`;
  };

  const games = [
    { id: '1', teams: ['DAL', 'NYG'] },
    { id: '2', teams: ['PHI', 'TB'] },
    { id: '3', teams: ['MIN', 'GB'] },
    { id: '4', teams: ['NO', 'ATL'] },
    { id: '5', teams: ['PIT', 'IND'] },
    { id: '6', teams: ['LAR', 'CHI'] },
    { id: '7', teams: ['CIN', 'CAR'] },
    { id: '8', teams: ['JAX', 'HOU'] },
    { id: '9', teams: ['DEN', 'NYJ'] },
    { id: '10', teams: ['WAS', 'ARI'] },
    { id: '11', teams: ['NE', 'SF'] },
    { id: '12', teams: ['KC', 'LAC'] },
    { id: '13', teams: ['CLE', 'LV'] },
    { id: '14', teams: ['BUF', 'BAL'] },
    { id: '15', teams: ['TEN', 'MIA'] },
    { id: '16', teams: ['SEA', 'DET'] },
  ];

  const abbreviateTeam = (teamName) => {
    const abbreviations = {
      'Dallas Cowboys': 'DAL',
      'New York Giants': 'NYG',
      'Philadelphia Eagles': 'PHI',
      'Tampa Bay Buccaneers': 'TB',
      'Minnesota Vikings': 'MIN',
      'Green Bay Packers': 'GB',
      'New Orleans Saints': 'NO',
      'Atlanta Falcons': 'ATL',
      'Pittsburgh Steelers': 'PIT',
      'Indianapolis Colts': 'IND',
      'Los Angeles Rams': 'LAR',
      'Chicago Bears': 'CHI',
      'Cincinnati Bengals': 'CIN',
      'Carolina Panthers': 'CAR',
      'Jacksonville Jaguars': 'JAX',
      'Houston Texans': 'HOU',
      'Denver Broncos': 'DEN',
      'New York Jets': 'NYJ',
      'Washington Commanders': 'WAS',
      'Arizona Cardinals': 'ARI',
      'New England Patriots': 'NE',
      'San Francisco 49ers': 'SF',
      'Kansas City Chiefs': 'KC',
      'Los Angeles Chargers': 'LAC',
      'Cleveland Browns': 'CLE',
      'Las Vegas Raiders': 'LV',
      'Buffalo Bills': 'BUF',
      'Baltimore Ravens': 'BAL',
      'Tennessee Titans': 'TEN',
      'Miami Dolphins': 'MIA',
      'Seattle Seahawks': 'SEA',
      'Detroit Lions': 'DET'
    };
    return abbreviations[teamName] || teamName;
  };

  const isCorrectPick = (gameId, pick) => {
    return gameId === '1' && pick === 'Dallas Cowboys';
  };

  return (
    <div className="leaderboard">
      <h2 className="leaderboard-title">Week 4 Leaderboard</h2>
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
                  <th className="prediction-header">SEA-DET</th>
                  <th className="score-column">Score</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={entry.name} className={`entry-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
                    <td className="sticky-column rank-column">
                      {index + 1}
                    </td>
                    <td className="sticky-column name-score-column">
                      <div className="name-score-container">
                        <span className="name">{abbreviateName(entry.name)}</span>
                        <span className="score-badge">{entry.correctPicks}</span>
                      </div>
                    </td>
                    {games.map((game) => (
                      <td key={game.id} className="pick-cell">
                        <div className={`pick-container ${isCorrectPick(game.id, entry.picks[game.id]) ? 'correct-pick' : 'neutral-pick'}`}>
                          <span className="pick-team">{abbreviateTeam(entry.picks[game.id])}</span>
                        </div>
                      </td>
                    ))}
                    <td className="prediction-cell">
                      {entry.tiebreaker.seahawks}-{entry.tiebreaker.lions}
                    </td>
                    <td className="score-column">
                      <span className="score-badge">{entry.correctPicks}</span>
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