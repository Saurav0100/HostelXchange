import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [dashboardOpen, setDashboardOpen] = useState(false);

  const token = localStorage.getItem("token");

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="logo">
          <img
            src={`${import.meta.env.BASE_URL}hostelxchange-logo.png`}
            alt="HostelXChange - Have It. Need It. Exchange It."
            className="brand-logo"
          />
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/marketplace">Marketplace</Link>
          <Link to="/compare">Exchange</Link>
          <Link to="/about">About</Link>

          {token && (
            <div className="dashboard-dropdown">
              <button
                type="button"
                className="dashboard-dropdown-btn"
                onClick={() => setDashboardOpen(!dashboardOpen)}
                aria-expanded={dashboardOpen}
              >
                Dashboard
                <span>{dashboardOpen ? "▲" : "▼"}</span>
              </button>

              {dashboardOpen && (
                <div className="dashboard-dropdown-menu">
                  <Link
                    to="/student-dashboard"
                    onClick={() => setDashboardOpen(false)}
                  >
                    Student Dashboard
                  </Link>

                  <Link
                    to="/seller-dashboard"
                    onClick={() => setDashboardOpen(false)}
                  >
                    Seller Dashboard
                  </Link>

                  <Link
                    to="/add-product"
                    onClick={() => setDashboardOpen(false)}
                  >
                    Add Product
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="nav-actions">
          {token ? (
            <button
              type="button"
              className="login-link"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/HostelXchange/login";
              }}
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="login-link">
                Login
              </Link>

              <Link to="/register" className="register-btn">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
