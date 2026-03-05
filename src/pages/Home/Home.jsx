import React, { useContext, useState } from "react";
// import { properties } from "../../data/properties";
import PropertyContext from "../../Context/PropertyContext.jsx";
import PropertyCard from "../../component/PropertyCard/PropertyCard";
import styles from "./Home.module.css";
import MapView from "../../component/MapView/MapView.jsx";
import { NavLink } from "react-router-dom";
import AuthContext from "../../Context/AuthContext.jsx";

const Home = () => {
  const { properties } = useContext(PropertyContext);
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [configuration, setConfiguration] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [possession, setPossession] = useState("");
  const [view, setView] = useState("list");

  const filteredProperties = properties.filter((property) => {
    const locationMatch =
      property.city.toLowerCase().includes(search.toLowerCase()) ||
      property.locality.toLowerCase().includes(search.toLowerCase()) ||
      property.state.toLowerCase().includes(search.toLowerCase());

    const configMatch =
      !configuration || property.configuration === configuration;

    const possessionMatch = !possession || property.possession === possession;

    const minMatch = !minBudget || property.price >= Number(minBudget);

    const maxMatch = !maxBudget || property.price <= Number(maxBudget);

    return (
      property.approved &&
      locationMatch &&
      configMatch &&
      possessionMatch &&
      minMatch &&
      maxMatch
    );
  });

  return (
    <div className="page-container">
      <div className={styles.heading}>
        <h2>Find Your Dream Home</h2>
        {user && (
          <NavLink
            to={`${user.role === "buyer" ? "/buyer-dashboard" : "/seller-dashboard"}`}>
            Go to DashBoard
          </NavLink>
        )}
      </div>
      <input
        type="text"
        placeholder="Search by City, Locality, State..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles["search-input"]}
      />
      <div className={styles["filters"]}>
        <select onChange={(e) => setConfiguration(e.target.value)}>
          <option value="">Configuration</option>
          <option value="1BHK">1BHK</option>
          <option value="2BHK">2BHK</option>
          <option value="3BHK">3BHK</option>
          <option value="3BHK">4BHK</option>
        </select>
        <input
          type="number"
          placeholder="Min Budget"
          onChange={(e) => setMinBudget(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Budget"
          onChange={(e) => setMaxBudget(e.target.value)}
        />
        <select onChange={(e) => setPossession(e.target.value)}>
          <option value="">Possession</option>
          <option value="Ready">Ready</option>
          <option value="6 Months">6 Months</option>
          <option value="1 Year">1 Year</option>
        </select>
        <button
          className={styles["toggle-btn"]}
          onClick={() => setView(view === "list" ? "map" : "list")}>
          {view === "list" ? "Map View" : "List View"}
        </button>
      </div>
      {view === "list" ? (
        <div className={styles["grid"]}>
          {filteredProperties.length ? (
            filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <p>No properties found</p>
          )}
        </div>
      ) : (
        <MapView properties={filteredProperties} />
      )}
    </div>
  );
};

export default Home;
