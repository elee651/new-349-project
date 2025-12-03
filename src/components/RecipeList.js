import RecipeCard from "./RecipeCard";

function RecipeList({ recipes, query }) {
  if (!recipes.length && query) {
    return <p>No recipes found for "{query}". Try another ingredient.</p>;
  }

  if (!recipes.length && !query) {
    return <p>Start by searching for an ingredient above.</p>;
  }

  return (
    <div className="grid grid-3">
      {recipes.map((item, index) => (
        <RecipeCard recipe={item.recipe} key={index} />
      ))}
    </div>
  );
}

export default RecipeList;
