
import { Link } from "react-router-dom";

function HostelCard({ hostel }) {
  const product = hostel;

  const price = Number(product.rent).toLocaleString("en-IN");

  const imageFallback = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = "/images/product-placeholder.svg";
  };

  return (
    <article className="product-card">
      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={imageFallback}
        />

        <span className={`product-type ${product.type}`}>
          {product.type === "rent" ? "FOR RENT" : "FOR SALE"}
        </span>

        <button
          type="button"
          className="favorite-btn"
          aria-label={`Save ${product.name}`}
          title="Wishlist feature coming soon"
        >
          ♡
        </button>
      </div>

      <div className="product-content">
        <div className="product-category">
          {product.category}
        </div>

        <h3>{product.name}</h3>

        <p className="product-location">
          📍 {product.location}
        </p>

        <div className="product-bottom">
          <div>
            <strong>₹{price}</strong>
            {product.priceUnit && (
              <small>/{product.priceUnit}</small>
            )}
          </div>

          <span className="condition">
            {product.condition}
          </span>
        </div>

        <Link
          to={`/product/${product.id}`}
          className="details-btn"
        >
          View Product →
        </Link>
      </div>
    </article>
  );
}

export default HostelCard;
