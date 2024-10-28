import React, { useState, useEffect } from 'react';
import './Leaderboard.css';
import Week8entries from './Week8entrydata';

const Leaderboard = () => {
  const [sortedEntries, setSortedEntries] = useState([]);

  const games = [
    { id: 1, teams: ['MIN', 'LAR'], winner: 'LAR' },
    { id: 2, teams: ['BAL', 'CLE'], winner: 'CLE' },
    { id: 3, teams: ['PHI', 'CIN'], winner: 'PHI' },
    { id: 4, teams: ['GB', 'JAX'], winner: 'GB' },
    { id: 5, teams: ['ATL', 'TB'], winner: 'ATL' },
    { id: 6, teams: ['ARI', 'MIA'], winner: 'ARI' },
    { id: 7, teams: ['TEN', 'DET'], winner: 'DET' },
    { id: 8, teams: ['NYJ', 'NE'], winner: 'NE' },
    { id: 9, teams: ['IND', 'HOU'], winner: 'HOU' },
    { id: 10, teams: ['BUF', 'SEA'], winner: 'BUF' },
    { id: 11, teams: ['NO', 'LAC'], winner: 'LAC' },
    { id: 12, teams: ['KC', 'LV'], winner: 'KC' },
    { id: 13, teams: ['CHI', 'WAS'], winner: 'WAS' },
    { id: 14, teams: ['CAR', 'DEN'], winner: 'DEN' },
    { id: 15, teams: ['DAL', 'SF'], winner: 'SF' },
    { id: 16, teams: ['NYG', 'PIT'] },
  ];

  const abbreviateTeam = (teamName) => {
    const abbreviations = {
      'Minnesota Vikings': 'MIN',
      'Los Angeles Rams': 'LAR',
      'Baltimore Ravens': 'BAL',
      'Cleveland Browns': 'CLE',
      'Philadelphia Eagles': 'PHI',
      'Cincinnati Bengals': 'CIN',
      'Green Bay Packers': 'GB',
      'Jacksonville Jaguars': 'JAX',
      'Atlanta Falcons': 'ATL',
      'Tampa Bay Buccaneers': 'TB',
      'Arizona Cardinals': 'ARI',
      'Miami Dolphins': 'MIA',
      'Tennessee Titans': 'TEN',
      'Detroit Lions': 'DET',
      'New York Jets': 'NYJ',
      'New England Patriots': 'NE',
      'Indianapolis Colts': 'IND',
      'Houston Texans': 'HOU',
      'Buffalo Bills': 'BUF',
      'Seattle Seahawks': 'SEA',
      'New Orleans Saints': 'NO',
      'Los Angeles Chargers': 'LAC',
      'Kansas City Chiefs': 'KC',
      'Las Vegas Raiders': 'LV',
      'Chicago Bears': 'CHI',
      'Washington Commanders': 'WAS',
      'Carolina Panthers': 'CAR',
      'Denver Broncos': 'DEN',
      'Dallas Cowboys': 'DAL',
      'San Francisco 49ers': 'SF',
      'New York Giants': 'NYG',
      'Pittsburgh Steelers': 'PIT',
    };
    return abbreviations[teamName] || teamName;
  };

  const formatName = (fullName) => {
    const names = fullName.split(' ');
    if (names.length === 1) return names[0];
    
    return names.map((name, index) => {
      if (index === 0) return name; // Keep first name
      return name.charAt(0) + '.'; // Abbreviate other names
    }).join(' ');
  };

  useEffect(() => {
    const calculateScores = () => {
      return Week8entries.map(entry => {
        let score = 0;
        // Check each pick against the winners
        entry.picks.forEach((pick, index) => {
          const game = games[index];
          if (game.winner && abbreviateTeam(pick) === game.winner) {
            score++;
          }
        });
        return { ...entry, score };
      });
    };

    const sortEntries = (entries) => {
      return entries.sort((a, b) => {
        // First sort by score
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        // If scores are tied, sort alphabetically by name
        return a.name.localeCompare(b.name);
      });
    };

    const scoredEntries = calculateScores();
    const sorted = sortEntries(scoredEntries);
    setSortedEntries(sorted);
  }, []);

  return (
    <div className="leaderboard">
      <h2 className="leaderboard-title">Week 8 Leaderboard</h2>
      <div className="leaderboard-container">
        <div className="table-container">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th className="sticky-columns" colSpan="2">
                  <div className="header-container">
                    <div className="rank-header">#</div>
                    <div className="name-header">Player</div>
                  </div>
                </th>
                {games.map((game) => (
                  <th key={game.id} className="pick-header">
                    <div className="game-header">
                      <span className="matchup">{game.teams[0]} vs {game.teams[1]}</span>
                    </div>
                  </th>
                ))}
                <th className="prediction-header">DAL-SF</th>
              </tr>
            </thead>
            <tbody>
              {sortedEntries.map((entry, index) => (
                <tr key={index} className={`entry-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
                  <td className="sticky-columns" colSpan="2">
                    <div className="rank-column">{index + 1}</div>
                    <div className="name-score-container">
                      {formatName(entry.name)}
                      <div className="score-circle">{entry.score}</div>
                    </div>
                  </td>
                  {entry.picks.map((pick, pickIndex) => {
                    const game = games[pickIndex];
                    const pickAbbr = abbreviateTeam(pick);
                    let cellClass = 'pick-cell';
                    
                    if (game.winner) {
                      cellClass += pickAbbr === game.winner ? ' correct-pick' : ' incorrect-pick';
                    }
                    
                    return (
                      <td key={pickIndex} className={cellClass}>
                        {pickAbbr}
                      </td>
                    );
                  })}
                  <td className="prediction-cell">
                    {entry.cowboys}-{entry.niners}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
