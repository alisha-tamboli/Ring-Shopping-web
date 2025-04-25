import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Products.css";
import Footer from "../components/Footer";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [message] = useState("");

    useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);


  return (
    <div className="products-container">
        <div className="product-list">
          {message && <p>{message}</p>}
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={`http://localhost:5000/${product.image}`}
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>₹ 
                <b>{product.price}</b></p>
              {/* <button
                  className="view-details"
                  onClick={() => navigate("/productDetails")}
                >
                  Buy Now
                </button> */}
                  {/* Use Link to navigate to ProductDetails page */}
            <Link to={`/product-details/${product._id}`}>
              <button className="view-details">Buy Now</button>
            </Link>
            </div>
          ))}
        </div>
            <Footer />
    </div>
      );
    };


export default Products;
