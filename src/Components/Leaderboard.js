import React, { useMemo, useState } from 'react';
import './Leaderboard.css';
import entriesData from './entriesData';

function Leaderboard() {
  const [selectedWeek, setSelectedWeek] = useState(2);

  const teamAbbreviations = {
    "Buffalo Bills": "BUF",
    "Miami Dolphins": "MIA",
    "Las Vegas Raiders": "LV",
    "Baltimore Ravens": "BAL",
    "Indianapolis Colts": "IND",
    "Green Bay Packers": "GB",
    "New York Jets": "NYJ",
    "Tennessee Titans": "TEN",
    "Seattle Seahawks": "SEA",
    "New England Patriots": "NE",
    "Cleveland Browns": "CLE",
    "Jacksonville Jaguars": "JAX",
    "New Orleans Saints": "NO",
    "Dallas Cowboys": "DAL",
    "Los Angeles Chargers": "LAC",
    "Carolina Panthers": "CAR",
    "New York Giants": "NYG",
    "Washington Commanders": "WAS",
    "San Francisco 49ers": "SF",
    "Minnesota Vikings": "MIN",
    "Tampa Bay Buccaneers": "TB",
    "Detroit Lions": "DET",
    "Los Angeles Rams": "LAR",
    "Arizona Cardinals": "ARI",
    "Cincinnati Bengals": "CIN",
    "Kansas City Chiefs": "KC",
    "Pittsburgh Steelers": "PIT",
    "Denver Broncos": "DEN",
    "Chicago Bears": "CHI",
    "Houston Texans": "HOU",
    "Atlanta Falcons": "ATL",
    "Philadelphia Eagles": "PHI"
  };

  const gameMatchups = [
    "BUF @ MIA",
    "LV @ BAL",
    "IND @ GB",
    "NYJ @ TEN",
    "SEA @ NE",
    "CLE @ JAX",
    "NO @ DAL",
    "LAC @ CAR",
    "NYG @ WAS",
    "SF @ MIN",
    "TB @ DET",
    "LAR @ ARI",
    "CIN @ KC",
    "PIT @ DEN",
    "CHI @ HOU",
    "ATL @ PHI"
  ];

  const getPickClass = (pick, correctTeams, incorrectTeams) => {
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

  const calculateScore = (picks, correctTeams) => {
    return Object.values(picks).filter(pick => correctTeams.includes(pick)).length;
  };

  const calculateIncorrectPicks = (picks, incorrectTeams) => {
    return Object.values(picks).filter(pick => incorrectTeams.includes(pick)).length;
  };

  // Simulated correct and incorrect teams (replace with actual data when available)
  const correctTeams = ["Buffalo Bills",];
  const incorrectTeams = ["Miami Dolphins",];

  const rankedEntries = useMemo(() => {
    const entries = entriesData
      .map(entry => ({
        ...entry,
        score: calculateScore(entry.picks, correctTeams),
        incorrectPicks: calculateIncorrectPicks(entry.picks, incorrectTeams)
      }))
      .sort((a, b) => b.score - a.score || a.incorrectPicks - b.incorrectPicks || a.name.localeCompare(b.name));

    const minIncorrectPicks = Math.min(...entries.map(e => e.incorrectPicks));

    return entries.map((entry, index, array) => ({
      ...entry,
      rank: index === 0 || entry.score !== array[index - 1].score ? index + 1 : array[index - 1].rank,
      isLeastIncorrect: entry.incorrectPicks === minIncorrectPicks
    }));
  }, []);

  return (
    <div className="leaderboard">
      <h2>NFL Pick'em Pool - Week {selectedWeek}</h2>
      <div className="leaderboard-container">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th className="fixed-column name-column">
                <span className="name-header">Name (Correct)</span>
              </th>
              {gameMatchups.map((matchup, index) => (
                <th key={index} className="pick-header">
                  <div className="game-header">
                    <span className="game-number">Game {index + 1}</span>
                    <span className="matchup">{matchup}</span>
                  </div>
                </th>
              ))}
              <th className="score-prediction-header">Score Prediction</th>
            </tr>
          </thead>
          <tbody>
            {rankedEntries.map((entry, index) => (
              <tr key={index} className={`entry-row ${entry.isLeastIncorrect ? 'least-incorrect' : ''}`}>
                <td className="fixed-column name-column">
                  <div className={`name-container ${entry.isLeastIncorrect ? 'least-incorrect' : ''}`} title={entry.name}>
                    {formatName(entry.name)} ({entry.score})
                  </div>
                </td>
                {gameMatchups.map((matchup, pickIndex) => {
                  const pick = entry.picks[pickIndex + 1];
                  return (
                    <td key={pickIndex} className="pick-cell">
                      <div className={`pick-container ${getPickClass(pick, correctTeams, incorrectTeams)}`}>
                        <span className="pick-team">{teamAbbreviations[pick] || pick}</span>
                      </div>
                    </td>
                  );
                })}
                <td className="score-prediction-cell">
                  {entry.scorePrediction.falcons} - {entry.scorePrediction.eagles}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
