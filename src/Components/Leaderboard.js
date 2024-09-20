import React, { useEffect, useState } from 'react';
import './Leaderboard.css';
import Week3entriesData from './Week3entriesData';

console.log('Imported Week3entriesData:', Week3entriesData);

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Week3entriesData:', Week3entriesData);
    try {
      if (Week3entriesData && typeof Week3entriesData === 'object') {
        const processedEntries = Object.entries(Week3entriesData).map(([name, data]) => ({
          name,
          ...data,
          correctPicks: calculateCorrectPicks(data.picks)
        }));
        console.log('Processed entries:', processedEntries);
        setEntries(processedEntries);
      } else {
        throw new Error('Week3entriesData is not in the expected format');
      }
    } catch (err) {
      console.error('Error processing Week3entriesData:', err);
      setError(err.message);
    }
  }, []);

  const calculateCorrectPicks = (picks) => {
    let correctCount = 0;
    if (picks['1'] === 'New York Jets') correctCount++;
    return correctCount;
  };

  const isCorrectPick = (gameId, pick) => {
    if (gameId === '1' && pick === 'New York Jets') return true;
    if (gameId === '1' && pick !== 'New York Jets') return false;
    return null; // For games that haven't been played yet
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

  const sortedEntries = [...entries].sort((a, b) => b.correctPicks - a.correctPicks);

  console.log('Sorted entries:', sortedEntries);

  return (
    <div className="leaderboard">
      <h2>Week 3 Leaderboard</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : entries.length === 0 ? (
        <div>
          <p>Loading entries...</p>
          <p>Debug info:</p>
          <pre>{JSON.stringify(Week3entriesData, null, 2)}</pre>
        </div>
      ) : (
        <div className="leaderboard-container">
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
                <th className="prediction-header">JAX-BUF Prediction</th>
              </tr>
            </thead>
            <tbody>
              {sortedEntries.map((entry, index) => (
                <tr key={entry.name} className={`entry-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
                  <td className="sticky-column rank-column">{index + 1}</td>
                  <td className="sticky-column name-score-column">
                    <div className="name-score-container">
                      <span className="name">{entry.name}</span>
                      <span className="score">{entry.correctPicks}</span>
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
                          <span className="pick-team">{entry.picks[game.id]}</span>
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
      )}
    </div>
  );
};

export default Leaderboard;
