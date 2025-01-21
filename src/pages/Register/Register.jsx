import React, { useEffect, useState } from "react";
import "../../../css/Register.css";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loaderSlice";
function Register() {
  const [name, setName] = useState(""); // To store name input
  const [email, setEmail] = useState(""); // To store email input
  const [password, setPassword] = useState(""); // To store password input
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    setError("");
    dispatch(SetLoader(true));
    try {
      // Prepare the payload to send to the backend
      const payload = { name: name, email: email, password: password };

      // Call the RegisterUser function from the API utility
      const response = await RegisterUser(payload);

      dispatch(SetLoader(false));
      // Handle the response (e.g., show a success message, or handle error)
      if (response.success) {
        navigate("/login");
      } else {
        setError(response.message || "Registration failed.");
      }
    } catch (error) {
      dispatch(SetLoader(false));
      return error.message;
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
        <h2>Register</h2>
        <hr className="devider" />
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-feilds">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              required
              onChange={(e) => setName(e.target.value)} // Update name value on change
              value={name}
              maxLength={25}
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
              onChange={(e) => setEmail(e.target.value)} // Update email value on change
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
              onChange={(e) => setPassword(e.target.value)} // Update password value on change
              value={password}
              maxLength={25}
            />
          </div>
          <div className="input-feilds">
            <input
              type="submit"
              value={"Register"}
              className="btn btn-primary rounded-0"
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
