import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-content">

        <Link to="/" className="logo">
          <span className="logo-icon">HX</span>
          <span>
            Hostel<span>X</span>Change
          </span>
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/hostels">Marketplace</Link>
          <Link to="/compare">Exchange</Link>
          <Link to="/about">About</Link>
        </div>

        <div className="nav-actions">
          <Link to="/login" className="login-link">
            Login
          </Link>

          <Link to="/register" className="register-btn">
            Get Started
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;