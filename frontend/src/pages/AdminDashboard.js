import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditFormId, setShowEditFormId] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: "", description: "", price: "", image: null });
  const [editProduct, setEditProduct] = useState({ name: "", description: "", price: "" });
  const [message, setMessage] = useState("");

  // 👇 Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/home");
  };

  const handleInputChange = (e) => setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  const handleImageChange = (e) => setNewProduct({ ...newProduct, image: e.target.files[0] });

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("price", newProduct.price);
    formData.append("image", newProduct.image);

    try {
      const response = await fetch("http://localhost:5000/api/addProduct", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const updatedProducts = await fetch("http://localhost:5000/api/products");
        const data = await updatedProducts.json();
        setProducts(data);
        setMessage("✅ Product added successfully!");
        setNewProduct({ name: "", description: "", price: "", image: null });
        setShowAddForm(false);
      } else {
        setMessage("❌ Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage("❌ Server error while adding product.");
    }
  };

  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;
  
    try {
      const response = await fetch(`http://localhost:5000/api/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const updatedProducts = await fetch("http://localhost:5000/api/products");
        const data = await updatedProducts.json();
        setProducts(data);
        setMessage("✅ Product deleted successfully!");
      } else {
        setMessage("❌ Failed to delete product.");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      setMessage("❌ Server error while deleting.");
    }
  };
  

  const handleEditClick = (product) => {
    setShowEditFormId(product._id);
    setEditProduct({ name: product.name, description: product.description, price: product.price });
  };

  const handleEditChange = (e) => setEditProduct({ ...editProduct, [e.target.name]: e.target.value });

  const handleEditSubmit = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editProduct),
      });
      if (response.ok) {
        const updatedProducts = await fetch("http://localhost:5000/api/products");
        const data = await updatedProducts.json();
        setProducts(data);
        setShowEditFormId(null);
        setMessage("✅ Product updated successfully!");
      } else {
        setMessage("❌ Failed to update product.");
      }
    } catch (error) {
      console.error("Edit Error:", error);
      setMessage("❌ Server error while updating.");
    }
  };


  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h3>Admin Panel</h3>
        <ul>
          <li>Products</li>
          <li>Users</li>
          <li>Orders</li>
          <li>Reports</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>

       <div className="main-content">
       <h1>Hi, admin Alisha!</h1>
        <div className="header">
          <h2>Products</h2>
          <button onClick={() => setShowAddForm(!showAddForm)} className="explore-btn">
            {showAddForm ? "Close" : "+ Add New Product"}
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={handleAddProduct} className="add-product-form">
            <input type="text" name="name" placeholder="Product Name" value={newProduct.name} onChange={handleInputChange} required />
            <input type="text" name="description" placeholder="Description" value={newProduct.description} onChange={handleInputChange} required />
            <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleInputChange} required />
            <input type="file" onChange={handleImageChange} required />
            <button type="submit" className="explore-btn">Add Product</button>
          </form>
        )}

        {message && <p>{message}</p>}

        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Price</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <React.Fragment key={prod._id}>
                <tr>
                  <td>{prod.productId}</td>
                  <td>{prod.name}</td>
                  <td>{prod.status || "Active"}</td>
                  <td>₹{prod.price}</td>
                  <td>{new Date(prod.createdAt).toLocaleString()}</td>
                  <td>{prod.updatedAt ? new Date(prod.updatedAt).toLocaleString() : "—"}</td>
                  <td>
                    <button onClick={() => handleEditClick(prod)}>Edit</button>
                    <button onClick={() => handleDeleteProduct(prod._id)}>Delete</button>
                  </td>
                </tr>

                {showEditFormId === prod._id && (
                  <tr>
                    <td colSpan="7">
                      <form onSubmit={(e) => { e.preventDefault(); handleEditSubmit(prod._id); }} className="edit-product-form">
                        <input type="text" name="name" value={editProduct.name} onChange={handleEditChange} required />
                        <input type="text" name="description" value={editProduct.description} onChange={handleEditChange} required />
                        <input type="number" name="price" value={editProduct.price} onChange={handleEditChange} required />
                        <button type="submit" className="explore-btn">Update</button>
                        <button onClick={() => setShowEditFormId(null)} className="explore-btn" type="button">Cancel</button>
                      </form>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
