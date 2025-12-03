import { useState } from "react";

function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="search-card d-flex flex-column flex-md-row gap-2 mb-4">
      <input
        type="text"
        className="form-control search-input"
        placeholder="Search recipes by ingredient (e.g., chicken, tofu)"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button type="submit" className="btn btn-primary search-btn btn-glow">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
