import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Leaderboard from './Components/Leaderboard';
import './App.css'; // Make sure you have this if you're using App-specific styles

function App() {
  const [entriesData, setEntriesData] = useState([]);

  useEffect(() => {
    // Fetch entries data from your API or data source
    const fetchEntriesData = async () => {
      try {
        const response = await fetch('YOUR_API_ENDPOINT');
        const data = await response.json();
        setEntriesData(data);
      } catch (error) {
        console.error('Error fetching entries data:', error);
      }
    };

    fetchEntriesData();
  }, []);

  return (
    <div className="App">
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Helmet>
      <h1>NFL Pick'em Pool</h1>
      <Leaderboard entriesData={entriesData} />
    </div>
  );
}

export default App;
