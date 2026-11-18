import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getMyProducts,
  deleteProduct,
  getMyTransactions,
  updateTransactionStatus,
} from "../services/api";

function SellerDashboard() {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");
  const currentUserId = currentUser?._id || currentUser?.id;

  const loadDashboard = useCallback(async () => {
    if (!token) {
      setError("Please log in to view your dashboard.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const [productData, transactionData] = await Promise.all([
        getMyProducts(token),
        getMyTransactions(token),
      ]);

      setProducts(productData.products || []);
      setTransactions(transactionData.transactions || []);
    } catch (err) {
      setError(err.message || "Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) {
      return;
    }

    try {
      setDeletingId(productId);
      await deleteProduct(productId, token);

      setProducts((previous) =>
        previous.filter((product) => product._id !== productId),
      );
    } catch (err) {
      setError(err.message || "Unable to delete listing.");
    } finally {
      setDeletingId("");
    }
  };

  const handleTransaction = async (transactionId, status) => {
    const action = status.toLowerCase();

    if (!window.confirm(`Are you sure you want to ${action} this request?`)) {
      return;
    }

    try {
      setUpdatingId(transactionId);

      await updateTransactionStatus(transactionId, status, token);

      await loadDashboard();
    } catch (err) {
      setError(err.message || `Unable to ${action} request.`);
    } finally {
      setUpdatingId("");
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

  const incomingRequests = transactions.filter((transaction) => {
    const sellerId = transaction.seller?._id || transaction.seller;

    return (
      sellerId?.toString() === currentUserId?.toString() &&
      ["Pending", "Accepted"].includes(transaction.status)
    );
  });

  return (
    <div className="container section seller-dashboard">
      <div className="seller-dashboard-heading">
        <div>
          <span className="dashboard-eyebrow">YOUR SPACE</span>
          <h1>My Listings</h1>
          <p>Manage your products and requests from other students.</p>
        </div>

        <Link to="/add-product" className="add-listing-btn">
          + Add Product
        </Link>
      </div>

      {loading ? (
        <p className="dashboard-message">Loading your dashboard...</p>
      ) : error ? (
        <div className="dashboard-error">
          <p>{error}</p>
          <button onClick={loadDashboard}>Try Again</button>
        </div>
      ) : (
        <>
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
              <span>Incoming Requests</span>
              <strong>
                {incomingRequests.filter((t) => t.status === "Pending").length}
              </strong>
            </div>
          </div>

          {/* Incoming transaction requests */}
          <section className="dashboard-section">
            <div className="dashboard-section-heading">
              <div>
                <span className="dashboard-eyebrow">BUYERS & STUDENTS</span>
                <h2>Incoming Requests</h2>
              </div>
            </div>

            {incomingRequests.length === 0 ? (
              <div className="dashboard-empty-message">
                <p>No incoming requests yet.</p>
              </div>
            ) : (
              <div className="transaction-list">
                {incomingRequests.map((transaction) => {
                  const product = transaction.product;
                  const buyer = transaction.buyer;
                  const isUpdating = updatingId === transaction._id;

                  return (
                    <article className="transaction-card" key={transaction._id}>
                      <div className="transaction-card-info">
                        <span className="seller-listing-category">
                          {transaction.listingType}
                        </span>

                        <h3>{product?.title || "Product unavailable"}</h3>

                        <p>Buyer: {buyer?.name || "Student"}</p>

                        <p>Email: {buyer?.email || "Not available"}</p>

                        {transaction.listingType === "Rent" && (
                          <p>
                            Rental period:{" "}
                            {transaction.rentalStartDate
                              ? new Date(
                                  transaction.rentalStartDate,
                                ).toLocaleDateString()
                              : "—"}{" "}
                            to{" "}
                            {transaction.rentalEndDate
                              ? new Date(
                                  transaction.rentalEndDate,
                                ).toLocaleDateString()
                              : "—"}
                          </p>
                        )}

                        {transaction.listingType === "Exchange" && (
                          <p>Exchange offer: {transaction.exchangeDetails}</p>
                        )}

                        <span
                          className={`listing-status ${transaction.status.toLowerCase()}`}
                        >
                          {transaction.status}
                        </span>
                      </div>

                      <div className="transaction-card-actions">
                        {transaction.status === "Pending" && (
                          <>
                            <button
                              className="accept-request-btn"
                              disabled={isUpdating}
                              onClick={() =>
                                handleTransaction(transaction._id, "Accepted")
                              }
                            >
                              {isUpdating ? "Updating..." : "Accept"}
                            </button>

                            <button
                              className="reject-request-btn"
                              disabled={isUpdating}
                              onClick={() =>
                                handleTransaction(transaction._id, "Rejected")
                              }
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>

          {/* Seller listings */}
          <section className="dashboard-section">
            <div className="dashboard-section-heading">
              <div>
                <span className="dashboard-eyebrow">YOUR PRODUCTS</span>
                <h2>My Listings</h2>
              </div>
            </div>

            {products.length === 0 ? (
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

                      <p className="seller-listing-location">
                        📍 {product.location}
                      </p>

                      <div className="seller-listing-details">
                        <strong>{formatPrice(product)}</strong>

                        <span
                          className={`listing-status ${product.status.toLowerCase()}`}
                        >
                          {product.status}
                        </span>
                      </div>

                      <div className="seller-listing-actions">
                        <Link to={`/product/${product._id}`}>View Listing</Link>

                        <button
                          type="button"
                          onClick={() => handleDelete(product._id)}
                          disabled={
                            deletingId === product._id ||
                            product.status === "Reserved"
                          }
                          title={
                            product.status === "Reserved"
                              ? "This product has a pending transaction."
                              : "Delete listing"
                          }
                        >
                          {deletingId === product._id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default SellerDashboard;
