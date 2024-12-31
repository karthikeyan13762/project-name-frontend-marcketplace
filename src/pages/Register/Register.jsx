import React, { useState } from "react";
import "../../../css/Register.css";
import { Link } from "react-router-dom";
import { RegisterUser } from "../../apicalls/users";
function Register() {
  const [name, setName] = useState(""); // To store name input
  const [email, setEmail] = useState(""); // To store email input
  const [password, setPassword] = useState(""); // To store password input
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    try {
      // Prepare the payload to send to the backend
      const payload = { name: name, email: email, password: password };
      console.log(payload);

      // Call the RegisterUser function from the API utility
      const response = await RegisterUser(payload);

      // Handle the response (e.g., show a success message, or handle error)
      console.log(response);

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log({ Error: error.message });
    }
  };
  return (
    <div className="container-fluied vh-100 d-flex justify-content-center align-items-center">
      <div className="bg-white p-5 rounded register-form">
        <h2>Register</h2>
        <hr className="devider" />
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
            />
          </div>
          <div className="input-feilds">
            <input
              type="submit"
              value={"Register"}
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
