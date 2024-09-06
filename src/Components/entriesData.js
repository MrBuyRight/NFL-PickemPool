const entries = [
  {
    id: 1,
    name: 'User 1',
    picks: {
      "1": "Baltimore Ravens",
      "2": "Philadelphia Eagles",
      "3": "Pittsburgh Steelers",
      "4": "Buffalo Bills",
      "5": "Chicago Bears",
      "6": "Cincinnati Bengals",
      "7": "Indianapolis Colts",
      "8": "Miami Dolphins",
      "9": "New Orleans Saints",
      "10": "New York Giants",
      "11": "Los Angeles Chargers",
      "12": "Seattle Seahawks",
      "13": "Cleveland Browns",
      "14": "Tampa Bay Buccaneers",
      "15": "Detroit Lions",
      "16": "San Francisco 49ers"
    }
  },
  {
    id: 2,
    name: 'User 2',
    picks: {
      "1": "Kansas City Chiefs",
      "2": "Green Bay Packers",
      "3": "Atlanta Falcons",
      "4": "Arizona Cardinals",
      "5": "Tennessee Titans",
      "6": "New England Patriots",
      "7": "Houston Texans",
      "8": "Jacksonville Jaguars",
      "9": "Carolina Panthers",
      "10": "Minnesota Vikings",
      "11": "Las Vegas Raiders",
      "12": "Denver Broncos",
      "13": "Dallas Cowboys",
      "14": "Washington Commanders",
      "15": "Los Angeles Rams",
      "16": "New York Jets"
    }
  },
  // Add more entries as needed
];

export default {
  entries,
  addEntry: (name, picks) => {
    const newEntry = {
      id: entries.length + 1,
      name,
      picks
    };
    entries.push(newEntry);
  },
  getAllEntries: () => entries,
  getEntryById: (id) => entries.find(entry => entry.id === id)
};
