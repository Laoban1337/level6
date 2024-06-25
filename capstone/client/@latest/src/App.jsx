import { useContext } from "react";
import { UserContext } from "./context/UserProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Public from "./components/Public";
import RegisterForm from "./components/RegisterForm";
import "./App.css";

function App() {
  const { token, logout } = useContext(UserContext);

  return (
    <div>
      {token && <Navbar logout={logout} />}
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/profile" /> :<RegisterForm /> }
        />
        <Route 
          path="/profile"
          element={
            <ProtectedRoute token={token} redirectTo="/">
             <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/public"
          element={
            <ProtectedRoute token={token} redirectTo="/">
              <Public />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
