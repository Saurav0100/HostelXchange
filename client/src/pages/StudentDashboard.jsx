import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyTransactions, updateTransactionStatus } from "../services/api";

function StudentDashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");
  const currentUserId = currentUser?._id || currentUser?.id;

  const loadTransactions = useCallback(async () => {
    if (!token) {
      setError("Please log in to view your transactions.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await getMyTransactions(token);
      const allTransactions = data.transactions || [];

      const myPurchases = allTransactions.filter((transaction) => {
        const buyerId = transaction.buyer?._id || transaction.buyer;

        return buyerId?.toString() === currentUserId?.toString();
      });

      setTransactions(myPurchases);
    } catch (err) {
      setError(err.message || "Unable to load transactions.");
    } finally {
      setLoading(false);
    }
  }, [token, currentUserId]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const handleStatusUpdate = async (transactionId, status) => {
    const action = status.toLowerCase();

    if (
      !window.confirm(`Are you sure you want to ${action} this transaction?`)
    ) {
      return;
    }

    try {
      setUpdatingId(transactionId);

      await updateTransactionStatus(transactionId, status, token);

      await loadTransactions();
    } catch (err) {
      setError(err.message || `Unable to ${action} transaction.`);
    } finally {
      setUpdatingId("");
    }
  };

  const getPrice = (transaction) => {
    if (transaction.listingType === "Exchange") return "Exchange";

    return `₹${Number(transaction.agreedPrice || 0).toLocaleString("en-IN")}`;
  };

  return (
    <div className="container section student-dashboard">
      <div className="student-dashboard-heading">
        <div>
          <span className="dashboard-eyebrow">YOUR ACTIVITY</span>
          <h1>My Purchases</h1>
          <p>Track your purchase, rental and exchange requests.</p>
        </div>

        <Link to="/marketplace" className="add-listing-btn">
          Explore Marketplace
        </Link>
      </div>

      {loading ? (
        <p className="dashboard-message">Loading your transactions...</p>
      ) : error ? (
        <div className="dashboard-error">
          <p>{error}</p>
          <button onClick={loadTransactions}>Try Again</button>
        </div>
      ) : transactions.length === 0 ? (
        <div className="empty-listings">
          <div className="empty-listings-icon">🛍️</div>
          <h2>No transactions yet</h2>
          <p>Your product requests will appear here.</p>
          <Link to="/marketplace" className="add-listing-btn">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="buyer-transactions-list">
          {transactions.map((transaction) => {
            const product = transaction.product;
            const isUpdating = updatingId === transaction._id;

            return (
              <article className="buyer-transaction-card" key={transaction._id}>
                <div className="buyer-transaction-image">
                  {product?.images?.[0] ? (
                    <img src={product.images[0]} alt={product.title} />
                  ) : (
                    <span>📦</span>
                  )}
                </div>

                <div className="buyer-transaction-content">
                  <span className="seller-listing-category">
                    {transaction.listingType}
                  </span>

                  <h3>{product?.title || "Product unavailable"}</h3>

                  <p>Seller: {transaction.seller?.name || "Student Seller"}</p>

                  <strong>{getPrice(transaction)}</strong>

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
                    <p>Your offer: {transaction.exchangeDetails}</p>
                  )}

                  <span
                    className={`listing-status ${transaction.status.toLowerCase()}`}
                  >
                    {transaction.status}
                  </span>

                  <div className="buyer-transaction-actions">
                    {["Pending", "Accepted"].includes(transaction.status) && (
                      <button
                        className="reject-request-btn"
                        disabled={isUpdating}
                        onClick={() =>
                          handleStatusUpdate(transaction._id, "Cancelled")
                        }
                      >
                        Cancel Request
                      </button>
                    )}

                    {transaction.status === "Accepted" && (
                      <button
                        className="accept-request-btn"
                        disabled={isUpdating}
                        onClick={() =>
                          handleStatusUpdate(transaction._id, "Completed")
                        }
                      >
                        Mark Completed
                      </button>
                    )}

                    {product?._id && (
                      <Link to={`/product/${product._id}`}>View Product</Link>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;
