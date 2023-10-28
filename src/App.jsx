import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import './styles.css';

/*I used the useState Hooks to create two states: isLoggedIn (to track whether the user is logged in)
and user (to store user information). 
Both start as false and null, respectively. */
function App() {
  /*This function is called when the user clicks the "Logout" button.
 It sets isLoggedIn to false, clears the user data stored in localStorage and sets user to null */

  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState();

  function handleLogout() {
    Cookies.remove('user');
    Cookies.remove('isLoggedIn');
    setIsLoggedIn(false);
    setUser(null);
  }

  useEffect(() => {
    if (!user || !isLoggedIn) {
    const userCookie = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    const isLoggedIn = Cookies.get('isLoggedIn')
      ? Cookies.get('isLoggedIn')
      : false;
      setUser(userCookie);
      setIsLoggedIn(isLoggedIn);
    }
  }, [user, isLoggedIn]);

  return (
    <div>
      <Router>
        <nav className='navbar'>
          <ul className='nav-list'>
            <li>
              <Link to='/home'>Home</Link>
            </li>
            {!isLoggedIn ? (
              <li>
                <Link to='/register'>Register</Link>
              </li>
            ) : null}
            {isLoggedIn ? (
              <>
                <li>
                  <Link to='/dashboard'>Dashboard</Link>
                </li>
                <li onClick={handleLogout}>
                  <Link to='/home'>Logout</Link>
                </li>
              </>
            ) : (
              <li>
                <Link to='/login'>Sign in</Link>
              </li>
            )}
            <li className='user-dropdown'>
              {isLoggedIn && user && user.name ? (
                <NavDropdown title={`Welcome, ${user.name}`}>
                  <NavDropdown.Item onClick={handleLogout}>
                    <Link to='/home'>Logout</Link>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : null}
            </li>
          </ul>
        </nav>

        {/*A little about the content of the page : Below the menu bar, we have the main content 
  of the page with titles, descriptions and an image section. */}
        <div>
          <div className='secretgardenTitle'>
            <h1 className='welcomeTitle'>Welcome to the Secret Garden</h1>
          </div>
          <p className='description'>Created by Lucas F.M</p>
          <h1>A great time to save your memories...or...</h1>
          <p>
            At the Secret Garden, you can store book titles and authors, as well
            as craft eerie narratives about your most mysterious and chilling
            secrets...
          </p>
        </div>
        <div className='containerImgandTitle'>
          <div className='image'>
            <img src='../public/fairyTale.jpeg' alt='Imagem' />
            <img src='../public/it.jpeg' alt='Imagem' />
            <img src='../public/holy.jpeg' alt='Imagem' />
            <img src='../public/billySummers.jpeg' alt='Imagem' />
          </div>
        </div>

        {/*These are our application routes, mapping paths to corresponding components.
       For example, "/home" leads to a component called Home, "/login" leads to a component called Login, etc. 
      The Dashboard component receives the user object as a property. */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/login'
            element={
              <Login
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setUser={setUser}
              />
            }
          />
          <Route
            path='/dashboard'
            element={<Dashboard/>} // Passe o objeto do usuário como uma prop
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
