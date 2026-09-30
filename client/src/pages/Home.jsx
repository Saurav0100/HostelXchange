import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import HostelCard from "../components/HostelCard";
import hostels from "../data/hostels";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              🏠 Smart Hostel Discovery Platform
            </div>

            <h1>
              Find a place
              <br />
              <span>you can call home.</span>
            </h1>

            <p>
              Discover hostels and PGs near your college, compare prices,
              check facilities and connect with owners — all in one place.
            </p>

            <SearchBar />

            <div className="hero-stats">
              <div>
                <strong>500+</strong>
                <span>Hostels</span>
              </div>

              <div>
                <strong>50+</strong>
                <span>Cities</span>
              </div>

              <div>
                <strong>10K+</strong>
                <span>Students</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card-main">
              <img
                src="https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=1000&q=80"
                alt="Hostel room"
              />

              <div className="floating-card">
                <div className="floating-icon">✓</div>

                <div>
                  <strong>Verified Hostel</strong>
                  <span>Safe & student friendly</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hostels */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-label">EXPLORE</span>
              <h2>Featured Hostels</h2>
              <p>
                Discover some popular accommodation options for students.
              </p>
            </div>

            <Link to="/hostels" className="view-all">
              View All →
            </Link>
          </div>

          <div className="hostel-grid">
            {hostels.slice(0, 3).map((hostel) => (
              <HostelCard key={hostel.id} hostel={hostel} />
            ))}
          </div>
        </div>
      </section>

      {/* Why HostelXChange */}
      <section className="why-section">
        <div className="container">
          <div className="section-heading centered">
            <span className="section-label">WHY HOSTELXCHANGE</span>
            <h2>Everything you need to find your stay</h2>
            <p>
              We make hostel searching simpler, faster and more transparent.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔎</div>
              <h3>Easy Search</h3>
              <p>
                Search hostels by location, college, price and other
                preferences.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚖️</div>
              <h3>Compare Options</h3>
              <p>
                Compare rent, facilities, ratings and distance before making
                a decision.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3>Student Reviews</h3>
              <p>
                Read reviews and ratings to understand the experience of
                other students.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Connect Directly</h3>
              <p>
                Contact hostel owners and send enquiries directly through the
                platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="container">
          <div className="section-heading centered">
            <span className="section-label">HOW IT WORKS</span>
            <h2>Find your hostel in 3 simple steps</h2>
          </div>

          <div className="steps-grid">
            <div className="step">
              <div className="step-number">01</div>
              <h3>Search</h3>
              <p>Enter your city or college and explore available hostels.</p>
            </div>

            <div className="step">
              <div className="step-number">02</div>
              <h3>Compare</h3>
              <p>Compare prices, facilities, locations and ratings.</p>
            </div>

            <div className="step">
              <div className="step-number">03</div>
              <h3>Connect</h3>
              <p>Contact the owner or send a booking enquiry.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container cta-content">
          <div>
            <span className="section-label">HOSTEL OWNERS</span>
            <h2>Have a hostel or PG?</h2>
            <p>
              List your property on HostelXChange and connect with students
              looking for accommodation.
            </p>
          </div>

          <Link to="/register" className="cta-button">
            List Your Hostel →
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;