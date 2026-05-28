import React, { useState } from "react";
function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedCity = city.trim();
    if (trimmedCity) onSearch(trimmedCity);
  };
  const inputStyle = {
    padding: "8px 12px",
    fontSize: "1rem",
    borderRadius: "6px 0 0 6px",
    border: "1px solid #ccc",
    outline: "none",
    width: "200px",
  };
  const buttonStyle = {
    padding: "8px 16px",
    fontSize: "1rem",
    borderRadius: "0 6px 6px 0",
    border: "1px solid #0077ff",
    backgroundColor: "#0077ff",
    color: "#fff",
    cursor: city.trim() ? "pointer" : "not-allowed",
  };
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "10vh",      
    backgroundColor: "#f8f8f8ff", 
  };
  return (
    <div style={containerStyle}>
      <form
        onSubmit={handleSubmit}
        className="search-bar"
        role="search"
        aria-label="City Search Form"
      >
        <label htmlFor="city-input" className="sr-only">
          <strong>CITY NAME :{" "}</strong>
        </label>
        <input
          id="city-input"
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={inputStyle}
          aria-required="true"
          aria-describedby="search-button"
        />
        <button
          id="search-button"
          type="submit"
          style={buttonStyle}
          disabled={!city.trim()}
          aria-disabled={!city.trim()}
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
