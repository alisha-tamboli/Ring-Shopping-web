import React from "react";
import { Routes, Route } from "react-router-dom"; // use Routes and Route from react-router-dom v6
import Navbar from "./components/Navbar";
import Address from "./components/Address";
import Home from "./components/Home";
import Products from "./pages/Products";
import Contact from "./components/Contact";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ProductDetails from "./pages/ProductDetails"; 
import Checkout from "./pages/Checkout";
import SearchResults from "./pages/SearchResults";
import PaymentOptions from "./pages/PaymentOptions";

function App() {
  const userRole = localStorage.getItem("role");

  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/address" element={<Address />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route
            path="/adminDashboard"
            element={userRole === "admin" ? <AdminDashboard /> : <Home />}
          />
          {/* Product Details Route */}
          <Route path="/product-details/:productId" element={<ProductDetails />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/paymentOptions" element={<PaymentOptions />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
