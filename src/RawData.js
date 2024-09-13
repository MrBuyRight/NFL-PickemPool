import React from 'react';
import entriesData from './entriesData';

function RawData() {
  return (
    <div>
      <h2>Raw Entries Data</h2>
      <pre>{JSON.stringify(entriesData, null, 2)}</pre>
    </div>
  );
}

export default RawData;
