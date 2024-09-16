
// Import React and necessary hooks for context and state management
import React, { createContext, useReducer } from "react";

// Create a Context object for managing global state
export const DataContext = createContext();

// Define the DataProvider component to provide state to its children
export const DataProvider = ({ children, reducer, initialState }) => {
  return (
    <DataContext.Provider value={useReducer(reducer, initialState)}>
      {/* Render children components and provide them access to the context */}
      {children}
    </DataContext.Provider>
  );
};
