import React, { useEffect, useState } from 'react';
import './Leaderboard.css';
import Week4entriesData from './Week4entriesdata'; // Ensure correct casing in import statement

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null); // Moved error state initialization inside the component
  console.log('Imported Week4entriesData:', Week4entriesData); // Moved log inside the component

  useEffect(() => {
    console.log('Week4entriesData:', Week4entriesData); // Update log message
    try {
      if (Week4entriesData && typeof Week4entriesData === 'object') {
        const processedEntries = Object.entries(Week4entriesData).map(([name, data]) => ({
          name: abbreviateName(name),
          ...data,
          correctPicks: calculateCorrectPicks(data.picks)
        }));
        console.log('Processed entries:', processedEntries);
        setEntries(processedEntries);
      } else {
        throw new Error('Week4entriesData is not in the expected format'); // Update error message
      }
    } catch (err) {
      console.error('Error processing Week4entriesData:', err); // Update error log
      setError(err.message);
    }
  }, []);

  const calculateCorrectPicks = (picks) => {
    let correctCount = 0;
    if (picks['1'] === 'New York Jets') correctCount++;
    if (picks['2'] === 'Philadelphia Eagles') correctCount++;
    if (picks['3'] === 'Green Bay Packers') correctCount++;
    if (picks['4'] === 'Pittsburgh Steelers') correctCount++;
    if (picks['5'] === 'Indianapolis Colts') correctCount++;
    if (picks['6'] === 'Minnesota Vikings') correctCount++;
    if (picks['7'] === 'New York Giants') correctCount++;
    if (picks['8'] === 'Denver Broncos') correctCount++;
    if (picks['9'] === 'Seattle Seahawks') correctCount++;
    if (picks['10'] === 'Carolina Panthers') correctCount++;
    if (picks['11'] === 'Baltimore Ravens') correctCount++;
    if (picks['12'] === 'Detroit Lions') correctCount++;
    if (picks['13'] === 'Los Angeles Rams') correctCount++;
    if (picks['14'] === 'Kansas City Chiefs') correctCount++;
    if (picks['15'] === 'Buffalo Bills') correctCount++;
    if (picks['16'] === 'Washington Commanders') correctCount++;
    return correctCount;
  };

  const isCorrectPick = (gameId, pick) => {
    const correctPicks = {
      '1': 'New York Jets',
      '2': 'Philadelphia Eagles',
      '3': 'Green Bay Packers',
      '4': 'Pittsburgh Steelers',
      '5': 'Indianapolis Colts',
      '6': 'Minnesota Vikings',
      '7': 'New York Giants',
      '8': 'Denver Broncos',
      '9': 'Seattle Seahawks',
      '10': 'Carolina Panthers',
      '11': 'Baltimore Ravens',
      '12': 'Detroit Lions',
      '13': 'Los Angeles Rams',
      '14': 'Kansas City Chiefs',
      '15': 'Buffalo Bills',
      '16': 'Washington Commanders'
    };
    
    if (correctPicks[gameId]) {
      return pick === correctPicks[gameId];
    }
    return null; // For games that haven't been played yet
  };

  const abbreviateName = (name) => {
    const nameParts = name.split(' ');
    if (nameParts.length === 1) return name;
    return `${nameParts[0]} ${nameParts[1].charAt(0)}.`;
  };

  const games = [
    { id: '1', teams: ['NE', 'NYJ'] },
    { id: '2', teams: ['NO', 'PHI'] },
    { id: '3', teams: ['TEN', 'GB'] },
    { id: '4', teams: ['PIT', 'LAC'] },
    { id: '5', teams: ['CHI', 'IND'] },
    { id: '6', teams: ['MIN', 'HOU'] },
    { id: '7', teams: ['CLE', 'NYG'] },
    { id: '8', teams: ['TB', 'DEN'] },
    { id: '9', teams: ['SEA', 'MIA'] },
    { id: '10', teams: ['CAR', 'LV'] },
    { id: '11', teams: ['BAL', 'DAL'] },
    { id: '12', teams: ['ARI', 'DET'] },
    { id: '13', teams: ['SF', 'LAR'] },
    { id: '14', teams: ['KC', 'ATL'] },
    { id: '15', teams: ['BUF', 'JAX'] },
    { id: '16', teams: ['CIN', 'WAS'] },
  ];

  const abbreviateTeam = (teamName) => {
    const abbreviations = {
      'New England Patriots': 'NE',
      'New York Jets': 'NYJ',
      'New Orleans Saints': 'NO',
      'Philadelphia Eagles': 'PHI',
      'Tennessee Titans': 'TEN',
      'Green Bay Packers': 'GB',
      'Pittsburgh Steelers': 'PIT',
      'Los Angeles Chargers': 'LAC',
      'Chicago Bears': 'CHI',
      'Indianapolis Colts': 'IND',
      'Minnesota Vikings': 'MIN',
      'Houston Texans': 'HOU',
      'Cleveland Browns': 'CLE',
      'New York Giants': 'NYG',
      'Tampa Bay Buccaneers': 'TB',
      'Denver Broncos': 'DEN',
      'Seattle Seahawks': 'SEA',
      'Miami Dolphins': 'MIA',
      'Carolina Panthers': 'CAR',
      'Las Vegas Raiders': 'LV',
      'Baltimore Ravens': 'BAL',
      'Dallas Cowboys': 'DAL',
      'Arizona Cardinals': 'ARI',
      'Detroit Lions': 'DET',
      'San Francisco 49ers': 'SF',
      'Los Angeles Rams': 'LAR',
      'Kansas City Chiefs': 'KC',
      'Atlanta Falcons': 'ATL',
      'Buffalo Bills': 'BUF',
      'Jacksonville Jaguars': 'JAX',
      'Cincinnati Bengals': 'CIN',
      'Washington Commanders': 'WAS'
    };
    return abbreviations[teamName] || teamName;
  };

  const sortedEntries = [...entries].sort((a, b) => b.correctPicks - a.correctPicks);

  console.log('Sorted entries:', sortedEntries);

  return (
    <div className="leaderboard">
      <h2 className="leaderboard-title">Week 3 Leaderboard</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : entries.length === 0 ? (
        <div>
          <p>Loading entries...</p>
          <p>Debug info:</p>
          <pre>{JSON.stringify(Week4entriesData, null, 2)}</pre>
        </div>
      ) : (
        <div className="leaderboard-container">
          <div className="leaderboard-scroll-container">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th className="sticky-column rank-column">Rank</th>
                  <th className="sticky-column name-score-column">Name (Score)</th>
                  {games.map((game) => (
                    <th key={game.id} className="pick-header">
                      <div className="game-header">
                        <span className="matchup">{game.teams[0]} vs {game.teams[1]}</span>
                      </div>
                    </th>
                  ))}
                  <th className="prediction-header">JAX-BUF</th>
                </tr>
              </thead>
              <tbody>
                {sortedEntries.map((entry, index) => (
                  <tr key={entry.name} className={`entry-row ${index % 2 === 0 ? 'even' : 'odd'} ${index === 0 ? 'winner' : ''}`}>
                    <td className="sticky-column rank-column">
                      {index + 1}
                    </td>
                    <td className="sticky-column name-score-column">
                      <div className="name-score-container">
                        <span className="name">
                          {index === 0 && <span className="winner-trophy">🏆</span>}
                          {entry.name}
                        </span>
                        <span className="score-badge">{entry.correctPicks}</span>
                      </div>
                    </td>
                    {games.map((game) => {
                      const pickResult = isCorrectPick(game.id, entry.picks[game.id]);
                      const pickClass = pickResult === true ? 'correct-pick' : 
                                        pickResult === false ? 'incorrect-pick' : 
                                        'neutral-pick';
                      return (
                        <td key={game.id} className="pick-cell">
                          <div className={`pick-container ${pickClass}`}>
                            <span className="pick-team">{abbreviateTeam(entry.picks[game.id])}</span>
                          </div>
                        </td>
                      );
                    })}
                    <td className="prediction-cell">
                      {entry.scorePrediction.jaguars}-{entry.scorePrediction.bills}
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
