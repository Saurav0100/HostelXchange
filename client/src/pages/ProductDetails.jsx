import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../services/api";

function HostelDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data.product);
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

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

  return (
    <section className="details-page">
      <div className="container">
        <Link to="/marketplace" className="back-link">
          ← Back to Marketplace
        </Link>

        <div className="details-grid">
          <div className="details-image-wrapper">
            <img src={image} alt={product.title} className="details-image" />

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

            <div className="details-actions">
              <button
                type="button"
                className="primary-action"
                onClick={() => {
                  window.alert(
                    "Seller messaging will be available in a future update.",
                  );
                }}
              >
                Contact Seller
              </button>

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
                <p>HostelXChange Community Member</p>
                <small>📍 {product.location}</small>
              </div>
            </div>

            <p className="seller-note">
              Contact the seller to confirm availability, condition and pickup
              arrangements.
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

export default HostelDetails;
