import React, { useEffect } from "react";
import Routing from "./Router.jsx";
import { useContext } from "react";
import { DataContext } from "./Components/DataProvider/DataProvider.jsx";
import { Type } from "./Utility/action.type.js";
import { auth } from "./Utility/fireBase.js";

function App() {
  const [{ user }, dispatch] = useContext(DataContext); // Accessing user state and dispatch function from DataContext

  useEffect(() => {
    // Setting up an authentication state listener
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // If a user is authenticated, dispatch the user object to the state
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        // If no user is authenticated, set user to null
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, [dispatch]); // Adding dispatch to the dependency array

  return (
    <>
      <Routing /> {/* Rendering the Routing component */}
    </>
  );
}

export default App;
