import React, { useEffect, useState } from "react";
import "../../../css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { GetCurrentUser, LoginUser } from "../../apicalls/users";
import { SetLoader } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";
import { SetUser } from "../../redux/userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    dispatch(SetLoader(true));

    try {
      const payload = { email: email, password: password };

      const response = await LoginUser(payload);

      if (response.success) {
        localStorage.setItem("token", response.data);

        const userResponse = await GetCurrentUser();
        if (userResponse.success) {
          dispatch(SetUser(userResponse.data));
          navigate("/");
        } else {
          setError(userResponse.message || "Failed to fetch user data.");
        }
      } else {
        setError(response.message || "Login failed.");
      }
    } catch (error) {
      setError(error.message || "An unexpected error occurred.");
    } finally {
      dispatch(SetLoader(false));
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="container-fluied vh-100 d-flex justify-content-center align-items-center">
      <div className="bg-white p-5 rounded register-form">
        <h2>Login</h2>
        <hr className="devider" />

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-feilds">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              maxLength={25}
            />
          </div>
          <div className="input-feilds">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              maxLength={25}
            />
          </div>
          <div className="input-feilds">
            <input
              type="submit"
              value={"Login"}
              className="btn btn-primary rounded-0"
            />
            <span className="already-register ">
              Don't have an account?{" "}
              <Link to="/register" className="link">
                Register
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
