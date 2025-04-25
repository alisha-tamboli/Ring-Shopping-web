import React from "react";
import "./Hero.css";
import ringsImage from "../assets/img2.jpg"; // Ensure this image is placed inside src/assets
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate(); // Hook for navigation

  const handleExploreClick = () => {
    navigate("/products"); // Redirect to login page
  };


  return (
    <section className="hero">
     
     <h1>Our Priceless Collection</h1>

      <div className="hero-image">
        <img src={ringsImage} alt="Rings Collection" />
      </div>

      <div className="hero-text">
        
        <p>
          The jewelry you didn't know you needed until now.
          Sweat-proof, waterproof, and sustainable!
        </p>
        <button  onClick={handleExploreClick} className="explore-btn">Explore Now</button>
      </div>
    </section>
  );
}

export default Hero;
