import React, { useState, useEffect } from 'react';
import initSqlJs from 'sql.js';
import { createDbWorker } from 'sql.js-httpvfs';

const workerUrl = new URL('sql.js-httpvfs/dist/sqlite.worker.js', import.meta.url);
const wasmUrl = new URL('sql.js-httpvfs/dist/sql-wasm.wasm', import.meta.url);

function SQLiteViewer() {
  const [db, setDb] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function initDB() {
      const worker = await createDbWorker(
        [{ from: 'inline', config: { serverMode: 'full', url: '/path/to/your/database.sqlite' } }],
        workerUrl.toString(),
        wasmUrl.toString()
      );
      setDb(worker);
    }
    initDB();
  }, []);

  const runQuery = async (query) => {
    if (db) {
      const result = await db.db.exec(query);
      setResults(result);
    }
  };

  return (
    <div>
      <h2>SQLite Viewer</h2>
      <textarea onChange={(e) => runQuery(e.target.value)} placeholder="Enter SQL query" />
      <div>
        {results.map((result, i) => (
          <table key={i}>
            <thead>
              <tr>
                {result.columns.map((column, j) => (
                  <th key={j}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.values.map((row, k) => (
                <tr key={k}>
                  {row.map((cell, l) => (
                    <td key={l}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
}

export default SQLiteViewer;
