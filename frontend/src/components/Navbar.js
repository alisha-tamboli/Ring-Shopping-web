import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";
import { FaSearch } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
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

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
  
    try {
      // Make the request to the backend API to fetch search results
      const response = await axios.get(`http://localhost:5000/api/search?query=${encodeURIComponent(searchTerm)}`);
      
      // Navigate to the search results page with the fetched results and the search query
      navigate(`/search-results?q=${encodeURIComponent(searchTerm)}`, { 
        state: { 
          results: response.data, // Pass the data you got from the response
          searchQuery: searchTerm 
        } 
      });
    } catch (err) {
      console.error("Search error:", err);
      alert('Search failed. Please try again.');
    }
  };
  



  return (
    <div>
    <nav className="navbar">  
      <div className="logo" onClick={() => navigate("/")}>Priceless.com</div>

      <form onSubmit={handleSearch} className="nav-search">
        <input 
          type="text" 
          placeholder="Search products..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />      
        <button type="submit" className="search-icon">
          <FaSearch />
        </button>
      </form>
    </nav>



    <nav className="navbar2">
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
    </div>
  );
};

export default Navbar;
