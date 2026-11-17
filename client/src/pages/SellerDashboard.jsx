import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyProducts, deleteProduct } from "../services/api";

function SellerDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");

  const token = localStorage.getItem("token");

  const loadProducts = useCallback(async () => {
    if (!token) {
      setError("Please log in to view your listings.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await getMyProducts(token);
      setProducts(data.products || []);
    } catch (err) {
      setError(err.message || "Unable to load your listings.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleDelete = async (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this listing?",
    );

    if (!confirmed) return;

    try {
      setDeletingId(productId);
      await deleteProduct(productId, token);

      setProducts((previous) =>
        previous.filter((product) => product._id !== productId),
      );
    } catch (err) {
      setError(err.message || "Unable to delete this listing.");
    } finally {
      setDeletingId("");
    }
  };

  const formatPrice = (product) => {
    if (product.listingType === "Exchange") return "Exchange";

    return `₹${Number(product.price || 0).toLocaleString("en-IN")}${
      product.priceUnit && product.priceUnit !== "One-time"
        ? ` / ${product.priceUnit.replace("Per ", "").toLowerCase()}`
        : ""
    }`;
  };

  return (
    <div className="container section seller-dashboard">
      <div className="seller-dashboard-heading">
        <div>
          <span className="dashboard-eyebrow">YOUR SPACE</span>
          <h1>My Listings</h1>
          <p>Manage the products you're selling, renting or exchanging.</p>
        </div>

        <Link to="/add-product" className="add-listing-btn">
          + Add Product
        </Link>
      </div>

      <div className="dashboard-stats">
        <div className="dashboard-stat-card">
          <span>Total Listings</span>
          <strong>{products.length}</strong>
        </div>

        <div className="dashboard-stat-card">
          <span>Available</span>
          <strong>
            {products.filter((p) => p.status === "Available").length}
          </strong>
        </div>

        <div className="dashboard-stat-card">
          <span>Completed</span>
          <strong>
            {products.filter((p) => p.status === "Completed").length}
          </strong>
        </div>
      </div>

      {loading ? (
        <p className="dashboard-message">Loading your listings...</p>
      ) : error ? (
        <div className="dashboard-error">
          <p>{error}</p>
          <button onClick={loadProducts}>Try Again</button>
        </div>
      ) : products.length === 0 ? (
        <div className="empty-listings">
          <div className="empty-listings-icon">📦</div>
          <h2>No listings yet</h2>
          <p>Your products will appear here after you publish them.</p>
          <Link to="/add-product" className="add-listing-btn">
            Create Your First Listing
          </Link>
        </div>
      ) : (
        <div className="seller-listings-grid">
          {products.map((product) => (
            <article className="seller-listing-card" key={product._id}>
              <div className="seller-listing-image">
                {product.images?.[0] ? (
                  <img src={product.images[0]} alt={product.title} />
                ) : (
                  <div className="seller-image-placeholder">📦</div>
                )}

                <span className="seller-listing-type">
                  {product.listingType}
                </span>
              </div>

              <div className="seller-listing-content">
                <span className="seller-listing-category">
                  {product.category}
                </span>

                <h3>{product.title}</h3>

                <p className="seller-listing-location">📍 {product.location}</p>

                <div className="seller-listing-details">
                  <strong>{formatPrice(product)}</strong>
                  <span
                    className={`listing-status ${product.status?.toLowerCase()}`}
                  >
                    {product.status}
                  </span>
                </div>

                <div className="seller-listing-actions">
                  <Link to={`/product/${product._id}`}>View Listing</Link>

                  <button
                    type="button"
                    onClick={() => handleDelete(product._id)}
                    disabled={deletingId === product._id}
                  >
                    {deletingId === product._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default SellerDashboard;
