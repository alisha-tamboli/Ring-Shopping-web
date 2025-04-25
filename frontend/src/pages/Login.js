import React, { useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";


const Login = () => {
  // const [activePage, setActivePage] = useState(""); 
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Hardcoded Admin Credentials
  const adminCredentials = {
    email: "admin@gmail.com",
    password: "admin123"
  };

  
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (user.email === adminCredentials.email && user.password === adminCredentials.password) {
      alert("Admin login successful!");
      localStorage.setItem("role", "admin");
  
      console.log("Navigating to admin-dashboard");
      navigate("/adminDashboard");
    } 
    else {
      // Normal user authentication
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("User login successful!");
        localStorage.setItem("role", "user");
        localStorage.setItem("token", data.token);
        
        console.log("Navigating to /products"); // Debugging statement
        navigate("/products");
      } else {
        alert(data.message);
      }
    }
  };

  return (
    <div
    style={{
      backgroundImage: `url(${process.env.PUBLIC_URL}/images/womenring4.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      display: 'flex',
    }}
  >
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  );
};

export default Login;
