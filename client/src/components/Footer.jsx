function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-logo">
            Hostel<span>X</span>Change
          </div>

          <p>
            Find, compare and connect with hostels and PGs near your college.
          </p>
        </div>

        <div>
          <h4>Platform</h4>
          <a href="/hostels">Find Hostel</a>
          <a href="/compare">Compare</a>
          <a href="/register">Register</a>
        </div>

        <div>
          <h4>Company</h4>
          <a href="/about">About Us</a>
          <a href="#">Contact</a>
          <a href="#">Help</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 HostelXChange. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;