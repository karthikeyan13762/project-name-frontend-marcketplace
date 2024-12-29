import React from "react";
import "../../../css/Login.css";
import { Link } from "react-router-dom";
function Login() {
  return (
    <div className="container-fluied vh-100 d-flex justify-content-center align-items-center">
      <div className="bg-white p-5 rounded register-form">
        <h2>Login</h2>
        <hr className="devider" />
        <form>
          <div className="input-feilds">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
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
            />
          </div>
          <div className="input-feilds">
            <input
              type="submit"
              value={"Button"}
              className="btn btn-success rounded-0"
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
