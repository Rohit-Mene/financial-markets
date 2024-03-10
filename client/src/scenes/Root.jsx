import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import Signup from "../scenes/Signup";
import Login from "../scenes/Login";
import Dashboard from "../scenes/Dashboard";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

const Root = () => {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  // const checkLoginStatus = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5001/api/auth/user", {
  //       withCredentials: true,
  //     });

  //     //setIsLoggedIn(response.data.isLoggedIn);
  //   } catch (error) {
  //     console.error("Failed to check login status", error);
  //   }
  // };
  // useEffect(() => {
  //   checkLoginStatus();
  // }, []);

  // const handleLogout = async () => {
  //   try {
  //     await axios.get(
  //       "http://localhost:5001/api/logout",
  //       {},
  //       { withCredentials: true }
  //     );
  //     setIsLoggedIn(false);
  //     navigate("/login", { state: { isLoggedIn:{isLoggedIn}, handleLogin:{handleLogin} } });
  //   } catch (error) {
  //     console.error("Logout failed", error);
  //   }
  // };
  // const handleLogin = async () => {
  //   try {
  //     // const response = await axios.get("http://localhost:5001/api/auth/user", {
  //     //   withCredentials: true,
  //     // });
  //     setIsLoggedIn(true);
  //     navigate("/dashboard", { state: { isLoggedIn, handleLogout} });
      
  //   } catch (error) {
  //     console.error("Failed to check login status", error);
  //   }
  // };
  return (
    <>
      <Routes>
        <Route
          element={
            <Layout
            />
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={<Dashboard/>}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login/>} />
        </Route>
      </Routes>
    </>
  );
};

export default Root;
