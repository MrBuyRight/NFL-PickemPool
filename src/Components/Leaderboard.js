import React, { useEffect, useState } from 'react';
import './Leaderboard.css';
import Week5entrydata from './Week5entrydata';

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  const correctTeams = {
    '1': 'Tampa Bay Buccaneers',
    '2': 'Minnesota Vikings',
    '3': 'Baltimore Ravens',
    '4': 'Buffalo Bills',
    '5': 'Chicago Bears',
    '6': 'New England Patriots',
    '7': 'Indianapolis Colts',
    '8': 'Washington Commanders',
    '9': 'San Francisco 49ers',
    '10': 'Denver Broncos',
    '11': 'Green Bay Packers',
    '12': 'Seattle Seahawks',
    '13': 'Dallas Cowboys',
    '14': 'Kansas City Chiefs'
  };

  useEffect(() => {
    try {
      console.log('Week5entrydata:', Week5entrydata);
      const processedEntries = Week5entrydata.map((entry) => {
        console.log('Processing entry:', entry.name, entry);
        const correctPicks = Object.entries(correctTeams).reduce((acc, [gameId, correctTeam]) => {
          return acc + (entry.picks[gameId] === correctTeam ? 1 : 0);
        }, 0);
        return {
          ...entry,
          correctPicks: correctPicks
        };
      });
      processedEntries.sort((a, b) => b.correctPicks - a.correctPicks);
      console.log('Processed entries:', processedEntries);
      setEntries(processedEntries);
    } catch (err) {
      console.error('Error processing Week5entrydata:', err);
      setError(err.message);
    }
  }, []);

  const abbreviateName = (name) => {
    const nameParts = name.split(' ');
    if (nameParts.length === 1) return name;
    return `${nameParts[0]} ${nameParts[1].charAt(0)}.`;
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
    return correctTeams[gameId] === pick;
  };

  return (
    <div className="leaderboard">
      <h2 className="leaderboard-title">Week 5 Leaderboard</h2>
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
                    {games.map((game) => {
                      const pickStatus = isCorrectPick(game.id, entry.picks[game.id]);
                      return (
                        <td key={game.id} className="pick-cell">
                          <div className={`pick-container ${pickStatus === true ? 'correct-pick' : pickStatus === false ? 'incorrect-pick' : 'neutral-pick'}`}>
                            <span className="pick-team">{abbreviateTeam(entry.picks[game.id])}</span>
                          </div>
                        </td>
                      );
                    })}
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