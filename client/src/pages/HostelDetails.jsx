
import { Link, useParams } from "react-router-dom";
import products from "../data/products";
import { useState } from "react";

function HostelDetails() {
  const { id } = useParams();

  const product = products.find(
    (item) => String(item.id) === id
  );

  if (!product) {
    return (
      <section className="details-page">
        <div className="container not-found">
          <h1>Product Not Found</h1>
          <p>This product may have been removed or is unavailable.</p>
          <Link to="/hostels" className="details-btn">
            Back to Marketplace
          </Link>
        </div>
      </section>
    );
  }

  const price = Number(product.rent).toLocaleString("en-IN");

  const imageFallback = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = "/images/product-placeholder.svg";
  };

  return (
    <section className="details-page">
      <div className="container">
        <Link to="/hostels" className="back-link">
          ← Back to Marketplace
        </Link>

        <div className="details-grid">
          <div className="details-image-wrapper">
            <img
              src={product.image}
              alt={product.name}
              className="details-image"
              onError={imageFallback}
            />

            <div className="details-rating">
              {product.type === "rent" ? "FOR RENT" : "FOR SALE"}
            </div>
          </div>

          <div className="details-content">
            <span className="section-label">
              {product.category.toUpperCase()}
            </span>

            <h1>{product.name}</h1>

            <p className="details-location">
              📍 Available at {product.location}
            </p>

            <div className="details-price">
              <strong>₹{price}</strong>
              <span>
                {product.priceUnit
                  ? `/ ${product.priceUnit}`
                  : " one-time price"}
              </span>
            </div>

            <div className="product-detail-condition">
              Condition: <strong>{product.condition}</strong>
            </div>

            <p className="details-description">
              {product.description}
            </p>

            <div className="details-actions">
              <button
                type="button"
                className="primary-action"
                onClick={() =>
                  window.alert(
                    "Seller contact will be enabled when the backend and messaging features are connected."
                  )
                }
              >
                Contact Seller
              </button>

              <Link
                to="/hostels"
                className="secondary-action"
              >
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
                <strong>{product.name}</strong>
              </div>

              <div>
                <span>Category</span>
                <strong>{product.category}</strong>
              </div>

              <div>
                <span>Listing Type</span>
                <strong>
                  {product.type === "rent" ? "For Rent" : "For Sale"}
                </strong>
              </div>

              <div>
                <span>Condition</span>
                <strong>{product.condition}</strong>
              </div>

              <div>
                <span>Pickup Location</span>
                <strong>{product.location}</strong>
              </div>
            </div>
          </div>

          <div className="details-box">
            <h2>Item Features</h2>

            <div className="facility-list">
              {product.features.map((feature) => (
                <div className="facility-item" key={feature}>
                  <span>✓</span>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="details-box">
            <h2>Seller Information</h2>

            <div className="seller-profile">
              <div className="seller-avatar">
                {product.seller.charAt(0)}
              </div>

              <div>
                <strong>{product.seller}</strong>
                <p>HostelXChange Community Member</p>
                <small>📍 {product.location}</small>
              </div>
            </div>

            <p className="seller-note">
              Contact the seller to confirm availability,
              condition and pickup arrangements.
            </p>
          </div>

          <div className="details-box">
            <h2>Before You Buy or Rent</h2>

            <ul className="product-tips">
              <li>Inspect the product before making payment.</li>
              <li>Confirm the final price and pickup time.</li>
              <li>Follow your hostel's rules for the item.</li>
              <li>For rentals, agree on the rental period and return date.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HostelDetails;
