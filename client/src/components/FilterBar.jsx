function FilterBar({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      gender: "",
      roomType: "",
      facility: "",
      maxRent: "",
    });
  };

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>Filters</h3>

        <button type="button" onClick={clearFilters}>
          Clear All
        </button>
      </div>

      <div className="filter-group">
        <label>Gender</label>

        <select
          name="gender"
          value={filters.gender}
          onChange={handleChange}
        >
          <option value="">All</option>
          <option value="Boys">Boys</option>
          <option value="Girls">Girls</option>
          <option value="Co-ed">Co-ed</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Room Type</label>

        <select
          name="roomType"
          value={filters.roomType}
          onChange={handleChange}
        >
          <option value="">All</option>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Triple">Triple</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Maximum Rent</label>

        <select
          name="maxRent"
          value={filters.maxRent}
          onChange={handleChange}
        >
          <option value="">Any Budget</option>
          <option value="5000">₹5,000</option>
          <option value="7000">₹7,000</option>
          <option value="8000">₹8,000</option>
          <option value="10000">₹10,000</option>
          <option value="15000">₹15,000</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Facility</label>

        <select
          name="facility"
          value={filters.facility}
          onChange={handleChange}
        >
          <option value="">All Facilities</option>
          <option value="Wi-Fi">Wi-Fi</option>
          <option value="Food">Food</option>
          <option value="AC">AC</option>
          <option value="Laundry">Laundry</option>
          <option value="CCTV">CCTV</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;