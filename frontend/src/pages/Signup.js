import React, { useState } from "react";
import "./Auth.css"; // Create a CSS file to style
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Signup = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', user);
      console.log('User registered successfully');
      // Clear form fields by resetting state
      setUser({ name: '', email: '', password: '' });
      alert('Registered successfully');
      navigate('/login');
    } catch (err) {
      console.error('Error registering user', err);
      alert('Error registering user');
    }

  };
  return (
    <div
    style={{
      backgroundImage: `url(${process.env.PUBLIC_URL}/images/menring4.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      display: 'flex',
    }}
  >
    <div className="auth-container mt-5">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Signup</button>
      </form>
    </div>
    </div>

  );
};

export default Signup;
