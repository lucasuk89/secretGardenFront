import React, { useState } from 'react';
import { Link, Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import './styles.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    Navigate("/api/login");
  };

  return (
    <div>
      <Router>
        <div>
          <nav>
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/register">Register</Link></li>
              {isLoggedIn ? (
                <>
                  <li><Link to="/dashboard">Dashboard</Link></li>
                  <li onClick={handleLogout}>Logout</li>
                </>
              ) : (
                <li><Link to="/login">Sign in</Link></li>
              )}
              
            </ul>
          </nav>
        </div>

        <Routes>
        <Route path="/" element={<Home />} />   
          <Route path="/home" element={<Home />} />   
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
