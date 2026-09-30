import { Link } from "react-router-dom";

function HostelCard({ hostel }) {
  return (
    <div className="hostel-card">
      <div className="hostel-image">
        <img src={hostel.image} alt={hostel.name} />

        <div className="rating">
          ⭐ {hostel.rating}
        </div>
      </div>

      <div className="hostel-card-content">
        <h3>{hostel.name}</h3>

        <p className="location">
          📍 {hostel.location}
        </p>

        <div className="hostel-info">
          <span>💰 ₹{hostel.rent}/month</span>
          <span>🚶 {hostel.distance}</span>
        </div>

        <div className="facilities">
          {hostel.facilities.map((facility, index) => (
            <span key={index}>{facility}</span>
          ))}
        </div>

        <Link to={`/hostel/${hostel.id}`} className="details-btn">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default HostelCard;