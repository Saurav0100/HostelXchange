import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import HostelCard from "../components/HostelCard";

const products = [
  {
    id: 1,
    name: "Study Table",
    category: "Furniture",
    location: "ABC Hostel",
    rent: "1,500",
    condition: "Good Condition",
    type: "sale",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Engineering Books Set",
    category: "Books",
    location: "Shree Hostel",
    rent: "800",
    condition: "Like New",
    type: "sale",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Bicycle",
    category: "Transport",
    location: "Campus Hostel",
    rent: "500",
    condition: "Good Condition",
    type: "rent",
    image:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Scientific Calculator",
    category: "Electronics",
    location: "Royal Hostel",
    rent: "700",
    condition: "Excellent",
    type: "sale",
    image:
      "https://images.unsplash.com/photo-1592051420422-265a8a6e5a38?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "Mini Cooler",
    category: "Electronics",
    location: "Sunrise Hostel",
    rent: "2,500",
    condition: "Good Condition",
    type: "sale",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "Induction Cooktop",
    category: "Hostel Essentials",
    location: "Lake View Hostel",
    rent: "150",
    condition: "Good Condition",
    type: "rent",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80",
  },
];

function Hostels() {
  const [searchParams] = useSearchParams();

  const initialSearch =
    searchParams.get("search") || "";

  const [search, setSearch] =
    useState(initialSearch);

  const [type, setType] = useState("all");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {

      const text = search.toLowerCase();

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(text) ||
        product.category
          .toLowerCase()
          .includes(text) ||
        product.location
          .toLowerCase()
          .includes(text);

      const matchesType =
        type === "all" ||
        product.type === type;

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

            <h1>
              Find what you need.
            </h1>

            <p>
              Buy, rent or discover useful products
              from students around you.
            </p>
          </div>

          <button className="sell-top-btn">
            + Sell an Item
          </button>

        </div>

        <div className="marketplace-toolbar">

          <div className="marketplace-search">
            🔎

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <div className="type-buttons">

            <button
              className={
                type === "all"
                  ? "active"
                  : ""
              }
              onClick={() => setType("all")}
            >
              All
            </button>

            <button
              className={
                type === "sale"
                  ? "active"
                  : ""
              }
              onClick={() => setType("sale")}
            >
              Buy
            </button>

            <button
              className={
                type === "rent"
                  ? "active"
                  : ""
              }
              onClick={() => setType("rent")}
            >
              Rent
            </button>

            <button
              className={
                type === "exchange"
                  ? "active"
                  : ""
              }
              onClick={() => setType("exchange")}
            >
              Exchange
            </button>

          </div>

        </div>

        <div className="market-results-header">

          <h2>
            {filteredProducts.length} Listings
          </h2>

          <span>
            Fresh listings from hostel communities
          </span>

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

            <h3>
              No products found
            </h3>

            <p>
              Try another search term.
            </p>

          </div>

        )}

      </div>

    </section>
  );
}

export default Hostels;