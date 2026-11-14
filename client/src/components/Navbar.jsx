import { Link } from "react-router-dom";

function Navbar() {
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

