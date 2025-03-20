import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";


const Login = () => {
  return (
    <div>
      <h2>Login with Google</h2>
      <a href="http://localhost:5000/auth/google">
        <button>Login with Google</button>
      </a>
    </div>
  );
};

const Dashboard = ({ user }) => {
  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>
      <a href="http://localhost:5000/auth/logout">
        <button>Logout</button>
      </a>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/auth/user", { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
