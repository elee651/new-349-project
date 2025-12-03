import { useState } from "react";
import SearchBar from "../components/SearchBar";
import RecipeList from "../components/RecipeList";

const EDAMAM_ID = process.env.REACT_APP_EDAMAM_ID;
const EDAMAM_KEY = process.env.REACT_APP_EDAMAM_KEY;

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (searchTerm) => {
    if (!searchTerm) return;

    if (!EDAMAM_ID || !EDAMAM_KEY) {
      setError("Missing Edamam API keys. Check your .env file.");
      return;
    }

    setQuery(searchTerm);
    setLoading(true);
    setError("");
    setRecipes([]);

    try {
      const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(
        searchTerm
      )}&app_id=${EDAMAM_ID}&app_key=${EDAMAM_KEY}&random=false&field=label&field=image&field=source&field=url&field=calories&field=ingredientLines&field=yield&field=ingredients&field=totalTime&field=cuisineType&field=mealType&field=dishType`;

      const response = await fetch(url, { method: "GET" });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(
          `Failed to fetch recipes (${response.status}): ${text?.slice(0, 120)}`
        );
      }

      const data = await response.json();
      const hits = Array.isArray(data.hits) ? data.hits : [];
      setRecipes(hits);
    } catch (err) {
      setError(err?.message || "Network error: Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="hero container-narrow">
        <h1 className="hero-title">Discover Easy, Tasty Recipes</h1>
        <p className="hero-sub">Search by ingredient and save meals to your daily intake.</p>
      </section>

      <div className="container-narrow">
        <SearchBar onSearch={handleSearch} />

        {loading && <p className="muted">Loading recipes...</p>}
        {error && <p className="text-danger">{error}</p>}

        {!loading && !error && (
          <RecipeList recipes={recipes} query={query} />
        )}
      </div>
    </div>
  );
}

export default Home;
