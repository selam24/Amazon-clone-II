import React, { useState, useContext } from "react";
import classes from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [{user}, dispatch] = useContext(DataContext);
  const [Loading, setLoading] = useState({
    signIn: false,
    signUp: false
  });
  const navigate = useNavigate()
  //  console.log(user)

  const authHandler = async (e) => {
    e.preventDefault();
    if (e.target.name === "signin") {
      setLoading({...Loading, signIn:true})
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type:Type.SET_USER,
            user: userInfo.user
          })
          setLoading({...Loading, signIn:false})
          navigate('/')
        })
        .catch((err) => {
          setError(err.message)
          setLoading({ ...Loading, signIn: false });
        });
    } else {
      setLoading({ ...Loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
           dispatch({
             type: Type.SET_USER,
             user: userInfo.user,
           });
           setLoading({ ...Loading, signUp: false });
           navigate("/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...Loading, signUp: false });
        });
    }
  };

  return (
    // <LayOut>
    <section className={classes.login}>
      {/* logo */}
      <Link to={"/"}>
        <img src={amazon2} alt="amazon logo" />
      </Link>
      {/* form */}
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={classes.login_signInButton}
          >
            {Loading.signIn ? (
              <ClipLoader color="#000" size={15}></ClipLoader>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <p>
          By signing-in you agree to the Amazon Fake clone condition of use &
          sale. please see our privacy Notice, our Cookies Notice and our
          Interest-Based ADs Notice.
        </p>

        <button
          type="submit"
          onClick={authHandler}
          name="signup"
          className={classes.login_registerButton}
        >
          {Loading.signUp ? (
            <ClipLoader color="#000" size={15}></ClipLoader>
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
    // </LayOut>
  );
}

export default Auth;
