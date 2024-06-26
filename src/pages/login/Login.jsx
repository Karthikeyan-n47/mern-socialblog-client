import { Link } from "react-router-dom";
import "./login.css";
import { useState } from "react";
import axios from "../../axios";
// import { context } from "../../context/Context";
import { useDispatch } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../redux/user/userSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const { dispatch, isFetching } = useContext(context);
  // const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch({ type: "LOGIN_START" });
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });
      // console.log(res);
      // dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      dispatch(loginSuccess(res?.data));
      setError("");
    } catch (err) {
      // console.log(err);
      // dispatch({ type: "LOGIN_FAILURE" });
      dispatch(loginFailure(err.response.data));
      if (err.response) {
        setError(err?.response?.data);
      } else {
        setError("Something went wrong! Please try again!");
      }
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to={"/forgot-password"} className="link">
          <span className="loginForgotPassword"> Forgot Your Password?</span>
        </Link>
        <button className="loginButton" type="submit">
          Login
        </button>
        {error && <span className="loginError">Uh oh! {error}</span>}
      </form>
      <button className="loginRegisterButton">
        <Link to={"/register"} className="link">
          Register
        </Link>
      </button>
    </div>
  );
}
