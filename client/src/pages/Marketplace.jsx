import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/api";

function Hostels() {
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [type, setType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data.products || []);
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        product.title?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query) ||
        product.location?.toLowerCase().includes(query);

      const matchesType =
        type === "all" || product.listingType?.toLowerCase() === type;

      return matchesSearch && matchesType;
    });
  }, [products, search, type]);

  return (
    <section className="marketplace-page">
      <div className="container">
        <div className="marketplace-header">
          <div>
            <span className="section-label">HOSTELXCHANGE MARKETPLACE</span>

            <h1>Find What You Need.</h1>

            <p>Buy or rent useful products from your student community.</p>
          </div>
        </div>

        <div className="marketplace-toolbar">
          <div className="marketplace-search">
            <span>🔎</span>

            <input
              type="search"
              placeholder="Search books, furniture, electronics..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="type-buttons">
            {["all", "sell", "rent", "exchange"].map((value) => (
              <button
                key={value}
                type="button"
                className={type === value ? "active" : ""}
                onClick={() => setType(value)}
              >
                {value === "all"
                  ? "All Items"
                  : value.charAt(0).toUpperCase() + value.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <>
            <div className="market-results-header">
              <h2>{filteredProducts.length} Listings</h2>
              <span>Products from student communities</span>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="product-grid marketplace-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="market-no-results">
                <div>📦</div>
                <h3>No products found</h3>
                <p>Try a different product name or category.</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Hostels;
