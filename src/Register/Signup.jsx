import React, { useState } from "react";
import axios from "axios";
import classes from "./register.module.css";
import { Link } from "react-router-dom";

export const Signup = (props) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const signupByPhone = async (event) => {
    console.log("entered");
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5050/auth/signup", {
        phone: phone,
        password: password,
      });
      console.log(response.data);
    } catch (err) {
      if (!err?.response) {
        console.log("No Server Response");
      } else if (err.response?.status === 409) {
        console.log("Username Taken");
      } else {
        console.log("Registration Failed");
      }
    }
  };

  return (
    <div className={classes.authFormContainer}>
      <h2>Register</h2>
      <form className={classes.registerForm}>
        <label htmlFor="phone">Phone</label>
        <input
          value={phone}
          type="tel"
          placeholder="+91-XXXXX-XXXXX"
          id="phone"
          pattern="[0-9]{5}-[0-9]{5}"
          name="phone"
          onChange={(e) => setPhone(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          type="password"
          placeholder="********"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signupByPhone}>Sign Up</button>
      </form>

      <button className={classes.linkBtn}>
        <Link to={"/login"}>Already have an account? Login here. </Link>
      </button>
    </div>
  );
};
