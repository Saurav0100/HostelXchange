function FilterBar() {
  return (
    <div className="filter-bar">
      <select defaultValue="">
        <option value="" disabled>
          Gender
        </option>
        <option>Boys</option>
        <option>Girls</option>
        <option>Co-ed</option>
      </select>

      <select defaultValue="">
        <option value="" disabled>
          Room Type
        </option>
        <option>Single</option>
        <option>Double</option>
        <option>Triple</option>
      </select>

      <select defaultValue="">
        <option value="" disabled>
          Facilities
        </option>
        <option>Wi-Fi</option>
        <option>Food</option>
        <option>AC</option>
        <option>Laundry</option>
      </select>
    </div>
  );
}

export default FilterBar;