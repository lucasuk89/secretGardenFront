import { useState, useEffect } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import './styles.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    setUser(null);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <Router>
        <nav className="navbar">
          <ul className="nav-list">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/register">Register</Link></li>
            {isLoggedIn ? (
              <>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li onClick={handleLogout}><Link to="/login">Logout</Link></li>
              </>
            ) : (
              <li><Link to="/login">Sign in</Link></li>
            )}
            <li className="user-dropdown">
              {user && isLoggedIn && (
                <NavDropdown title={`Welcome, ${user.name}`}>
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              )}
            </li>
          </ul>
        </nav>

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
          <Route path="/login" element={<Login setUser={setUser} setIsLoggedIn={setIsLoggedIn} />} />
          <Route
            path="/dashboard"
            element={<Dashboard user={user} />} // Passe o objeto do usuário como uma prop
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
