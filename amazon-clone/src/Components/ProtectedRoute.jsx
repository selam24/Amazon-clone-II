import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "./DataProvider/DataProvider";

const ProtectedRoute = ({ children, message, redirect }) => {
  const navigate = useNavigate(); // Getting the navigate function from react-router
  const [{ user }, dispatch] = useContext(DataContext); // Accessing user data from context

  useEffect(() => {
    // Effect to check if the user is authenticated
    if (!user) {
      // If no user is found, navigate to the authentication page
      navigate("/auth", { state: { message, redirect } });
    }
  }, [user, navigate, message, redirect]); // Dependency array includes necessary variables

  return children; // If user is authenticated, render the children components
};

export default ProtectedRoute; // Exporting the ProtectedRoute component
