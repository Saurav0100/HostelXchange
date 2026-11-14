import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const price = Number(product.price || 0).toLocaleString("en-IN");

  const image = product.images?.[0] || "/images/product-placeholder.svg";

  return (
    <article className="product-card">
      <div className="product-image">
        <img src={image} alt={product.title} loading="lazy" />

        <span className="product-type">
          {product.listingType?.toUpperCase()}
        </span>
      </div>

      <div className="product-content">
        <div className="product-category">{product.category}</div>

        <h3>{product.title}</h3>

        <p className="product-location">📍 {product.location}</p>

        <div className="product-bottom">
          <strong>
            {product.listingType === "Exchange" ? "Exchange" : `₹${price}`}
          </strong>

          <span className="condition">{product.condition}</span>
        </div>

        <Link to={`/product/${product._id}`} className="details-btn">
          View Product →
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;
