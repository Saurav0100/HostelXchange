import { Link } from "react-router-dom";

function HostelCard({ hostel }) {
  return (
    <div className="product-card">

      <div className="product-image">

        <img
          src={hostel.image}
          alt={hostel.name}
        />

        <span className={`product-type ${hostel.type}`}>
          {hostel.type === "sale"
            ? "FOR SALE"
            : hostel.type === "rent"
            ? "FOR RENT"
            : "EXCHANGE"}
        </span>

        <button className="favorite-btn">
          ♡
        </button>

      </div>

      <div className="product-content">

        <div className="product-category">
          {hostel.category}
        </div>

        <h3>{hostel.name}</h3>

        <p className="product-location">
          📍 {hostel.location}
        </p>

        <div className="product-bottom">

          <div>
            <strong>₹{hostel.rent}</strong>

            {hostel.type === "rent" && (
              <small>/month</small>
            )}
          </div>

          <span className="condition">
            {hostel.condition}
          </span>

        </div>

        <Link
          to={`/hostel/${hostel.id}`}
          className="details-btn"
        >
          View Product →
        </Link>

      </div>

    </div>
  );
}

export default HostelCard;