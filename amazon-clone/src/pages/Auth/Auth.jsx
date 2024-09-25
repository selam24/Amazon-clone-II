import React, { useState, useContext } from "react";
import classes from "./SignUp.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import amazon2 from "../../assets/images/Amazon-Logo-2000-present-1024x576.jpeg";
import { auth } from "../../Utility/fireBase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {DataContext} from "../../Components/DataProvider/DataProvider"
import { Type } from "../../Utility/action.type";
import { ClipLoader } from "react-spinners";

function Auth() {
  // State variables for email, password, error messages, and loading status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [{ user }, dispatch] = useContext(DataContext); // Accessing user context
  const [Loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });
  const navigate = useNavigate(); // For navigation after auth
  const navStateData = useLocation(); // To access navigation state data

  const authHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (e.target.name === "signin") {
      // Sign-in logic
      setLoading({ ...Loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER, // Dispatch user data to context
            user: userInfo.user,
          });
          setLoading({ ...Loading, signIn: false });
          navigate(navStateData?.state?.redirect || "/"); // Redirect after successful sign-in
        })
        .catch((err) => {
          setError(err.message); // Set error message on failure
          setLoading({ ...Loading, signIn: false });
        });
    } else {
      // Sign-up logic
      setLoading({ ...Loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER, // Dispatch user data to context
            user: userInfo.user,
          });
          setLoading({ ...Loading, signUp: false });
          navigate(navStateData?.state?.redirect || "/"); // Redirect after successful sign-up
        })
        .catch((err) => {
          setError(err.message); // Set error message on failure
          setLoading({ ...Loading, signUp: false });
        });
    }
  };

  return (
    // <LayOut>
    <section className={classes.login}>
      {/* Logo */}
      <Link to={"/"}>
        <img src={amazon2} alt="amazon logo" />
      </Link>
      {/* Form for authentication */}
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {/* Displaying navigation state message if available */}
        {navStateData?.state?.message && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.message}
          </small>
        )}
        <form action="">
          {/* Email input field */}
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          {/* Password input field */}
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          {/* Sign In button */}
          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={classes.login_signInButton}
          >
            {Loading.signIn ? (
              <ClipLoader color="#000" size={15} /> // Loader while signing in
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <p>
          By signing-in you agree to the Amazon Fake clone conditions of use &
          sale. Please see our privacy notice, our cookies notice, and our
          interest-based ads notice.
        </p>

        {/* Sign Up button */}
        <button
          type="submit"
          onClick={authHandler}
          name="signup"
          className={classes.login_registerButton}
        >
          {Loading.signUp ? (
            <ClipLoader color="#000" size={15} /> // Loader while signing up
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {/* Displaying error messages if any */}
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
    // </LayOut>
  );
}

export default Auth;