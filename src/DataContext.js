import React, { createContext, useContext } from 'react';
import entriesData from './Components/entriesData';

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  return (
    <DataContext.Provider value={{ entriesData }}>
      {children}
    </DataContext.Provider>
  );
}
