
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import HostelCard from "../components/HostelCard";
import products from "../data/products";

function Hostels() {
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [type, setType] = useState("all");

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.location.toLowerCase().includes(query);

      const matchesType =
        type === "all" || product.type === type;

      return matchesSearch && matchesType;
    });
  }, [search, type]);

  return (
    <section className="marketplace-page">
      <div className="container">
        <div className="marketplace-header">
          <div>
            <span className="section-label">
              HOSTELXCHANGE MARKETPLACE
            </span>

            <h1>Find What You Need.</h1>

            <p>
              Buy or rent useful products from your hostel community.
            </p>
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
            <button
              type="button"
              className={type === "all" ? "active" : ""}
              onClick={() => setType("all")}
            >
              All Items
            </button>

            <button
              type="button"
              className={type === "sale" ? "active" : ""}
              onClick={() => setType("sale")}
            >
              For Sale
            </button>

            <button
              type="button"
              className={type === "rent" ? "active" : ""}
              onClick={() => setType("rent")}
            >
              For Rent
            </button>
          </div>
        </div>

        <div className="market-results-header">
          <h2>{filteredProducts.length} Listings</h2>
          <span>Products from hostel communities</span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="product-grid marketplace-grid">
            {filteredProducts.map((product) => (
              <HostelCard
                key={product.id}
                hostel={product}
              />
            ))}
          </div>
        ) : (
          <div className="market-no-results">
            <div>📦</div>
            <h3>No products found</h3>
            <p>Try a different product name or category.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Hostels;
