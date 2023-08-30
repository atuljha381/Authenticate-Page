/*
  https://www.youtube.com/watch?v=Y-XW9m8qOis - for login and register form
*/

import React, { useEffect, useState } from "react";
// import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import "./App.css";

import { Login } from "./Register/Login";
import { Signup } from "./Register/Signup";
import axios from "axios";
import Home from "./Home/Home";
import UserContext from "./contexts/userContext";

let token = localStorage.getItem("auth-token");
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkedIfLoggedIn = async () => {
      if (!token) {
        localStorage.setItem("auth-token", "");
        token = "";
        setUserData({
          token,
          undefined,
        });
        return;
      }
      try {
        const tokenResponse = await axios.post(
          `${process.env.BACKEND_URL}/auth/isTokenValid`,
          null,
          headers
        );

        if (tokenResponse.data) {
          const userRes = await axios.get(`${process.env.BACKEND_URL}/auth`, {
            headers: headers,
          });
          setUserData({
            token,
            user: userRes.data,
          });
        }
      } catch (err) {
        localStorage.setItem("auth-token", "");
        setUserData({
          token,
          undefined,
        });
      }
    };
    checkedIfLoggedIn();
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Routes>
          <Route path="/">
            <Route index element={<Navigate to={"login"} replace />} />
            <Route exact path="login" Component={Login} />
            <Route exact path="home" Component={Home} />
            <Route exact path="signup" Component={Signup} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
