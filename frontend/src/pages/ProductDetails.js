import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { productId } = useParams(); // Get productId from URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!product) return <h2>Loading...</h2>;

  return (
    <div className="product-details-container">
       <img
        src={`http://localhost:5000/${product.image}`}
        alt={product.name}
        className="product-image"
        />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <h3 className="product-price">₹ {product.price}</h3>
      <button className="buy-now">Buy Now</button>
    </div>
  );
};

export default ProductDetails;

