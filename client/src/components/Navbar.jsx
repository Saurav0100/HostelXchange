import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    user = null;
  }

  const userName = user?.name || user?.fullName || "Student";
  const userEmail = user?.email || "";

  const initials = userName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  const closeMenus = () => {
    setDashboardOpen(false);
    setProfileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    closeMenus();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="logo" onClick={closeMenus}>
          <img
            src={`${import.meta.env.BASE_URL}hostelxchange-logo.png`}
            alt="HostelXChange - Have It. Need It. Exchange It."
            className="brand-logo"
          />
        </Link>

        <div className="nav-links">
          <Link to="/" onClick={closeMenus}>
            Home
          </Link>
          <Link to="/marketplace" onClick={closeMenus}>
            Marketplace
          </Link>
          <Link to="/compare" onClick={closeMenus}>
            Exchange
          </Link>

          {token && (
            <div className="dashboard-dropdown">
              <button
                type="button"
                className="dashboard-dropdown-btn"
                onClick={() => {
                  setDashboardOpen(!dashboardOpen);
                  setProfileOpen(false);
                }}
                aria-expanded={dashboardOpen}
              >
                Dashboard
                <span>{dashboardOpen ? "▲" : "▼"}</span>
              </button>

              {dashboardOpen && (
                <div className="dashboard-dropdown-menu">
                  <Link to="/student-dashboard" onClick={closeMenus}>
                    Student Dashboard
                  </Link>

                  <Link to="/seller-dashboard" onClick={closeMenus}>
                    Seller Dashboard
                  </Link>

                  <Link to="/add-product" onClick={closeMenus}>
                    Add Product
                  </Link>
                </div>
              )}
            </div>
          )}

          <Link to="/about" onClick={closeMenus}>
            About
          </Link>
        </div>

        <div className="nav-actions">
          {token ? (
            <div className="profile-dropdown">
              <button
                type="button"
                className="profile-avatar-btn"
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setDashboardOpen(false);
                }}
                aria-label="Open profile menu"
                aria-expanded={profileOpen}
              >
                {initials || "U"}
              </button>

              {profileOpen && (
                <div className="profile-dropdown-menu">
                  <div className="profile-menu-header">
                    <div className="profile-menu-avatar">{initials || "U"}</div>

                    <div className="profile-menu-user">
                      <strong>{userName}</strong>
                      <span>{userEmail || "Student account"}</span>
                    </div>
                  </div>

                  <div className="profile-menu-divider" />

                  <Link to="/profile" onClick={closeMenus}>
                    <span>👤</span> My Profile
                  </Link>

                  <Link to="/settings" onClick={closeMenus}>
                    <span>⚙️</span> Settings
                  </Link>

                  <Link to="/seller-dashboard" onClick={closeMenus}>
                    <span>📦</span> My Listings
                  </Link>

                  <Link to="/student-dashboard" onClick={closeMenus}>
                    <span>📋</span> Transaction History
                  </Link>

                  <div className="profile-menu-divider" />

                  <button
                    type="button"
                    className="profile-logout-btn"
                    onClick={handleLogout}
                  >
                    <span>↪</span> Logout
                  </button>
                </div>
              )}
            </div>
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
