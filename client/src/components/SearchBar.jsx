import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    navigate(`/hostels?location=${encodeURIComponent(location)}`);
  };

  return (
    <form className="search-box" onSubmit={handleSearch}>
      <div className="search-field">
        <span>📍</span>

        <div>
          <label>Location</label>
          <input
            type="text"
            placeholder="Enter city or college"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      <div className="search-field">
        <span>💰</span>

        <div>
          <label>Budget</label>

          <select defaultValue="">
            <option value="" disabled>
              Select budget
            </option>
            <option>Below ₹5,000</option>
            <option>₹5,000 - ₹8,000</option>
            <option>₹8,000 - ₹12,000</option>
            <option>Above ₹12,000</option>
          </select>
        </div>
      </div>

      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}

export default SearchBar;