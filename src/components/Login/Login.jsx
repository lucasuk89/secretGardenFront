import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {
  const backgroundStyle = {
    backgroundImage: 'url("/images/homeImage.png")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    axios.post("http://localhost:3000/api/login", {
      email: formData.email,
      password: formData.password
    }).then(() => {
      alert("Login successfully completed");
      setIsLoggedIn(true); // Define o estado como logado
      navigate("/dashboard");
    }).catch(err => {
      if (err.response.status === 401) {
        alert("Incorrect email or password");
      }
    });
  }

  function handleLogout() {
    // Redirecione o usuário de volta para a tela de login
    setIsLoggedIn(false); //Aqui eu to colocando o usuario como deslogado
    navigate("api/login");
  }

  return (
    <div style={backgroundStyle}>
      <div className={styles['login-container']} >
        <form className={styles['login-form']} onSubmit={handleLogin}>
          <h1>{isLoggedIn ? 'Logout' : 'Log in'}</h1>
          <label htmlFor='email'>Email:</label>
          <input type="email" name='email' id='em1' onChange={handleChange} value={formData.email} />

          <label htmlFor='password'>Password:</label>
          <input type="password" name="password" id='pass1' onChange={handleChange} value={formData.password} />

          <input type="submit" value={isLoggedIn ? 'Logout' : 'Log in'} />
        </form>

        {isLoggedIn ? (
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Login;
