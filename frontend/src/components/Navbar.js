import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    setUserRole(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")}>Priceless</div>
      <ul className="nav-links">

      {userRole === "admin" && (
          <li onClick={() => navigate("/admindashboard")}>Admin Dashboard</li>
      )}
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/products")}>Products</li>
        <li onClick={() => navigate("/contact")}>Contact</li>
        <li onClick={() => navigate("/address")}>Address</li>

        {userRole ? (
          <li onClick={handleLogout}>Logout</li>
        ) : (
          <>
            <li onClick={() => navigate("/signup")}>Sign Up</li>
            <li onClick={() => navigate("/login")}>Login</li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
