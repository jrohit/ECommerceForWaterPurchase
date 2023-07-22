import React from "react";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";

const App = () => {
  return (
    <>
      <BrowserRouter>
        {/* Define the route for the login page */}
        <Routes>
          <Route path="/login" caseSensitive={true} element={<Login />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
        {/* Add other routes here if needed */}
      </BrowserRouter>
    </>
  );
};

export default App;
