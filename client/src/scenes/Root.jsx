import React from "react";
import Layout from "../layout/Layout";
import Signup from "../scenes/Signup";
import Login from "../scenes/Login";
import Dashboard from "../scenes/Dashboard";
import { Route, Routes, Navigate } from "react-router-dom";
import ChartRend from "./Chart";
import Orders from "./Orders";
import StockTransactionCard from "../layout/StockCard";
import Portfolio from "./Portfolio";

const Root = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chart" element={<ChartRend />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/stockbuy" element={<StockTransactionCard/>} />
          <Route path="/holdings" element={<Portfolio/>} />
        </Route>
      </Routes>
    </>
  );
};

export default Root;
