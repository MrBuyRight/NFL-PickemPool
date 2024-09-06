import React from 'react';
import entriesData from './entriesData';

const EntriesList = () => {
  return (
    <div>
      <h2>Entries List</h2>
      <ul>
        {entriesData.map((entry) => (
          <li key={entry.id}>
            {entry.name} - {entry.phoneNumber}
            <ul>
              {Object.entries(entry.picks).map(([week, team]) => (
                <li key={week}>Week {week}: {team}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntriesList;
