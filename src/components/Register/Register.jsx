import axios from 'axios';
import { useState } from 'react';
import styles from './Register.module.css';


function Register() {


  const backgroundStyle = {
    backgroundImage: 'url("/images/homeImage.png")', // Substitua pelo caminho real da sua imagem
    backgroundSize: 'cover', // Torna a imagem de fundo responsiva
    backgroundRepeat: 'no-repeat',
  };
  


const[formData,setFormData]= useState({
    name:'',
    email:'',
    password:''
});



/*we used to extract the name and value properties from the e.target object, 
representing the element that activated the change event,
that we usually place in the form field.

...formData creates a copy of the formData state object. 
This is done to ensure that it doesn't change the original state object,
 but rather creates a new copy with the updates.
 
 [name]: value updates the name property on the formData object with the value value*/

function handleChange(e){
    const {name,value} = e.target;
    setFormData({
        ...formData,
        [name]:value
    });
}


function handleSubmit(e){
   e.preventDefault();
   axios.post('http://localhost:3000/api/register',
   { name:formData.name.trim(),
    email:formData.email.trim(),
    password:formData.password}).then(res=>{
        if(res.data.status == "1"){
            alert("Existing user, try another email");
        }else{
            alert("User created, redirecting to login");
            location.replace('/login');
        }
    }).catch(error=>{
        console.log("Error in the request:"+error);
    })
}

return (
    <div style={backgroundStyle}>
    <div className={styles['register-container']}>
      <form className={styles['register-form']} onSubmit={handleSubmit}>
        <h1>Register</h1>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="nam1" required onChange={handleChange} />

        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="em1" required onChange={handleChange} />

        <label htmlFor="contrasena">Password:</label>
        <input type="password" name="password" id="pass1" required onChange={handleChange} />

        <input type="submit" value="Register" />
      </form>
    </div></div>
  );
}

export default Register;