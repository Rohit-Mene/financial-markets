import React from "react";
import Layout from "../layout/Layout";
import Signup from "../scenes/Signup";
import Login from "../scenes/Login";
import Dashboard from "../scenes/Dashboard";
import { Route, Routes, Navigate } from "react-router-dom";

const Root = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
};

export default Root;
