import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    navigate(
      `/hostels?search=${encodeURIComponent(search)}`
    );
  };

  return (
    <form
      className="market-search"
      onSubmit={handleSearch}
    >

      <span className="search-icon">
        🔎
      </span>

      <input
        type="text"
        placeholder="Search for books, furniture, electronics..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <button type="submit">
        Search
      </button>

    </form>
  );
}

export default SearchBar;