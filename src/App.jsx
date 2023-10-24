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

        <div>
          <div className='secretgardenTitle'>
            <h1 className='welcomeTitle'>Welcome to the Secret Garden</h1>
          </div>
          <p className='description'>Created by Lucas F.M</p>
          <h1>A great time to save your memories...or...</h1>
          <p>At the Secret Garden, you can store book titles and authors, as well as craft eerie narratives about your most mysterious and chilling secrets...</p>
        </div>
        
        <div className="containerImgandTitle">
       
        <div className="image">
          <img src="../public/fairyTale.jpeg" alt="Imagem" />
          <img src="../public/it.jpeg" alt="Imagem" />
          <img src="../public/holy.jpeg" alt="Imagem" />
          <img src="../public/billySummers.jpeg" alt="Imagem" />
        </div>
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
