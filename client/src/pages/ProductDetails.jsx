import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById, createTransaction } from "../services/api";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requestLoading, setRequestLoading] = useState(false);
  const [error, setError] = useState("");
  const [requestError, setRequestError] = useState("");
  const [success, setSuccess] = useState("");

  const [rentalStartDate, setRentalStartDate] = useState("");
  const [rentalEndDate, setRentalEndDate] = useState("");
  const [exchangeDetails, setExchangeDetails] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data.product);
        setError("");
      } catch (err) {
        setError(err.message || "Unable to load product.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleTransaction = async (event) => {
    event.preventDefault();

    setRequestError("");
    setSuccess("");

    if (!token) {
      setRequestError("Please log in before requesting this product.");
      return;
    }

    if (!product || product.status !== "Available") {
      setRequestError("This product is no longer available.");
      return;
    }

    let transactionData = {
      productId: product._id,
    };

    if (product.listingType === "Rent") {
      if (!rentalStartDate || !rentalEndDate) {
        setRequestError("Please select both rental dates.");
        return;
      }

      if (new Date(rentalEndDate) <= new Date(rentalStartDate)) {
        setRequestError("Rental end date must be after start date.");
        return;
      }

      transactionData.rentalStartDate = rentalStartDate;
      transactionData.rentalEndDate = rentalEndDate;
    }

    if (product.listingType === "Exchange") {
      if (!exchangeDetails.trim()) {
        setRequestError("Please describe the item you want to exchange.");
        return;
      }

      transactionData.exchangeDetails = exchangeDetails.trim();
    }

    try {
      setRequestLoading(true);

      const data = await createTransaction(transactionData, token);

      setSuccess(
        data.message || "Your transaction request was submitted successfully.",
      );

      setProduct((previous) => ({
        ...previous,
        status: "Reserved",
      }));

      setRentalStartDate("");
      setRentalEndDate("");
      setExchangeDetails("");
    } catch (err) {
      setRequestError(err.message || "Unable to submit your request.");
    } finally {
      setRequestLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="details-page">
        <div className="container">Loading product...</div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="details-page">
        <div className="container not-found">
          <h1>Product Not Found</h1>
          <p>{error || "This product is unavailable."}</p>
          <Link to="/marketplace" className="details-btn">
            Back to Marketplace
          </Link>
        </div>
      </section>
    );
  }

  const image = product.images?.[0] || "/images/product-placeholder.svg";

  const sellerName = product.seller?.name || "Student Seller";

  const currentUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();

  const currentUserId = currentUser?._id || currentUser?.id;
  const sellerId = product.seller?._id || product.seller;

  const isOwnProduct =
    currentUserId &&
    sellerId &&
    currentUserId.toString() === sellerId.toString();

  const isAvailable = product.status === "Available";

  const actionLabel =
    {
      Sell: "Request to Buy",
      Rent: "Request to Rent",
      Exchange: "Request Exchange",
    }[product.listingType] || "Request Product";

  return (
    <section className="details-page">
      <div className="container">
        <Link to="/marketplace" className="back-link">
          ← Back to Marketplace
        </Link>

        <div className="details-grid">
          <div className="details-image-wrapper">
            <img
              src={image}
              alt={product.title}
              className="details-image"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = "/images/product-placeholder.svg";
              }}
            />

            <div className="details-rating">
              {product.listingType?.toUpperCase()}
            </div>
          </div>

          <div className="details-content">
            <span className="section-label">
              {product.category?.toUpperCase()}
            </span>

            <h1>{product.title}</h1>

            <p className="details-location">
              📍 Available at {product.location}
            </p>

            <div className="details-price">
              <strong>
                {product.listingType === "Exchange"
                  ? "Exchange"
                  : `₹${Number(product.price || 0).toLocaleString("en-IN")}`}
              </strong>

              {product.listingType !== "Exchange" && (
                <span>{product.priceUnit ? `/ ${product.priceUnit}` : ""}</span>
              )}
            </div>

            <div className="product-detail-condition">
              Condition: <strong>{product.condition}</strong>
            </div>

            <p className="details-description">{product.description}</p>

            {product.exchangePreference && (
              <p>Exchange preference: {product.exchangePreference}</p>
            )}

            <div className="product-availability">
              <span
                className={`availability-dot ${isAvailable ? "available" : "unavailable"}`}
              />
              {product.status}
            </div>

            {isAvailable && !isOwnProduct && (
              <form
                className="transaction-request-form"
                onSubmit={handleTransaction}
              >
                {product.listingType === "Rent" && (
                  <div className="transaction-extra-fields">
                    <h3>Rental Period</h3>

                    <label htmlFor="rentalStartDate">Rental Start Date</label>
                    <input
                      id="rentalStartDate"
                      type="date"
                      value={rentalStartDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(event) =>
                        setRentalStartDate(event.target.value)
                      }
                      required
                    />

                    <label htmlFor="rentalEndDate">Rental End Date</label>
                    <input
                      id="rentalEndDate"
                      type="date"
                      value={rentalEndDate}
                      min={
                        rentalStartDate ||
                        new Date().toISOString().split("T")[0]
                      }
                      onChange={(event) => setRentalEndDate(event.target.value)}
                      required
                    />
                  </div>
                )}

                {product.listingType === "Exchange" && (
                  <div className="transaction-extra-fields">
                    <h3>Your Exchange Offer</h3>

                    <label htmlFor="exchangeDetails">
                      What would you like to exchange?
                    </label>

                    <textarea
                      id="exchangeDetails"
                      value={exchangeDetails}
                      onChange={(event) =>
                        setExchangeDetails(event.target.value)
                      }
                      placeholder="Describe the item you are offering..."
                      required
                    />
                  </div>
                )}

                {requestError && (
                  <p className="transaction-error" role="alert">
                    {requestError}
                  </p>
                )}

                <button
                  type="submit"
                  className="primary-action"
                  disabled={requestLoading}
                >
                  {requestLoading ? "Submitting Request..." : actionLabel}
                </button>
              </form>
            )}

            {isOwnProduct && (
              <p className="transaction-info">
                This is your listing. You cannot request your own product.
              </p>
            )}

            {!isAvailable && (
              <p className="transaction-info">
                This product is currently {product.status?.toLowerCase()}.
              </p>
            )}

            {success && (
              <p className="transaction-success" role="status">
                {success}
              </p>
            )}

            <div className="details-actions">
              <Link to="/marketplace" className="secondary-action">
                Browse More
              </Link>
            </div>
          </div>
        </div>

        <div className="details-sections">
          <div className="details-box">
            <h2>Product Information</h2>

            <div className="info-list">
              <div>
                <span>Product</span>
                <strong>{product.title}</strong>
              </div>

              <div>
                <span>Category</span>
                <strong>{product.category}</strong>
              </div>

              <div>
                <span>Listing Type</span>
                <strong>{product.listingType}</strong>
              </div>

              <div>
                <span>Condition</span>
                <strong>{product.condition}</strong>
              </div>

              <div>
                <span>Pickup Location</span>
                <strong>{product.location}</strong>
              </div>

              <div>
                <span>Status</span>
                <strong>{product.status}</strong>
              </div>
            </div>
          </div>

          <div className="details-box">
            <h2>Seller Information</h2>

            <div className="seller-profile">
              <div className="seller-avatar">
                {sellerName.charAt(0).toUpperCase()}
              </div>

              <div>
                <strong>{sellerName}</strong>
                <p>HostelXchange Community Member</p>
                <small>📍 {product.location}</small>
              </div>
            </div>

            <p className="seller-note">
              Your transaction request will be sent to the seller. You can
              follow its progress through your transactions.
            </p>
          </div>

          <div className="details-box">
            <h2>Before You Buy or Rent</h2>

            <ul className="product-tips">
              <li>Inspect the product before making payment.</li>
              <li>Confirm the final price and pickup time.</li>
              <li>Agree on rental duration and return date, if applicable.</li>
              <li>Arrange a safe handover with the seller.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
