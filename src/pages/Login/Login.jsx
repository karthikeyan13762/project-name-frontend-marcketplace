import React, { useEffect, useState } from "react";
import "../../../css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../apicalls/users";
import { SetLoader } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";

function Login() {
  const [email, setEmail] = useState(""); // To hold the email value
  const [password, setPassword] = useState(""); // To hold the password value

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the page from reloading on form submit
    try {
      dispatch(SetLoader(true)); //intialy setloader true once we gotthe response setloader falseeventhe catch block also false
      // Prepare the payload to be sent to the backend
      const payload = { email: email, password: password };

      // Call the LoginUser function from the API utility
      const response = await LoginUser(payload);

      dispatch(SetLoader(false));
      console.log(response.success);

      if (response.success) {
        localStorage.setItem("token", response.data);
        // window.location.href = "/"; -> this is blinking so we use useNavigate // lets check authorization i am navigating the user to home page by refreshing the normal page
        navigate("/");
        console.log(response.message);
        setEmail("");
        setPassword("");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      console.log(error);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  return (
    <div className="container-fluied vh-100 d-flex justify-content-center align-items-center">
      <div className="bg-white p-5 rounded register-form">
        <h2>Login</h2>
        <hr className="devider" />
        <form onSubmit={handleSubmit}>
          <div className="input-feilds">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)} // Set email value on change
              value={email}
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
              onChange={(e) => setPassword(e.target.value)} // Set password value on change
              value={password}
            />
          </div>
          <div className="input-feilds">
            <input
              type="submit"
              value={"Login"}
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
