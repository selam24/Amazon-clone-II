import React from 'react'
import {FadeLoader} from 'react-spinners'

// Define the Loader functional component
function Loader() {
  return (
    <div 
      style={{
        display: "flex",            // Use flexbox for layout
        alignItems: "center",       // Center items vertically
        justifyContent: "center",   // Center items horizontally
        height: "50vh"               // Set the height to 50% of the viewport height
      }}
    >
      <FadeLoader color='#36d7b' />
    </div>
  );
}

export default Loader;
