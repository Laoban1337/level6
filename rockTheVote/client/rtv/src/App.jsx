import React, { useContext } from "react";
import Home from "./components/Home";
import Login from "./components/Profile.jsx";
import Comment from "./components/Public.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { UserContext } from "./context/UserProvider.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

import "./App.css";

export default function App() {
  const { token, logout } = useContext(UserContext);

  return (
    <div className="app">
      {token && <Navbar logout={logout} />}
      <Routes>
        <Route path="/" element={token ? <Navigate to="/login" /> : <Home />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute token={token} redirectTo="/">
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/public"
          element={
            <ProtectedRoute token={token} redirectTo="/">
              <Comment />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
