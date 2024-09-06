import React, { useState } from 'react';
import entriesData from './entries.sql';
import './SQLiteViewer.css';

function SQLiteViewer() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const runQuery = () => {
    if (query.toLowerCase().trim() === 'select * from entries') {
      const sanitizedEntries = entriesData.entries.map((entry, index) => ({
        id: `User ${entry.id}`,
        picks: entry.picks
      }));
      setResults(sanitizedEntries);
    } else {
      setResults([{ error: 'Only "SELECT * FROM entries" is supported' }]);
    }
  };

  return (
    <div className="sqlite-viewer">
      <h2>SQLite Viewer</h2>
      <textarea 
        value={query}
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Enter SQL query (only SELECT * FROM entries is supported)"
      />
      <button onClick={runQuery}>Run Query</button>
      <div className="results">
        {results.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Picks</th>
              </tr>
            </thead>
            <tbody>
              {results.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.id}</td>
                  <td>{JSON.stringify(entry.picks)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default SQLiteViewer;
