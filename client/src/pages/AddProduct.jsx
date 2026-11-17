import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createProduct } from "../services/api";

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Books",
    condition: "Good",
    listingType: "Sell",
    price: "",
    priceUnit: "One-time",
    exchangePreference: "",
    location: "",
    images: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please log in before adding a product.");
      return;
    }

    if (
      formData.listingType !== "Exchange" &&
      (!formData.price || Number(formData.price) < 0)
    ) {
      setError("Please enter a valid price.");
      return;
    }

    try {
      setLoading(true);

      const productData = {
        ...formData,
        price:
          formData.listingType === "Exchange"
            ? undefined
            : Number(formData.price),
        images: formData.images
          .split(",")
          .map((image) => image.trim())
          .filter(Boolean),
        exchangePreference:
          formData.listingType === "Exchange"
            ? formData.exchangePreference
            : "",
      };

      await createProduct(productData, token);

      navigate("/marketplace");
    } catch (err) {
      setError(err.message || "Unable to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container section">
      <h1>Add a Product</h1>
      <p>List an item for sale, rent, or exchange with other students.</p>

      <form onSubmit={handleSubmit} className="add-product-form">
        <div>
          <label>Product Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Engineering Mathematics Book"
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your product..."
            required
          />
        </div>

        <div>
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {[
              "Books",
              "Electronics",
              "Furniture",
              "Clothing",
              "Sports",
              "Accessories",
              "Stationery",
              "Other",
            ].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Condition</label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
          >
            {["New", "Like New", "Good", "Fair"].map((condition) => (
              <option key={condition} value={condition}>
                {condition}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Listing Type</label>
          <select
            name="listingType"
            value={formData.listingType}
            onChange={handleChange}
          >
            <option value="Sell">Sell</option>
            <option value="Rent">Rent</option>
            <option value="Exchange">Exchange</option>
          </select>
        </div>

        {formData.listingType !== "Exchange" && (
          <>
            <div>
              <label>Price (₹)</label>
              <input
                type="number"
                name="price"
                min="0"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter amount"
                required
              />
            </div>

            <div>
              <label>Price Unit</label>
              <select
                name="priceUnit"
                value={formData.priceUnit}
                onChange={handleChange}
              >
                {["One-time", "Per day", "Per week", "Per month"].map(
                  (unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ),
                )}
              </select>
            </div>
          </>
        )}

        {formData.listingType === "Exchange" && (
          <div>
            <label>What would you like in exchange?</label>
            <input
              type="text"
              name="exchangePreference"
              value={formData.exchangePreference}
              onChange={handleChange}
              placeholder="Describe what you want"
            />
          </div>
        )}

        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Hostel Block A, Mumbai"
            required
          />
        </div>

        <div>
          <label>Image URLs (comma-separated)</label>
          <textarea
            name="images"
            value={formData.images}
            onChange={handleChange}
            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Publishing..." : "Publish Product"}
        </button>

        <Link to="/marketplace">Cancel</Link>
      </form>
    </div>
  );
}

export default AddProduct;
