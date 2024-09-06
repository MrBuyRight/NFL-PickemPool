import React from 'react';
import GameSelectionList from './GameSelectionList';
import PickTracker from './PickTracker';

function Home() {
  // Move your existing home page logic and state here
  return (
    <div>
      <h1>NFL Pickem Pool</h1>
      <GameSelectionList />
      <PickTracker />
      {/* Add other components from your original home page */}
    </div>
  );
}

export default Home;
