import React from "react";
import "../../../css/Register.css";
import { Link } from "react-router-dom";
function Register() {
  return (
    <div className="container-fluied vh-100 d-flex justify-content-center align-items-center">
      <div className="bg-white p-5 rounded register-form">
        <h2>Register</h2>
        <hr className="devider" />
        <form>
          <div className="input-feilds">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              required
            />
          </div>
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
              Already have an account?{" "}
              <Link to="/login" className="link">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
