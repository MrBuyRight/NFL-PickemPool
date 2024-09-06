const entries = [
  {
    id: 1,
    name: 'Aj',
    phoneNumber: '5593659522',
    picks: {
      "1": "Baltimore Ravens",
      "2": "Philadelphia Eagles",
      "3": "Pittsburgh Steelers",
      // ... other picks
    }
  },
  {
    id: 2,
    name: 'Alan Black',
    phoneNumber: '7346121090',
    picks: {
      "1": "Kansas City Chiefs",
      "2": "Philadelphia Eagles",
      "3": "Atlanta Falcons",
      // ... other picks
    }
  },
  // ... other entries
];

export default {
  entries,
  addEntry: (name, phoneNumber, picks) => {
    const newEntry = {
      id: entries.length + 1,
      name,
      phoneNumber,
      picks
    };
    entries.push(newEntry);
  },
  getAllEntries: () => entries,
  getEntryById: (id) => entries.find(entry => entry.id === id)
};