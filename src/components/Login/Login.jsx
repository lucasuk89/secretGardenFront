/*imports: I imported the libraries needed for the page, using Axios to make HTTP requests,
 React's useState to handle local states,
  react-router-dom's useNavigate to navigate between routes and other dependencies.*/

import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import Cookies from 'js-cookie';


/*
We use (props) to pass information from a parent component to a child component.
We used backgroundStyle, which is an object that contains CSS styles
to define the background of the component, to include a new learning I had these days
and apply it here in the project. In this case, it defines a background image*/
function Login({ setUser, setIsLoggedIn }) {
  const backgroundStyle = {
    backgroundImage: 'url("../../../public/leafs.png")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  /*I used React's useState to create a local state for me called formData. 
  This state stores the values of the email and password that the user will enter.*/
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });


  //We use the (const navigate) it to redirect the user to the "/dashboard" route after a successful login:
  const navigate = useNavigate();


  /*The handleChange function is a function that has been defined to handle these change events. 
  It is called every time one of these events occurs.
  Also ,the  const { name, value } = e.target; is used to extract the name attribute 
  and the current value from the event input field.
  setFormData updates the local formData state. 
  It creates a new object that includes all the existing values in formData
  then replaces the value of the specified key (which is the name extracted from the field) with the new value
   (which is the value extracted from the field).
  */
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

    /*Submitting the form :When the user submits the login form, the handleLogin function is triggered.
   It makes a POST request to the server using Axios, sending the email and password provided.
    If the request is successful, the user is stored in cookies and also in the application's global state. */
  function handleLogin(e) {
    e.preventDefault();
    axios.post("http://localhost:3000/api/login", {
      email: formData.email,
      password: formData.password
    }).then((result) => {
      localStorage.setItem("user", JSON.stringify(result.data.user));
      localStorage.setItem("isLoggedIn", true);
      Cookies.set("user", result.data.user);
      Cookies.set("isLoggedIn", true);

      setUser(result.data.user);
      setIsLoggedIn(true);
      navigate("/dashboard");
    }).catch(err => {
      if (err.response.status === 401) {
        alert("Incorrect email or password");
      }
    });
  } 

  /*Retrieving Cookie Data: We will check whether user data exists
   and whether the user is logged in by reading the cookies. 
  If they exist, the user and isLoggedIn state will be set based on these stored values. */
  const storedUser = Cookies.get("user");
  const isLoggedIn = Cookies.get("isLoggedIn");
  
  if (storedUser && isLoggedIn) {
    setUser(storedUser);
    setIsLoggedIn(true);
  }
  
/*Component rendering: Here we are rendering the login component with a form
 and input fields for email and password. 
When the form is submitted, the handleLogin function is called. */
  return (
    <div style={backgroundStyle}>
      <div className={styles['login-container']} >
        <form className={styles['login-form']} onSubmit={handleLogin}>
          <h1>Login</h1>
          <label htmlFor='email'>Email:</label>
          <input type="email" name='email' id='em1' onChange={handleChange} value={formData.email} />
          <label htmlFor='password'>Password:</label>
          <input type="password" name="password" id='pass1' onChange={handleChange} value={formData.password} />
          <input type="submit" value="Log in" />
        </form>
      </div>
      <footer className="footer registerBackground">
        <div className="footer-section homeBackgroundRed">
          <div className="section-content">
            <h2>Make your Register</h2>
            <p>To create your account</p>
          </div>
        </div>
        <div className="footer-section homeBackgroundBlue">
          <div className="section-content ">
            <h3>Make your Login</h3>
            <p>You will have your user with your datas.</p>
          </div>
        </div>
        <div className="footer-section homeBackgroundYellow">
          <div className="section-content">
            <h3>Save Your Books</h3>
            <p>Names, Authors and Make a comment...</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

//Here we are exporting the login for use elsewhere.
export default Login;
