import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState(state?.results || []);
  const [searchQuery, setSearchQuery] = useState(state?.searchQuery || searchParams.get("q") || "");
  const [loading, setLoading] = useState(!state?.results);
  const [error, setError] = useState("");

  useEffect(() => {
    if (state?.results) return; // Skip fetching if we already have results in state

    const fetchResults = async () => {
      if (!searchQuery.trim()) return;

      try {
        setLoading(true);
        const response = await axios.get(`/api/search?query=${encodeURIComponent(searchQuery)}`);
        setResults(response.data);
      } catch (err) {
        setError("Failed to fetch search results.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchQuery, state]); // This effect runs on page load or when `searchQuery` or `state` changes

  return (
    <div className="container">
      <h2>Search Results for "{searchQuery}"</h2>
      
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : results.length > 0 ? (
        <div className="product-grid">
          {results.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <p className="description">{product.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>No products found matching your search.</p>
          <p>Try different keywords or check back later.</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
