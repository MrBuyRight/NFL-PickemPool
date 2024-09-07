import React, { useMemo } from 'react';
import './Leaderboard.css';

function Leaderboard({ entriesData }) {
  const correctTeams = ['Kansas City Chiefs', 'Philadelphia Eagles'];
  const incorrectTeams = ['Baltimore Ravens', 'Green Bay Packers'];

  // Keep the existing teamAbbreviations and gameMatchups

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

  // Generate game headers based on the gameMatchups array
  const gameHeaders = gameMatchups.map(matchup => 
    `${teamAbbreviations[matchup.away]}@${teamAbbreviations[matchup.home]}`
  );

  const rankedEntries = useMemo(() => {
    if (!entriesData || entriesData.length === 0) {
      return [];
    }

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

  if (rankedEntries.length === 0) {
    return <div>Loading...</div>;
  }

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
              {gameHeaders.map((header, index) => (
                <th key={index} className="game-header">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rankedEntries.map((entry, index) => (
              <tr key={index}>
                <td className="rank-column">{entry.rank}</td>
                <td className="name-column">{formatName(entry.name)}</td>
                <td className="score-column">{entry.score}</td>
                {gameMatchups.map((matchup, pickIndex) => {
                  const pick = entry.picks[`${matchup.away} @ ${matchup.home}`];
                  return (
                    <td key={pickIndex} className="pick-cell">
                      <div className={`pick-info ${getPickClass(pick)}`}>
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
