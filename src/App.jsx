/*These were the essential imports for building App.jsx, 
as they provided me with functionalities such as state management, routing,
styles and user interactions. Each one plays an important role in the creation of app.jsx */
import { useState, useEffect } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Link, Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import Login from './components/Login/Login'
import Register from './components/Register/Register';
import './styles.css';


/*I used the useState Hooks to create two states: isLoggedIn (to track whether the user is logged in)
and user (to store user information). 
Both start as false and null, respectively. */
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

/*This function is called when the user clicks the "Logout" button.
 It sets isLoggedIn to false, clears the user data stored in localStorage and sets user to null */
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    setUser(null);
  };


  /*We used the useEffect hook to check if there is a user stored in the localStorage 
  when the application is loaded. If there is a user stored, it sets the user state with
   this information and isLoggedIn to true. */
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
    }
  }, []);

/*About the Navigation and Menu Bar part: React Router (BrowserRouter and Routes)
was used to manage the navigation between the pages within our application. 
The menu bar is defined in the nav with links to different routes, such as 
"Home", "Register", "Dashboard" and "Login". 
   
We also apply Conditions: A conditional rendering was performed which was used to show different
menu items and options based on the user's login status. If the user is logged in (represented by isLoggedIn),
the "Dashboard" and "Logout" links are displayed. Otherwise, the "Sign in" link is shown.
 */
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

  {/*A little about the content of the page : Below the menu bar, we have the main content 
  of the page with titles, descriptions and an image section. */}
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
        
        {/*These are our application routes, mapping paths to corresponding components.
       For example, "/home" leads to a component called Home, "/login" leads to a component called Login, etc. 
      The Dashboard component receives the user object as a property. */}
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
