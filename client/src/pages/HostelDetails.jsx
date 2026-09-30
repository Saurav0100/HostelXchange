import { Link, useParams } from "react-router-dom";
import hostels from "../data/hostels";

function HostelDetails() {
  const { id } = useParams();

  const hostel = hostels.find(
    (item) => item.id === Number(id)
  );

  if (!hostel) {
    return (
      <section className="section">
        <div className="container not-found">
          <h1>Hostel Not Found</h1>

          <p>
            Sorry, the hostel you are looking for does not exist.
          </p>

          <Link to="/hostels" className="details-btn">
            ← Back to Hostels
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="details-page">
      <div className="container">

        <Link to="/hostels" className="back-link">
          ← Back to Hostels
        </Link>

        <div className="details-grid">

          {/* Image */}
          <div className="details-image-wrapper">
            <img
              src={hostel.image}
              alt={hostel.name}
              className="details-image"
            />

            <div className="details-rating">
              ⭐ {hostel.rating}
            </div>
          </div>

          {/* Main information */}
          <div className="details-content">

            <span className="section-label">
              VERIFIED HOSTEL
            </span>

            <h1>{hostel.name}</h1>

            <p className="details-location">
              📍 {hostel.location}
            </p>

            <div className="details-rating-text">
              ⭐ {hostel.rating}
              <span>
                ({hostel.reviews} reviews)
              </span>
            </div>

            <div className="details-price">
              <strong>₹{hostel.rent}</strong>
              <span>/month onwards</span>
            </div>

            <p className="details-description">
              {hostel.description}
            </p>

            <div className="details-actions">
              <button className="primary-action">
                Request Booking
              </button>

              <button className="secondary-action">
                Contact Owner
              </button>
            </div>

          </div>
        </div>

        {/* Information */}
        <div className="details-sections">

          {/* Facilities */}
          <div className="details-box">
            <h2>Facilities</h2>

            <div className="facility-list">
              {hostel.facilities.map((facility, index) => (
                <div className="facility-item" key={index}>
                  <span>✓</span>
                  {facility}
                </div>
              ))}
            </div>
          </div>

          {/* Hostel Information */}
          <div className="details-box">
            <h2>Hostel Information</h2>

            <div className="info-list">

              <div>
                <span>Gender</span>
                <strong>{hostel.gender}</strong>
              </div>

              <div>
                <span>Room Type</span>
                <strong>{hostel.roomType}</strong>
              </div>

              <div>
                <span>Distance</span>
                <strong>{hostel.distance}</strong>
              </div>

              <div>
                <span>Address</span>
                <strong>{hostel.address}</strong>
              </div>

            </div>
          </div>

          {/* Room Options */}
          <div className="details-box">
            <h2>Room Options</h2>

            <div className="room-options">

              {hostel.roomOptions.map((room, index) => (
                <div className="room-option" key={index}>

                  <div>
                    <h3>{room.type} Sharing</h3>

                    <span>
                      Comfortable student accommodation
                    </span>
                  </div>

                  <strong>
                    ₹{room.price}
                    <small>/month</small>
                  </strong>

                </div>
              ))}

            </div>
          </div>

          {/* Rules */}
          <div className="details-box">
            <h2>Hostel Rules</h2>

            <div className="rules-list">

              {hostel.rules.map((rule, index) => (
                <div key={index}>
                  <span>•</span>
                  {rule}
                </div>
              ))}

            </div>
          </div>

          {/* Reviews */}
          <div className="details-box">
            <div className="review-heading">
              <div>
                <h2>Student Reviews</h2>

                <p>
                  ⭐ {hostel.rating} average rating
                </p>
              </div>

              <button className="review-button">
                Write a Review
              </button>
            </div>

            <div className="review">

              <div className="review-top">
                <strong>Rahul Sharma</strong>
                <span>⭐⭐⭐⭐⭐</span>
              </div>

              <p>
                Good location, comfortable rooms and useful
                facilities for students.
              </p>

            </div>

            <div className="review">

              <div className="review-top">
                <strong>Aditya Patel</strong>
                <span>⭐⭐⭐⭐</span>
              </div>

              <p>
                The hostel is close to the college and the
                overall experience was good.
              </p>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default HostelDetails;