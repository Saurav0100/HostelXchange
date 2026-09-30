import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import hostels from "../data/hostels";
import HostelCard from "../components/HostelCard";
import FilterBar from "../components/FilterBar";

function Hostels() {
  const [searchParams] = useSearchParams();

  const initialLocation = searchParams.get("location") || "";

  const [search, setSearch] = useState(initialLocation);

  const [filters, setFilters] = useState({
    gender: "",
    roomType: "",
    facility: "",
    maxRent: "",
  });

  const filteredHostels = useMemo(() => {
    return hostels.filter((hostel) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        hostel.name.toLowerCase().includes(searchText) ||
        hostel.location.toLowerCase().includes(searchText) ||
        hostel.city.toLowerCase().includes(searchText);

      const matchesGender =
        !filters.gender || hostel.gender === filters.gender;

      const matchesRoomType =
        !filters.roomType || hostel.roomType === filters.roomType;

      const matchesFacility =
        !filters.facility ||
        hostel.facilities.includes(filters.facility);

      const matchesRent =
        !filters.maxRent || hostel.rent <= Number(filters.maxRent);

      return (
        matchesSearch &&
        matchesGender &&
        matchesRoomType &&
        matchesFacility &&
        matchesRent
      );
    });
  }, [search, filters]);

  return (
    <section className="listing-page">
      <div className="container">

        <div className="listing-header">
          <div>
            <span className="section-label">EXPLORE HOSTELS</span>

            <h1>Find Your Perfect Stay</h1>

            <p>
              Search and compare hostels and PGs based on your preferences.
            </p>
          </div>
        </div>

        <div className="listing-search">
          <span>🔎</span>

          <input
            type="text"
            placeholder="Search by hostel, city or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="listing-layout">

          <FilterBar
            filters={filters}
            setFilters={setFilters}
          />

          <div className="results-section">

            <div className="results-header">
              <h2>
                {filteredHostels.length} Hostels Found
              </h2>

              <span>
                {search ? `Results for "${search}"` : "All available hostels"}
              </span>
            </div>

            {filteredHostels.length > 0 ? (
              <div className="hostel-grid">
                {filteredHostels.map((hostel) => (
                  <HostelCard
                    key={hostel.id}
                    hostel={hostel}
                  />
                ))}
              </div>
            ) : (
              <div className="no-results">
                <div>🏠</div>

                <h3>No hostels found</h3>

                <p>
                  Try changing your search or filters.
                </p>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}

export default Hostels;