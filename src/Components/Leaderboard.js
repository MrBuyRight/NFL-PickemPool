import React, { useMemo } from 'react';
import './Leaderboard.css';

function Leaderboard({ entriesData }) {
  if (!entriesData || entriesData.length === 0) {
    return <div>Loading...</div>;
  }

  const gameCount = Object.keys(entriesData[0].picks).length;

  const correctTeams = ['Kansas City Chiefs', 'Philadelphia Eagles'];
  const incorrectTeams = ['Baltimore Ravens', 'Green Bay Packers'];

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
              {[...Array(gameCount)].map((_, index) => (
                <th key={index} className="game-header">G{index + 1}</th>
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
                      <span className="pick-team">{pick.split(' ').pop()}</span>
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
