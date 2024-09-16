import React from 'react';
import Header from '../Header/Header';  

// Define the LayOut functional component
function LayOut({ children }) {
  return (
    <div>
      {/* Render the Header component */}
      <Header />
      {/* Render the children components passed to LayOut */}
      {children}
    </div>
  );
}

export default LayOut;
