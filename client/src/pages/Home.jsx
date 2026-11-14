import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/api";

const categories = [
  { icon: "📚", name: "Books", description: "Textbooks & study material" },
  { icon: "🪑", name: "Furniture", description: "Tables, chairs & storage" },
  { icon: "💻", name: "Electronics", description: "Gadgets & accessories" },
  {
    icon: "🎒",
    name: "Hostel Essentials",
    description: "Everyday hostel items",
  },
  { icon: "🚲", name: "Transport", description: "Cycles & accessories" },
  { icon: "⚡", name: "Other", description: "Everything else" },
];

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.products || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <>
      <section className="market-hero">
        <div className="container market-hero-content">
          <div className="market-hero-text">
            <div className="hero-badge">🏠 Built for Hostel Communities</div>

            <h1>
              Buy. Sell.
              <br />
              <span>Rent. Exchange.</span>
            </h1>

            <p>
              A student marketplace where hostel residents can buy, sell, rent
              and exchange useful products within their community.
            </p>

            <SearchBar />

            <div className="hero-actions">
              <Link to="/marketplace" className="hero-primary-btn">
                Explore Marketplace →
              </Link>

              <Link to="/register" className="hero-secondary-btn">
                Sell an Item
              </Link>
            </div>
          </div>

          <div className="market-hero-visual">
            <div className="hero-main-card">
              <div className="hero-product-label">TRENDING</div>
              <div className="hero-product-icon">🎓</div>

              <h3>Everything Students Need</h3>

              <p>Find useful products from students living around you.</p>

              <div className="hero-product-list">
                <span>📚 Books</span>
                <span>🪑 Furniture</span>
                <span>💻 Electronics</span>
                <span>🚲 Cycles</span>
              </div>
            </div>

            <div className="floating-product-card top">
              <span>💰</span>
              <div>
                <strong>Save Money</strong>
                <small>Buy pre-owned products</small>
              </div>
            </div>

            <div className="floating-product-card bottom">
              <span>♻️</span>
              <div>
                <strong>Give Items a Second Life</strong>
                <small>Sell or exchange before leaving</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section category-section">
        <div className="container">
          <div className="section-heading centered">
            <span className="section-label">BROWSE</span>
            <h2>What are you looking for?</h2>
            <p>Find useful items from students in your hostel community.</p>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <Link
                to={`/marketplace?category=${encodeURIComponent(category.name)}`}
                className="category-card"
                key={category.name}
              >
                <div className="category-icon">{category.icon}</div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <span>Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-label">JUST ADDED</span>
              <h2>Latest Listings</h2>
              <p>Fresh products listed by students.</p>
            </div>

            <Link to="/marketplace" className="view-all">
              View Marketplace →
            </Link>
          </div>

          {loading ? (
            <p>Loading latest listings...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : products.length > 0 ? (
            <div className="product-grid">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p>No listings available yet. Be the first to add one!</p>
          )}
        </div>
      </section>

      <section className="how-section">
        <div className="container">
          <div className="section-heading centered">
            <span className="section-label">HOW IT WORKS</span>
            <h2>Simple student-to-student exchange</h2>
            <p>Buying, selling and renting shouldn't be complicated.</p>
          </div>

          <div className="how-grid">
            <div className="how-card">
              <div className="how-number">01</div>
              <div className="how-icon">📤</div>
              <h3>List</h3>
              <p>Post an item you want to sell, rent or exchange.</p>
            </div>

            <div className="how-card">
              <div className="how-number">02</div>
              <div className="how-icon">🔎</div>
              <h3>Discover</h3>
              <p>Find products available in your student community.</p>
            </div>

            <div className="how-card">
              <div className="how-number">03</div>
              <div className="how-icon">🤝</div>
              <h3>Connect</h3>
              <p>Connect with the seller and complete your exchange.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="seller-cta">
        <div className="container seller-cta-content">
          <div>
            <span className="section-label">HAVE SOMETHING TO SELL?</span>
            <h2>Turn unused hostel items into value.</h2>
            <p>
              Moving out of your hostel? Don't leave useful things behind. List
              them on HostelXChange.
            </p>
          </div>

          <Link to="/register" className="seller-btn">
            Start Selling →
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
