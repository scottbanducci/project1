// src/CSVDataContext.js
import { createContext, useState } from 'react';

export const CSVDataContext = createContext();

export const CSVDataProvider = ({ children }) => {
  const [csvData, setCsvData] = useState(null);

  return (
    <CSVDataContext.Provider value={{ csvData, setCsvData }}>
      {children}
    </CSVDataContext.Provider>
  );
};
