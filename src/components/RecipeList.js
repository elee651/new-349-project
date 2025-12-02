import RecipeCard from "./RecipeCard";

function RecipeList({ recipes, query }) {
  if (!recipes.length && query) {
    return <p>No recipes found for "{query}". Try another ingredient.</p>;
  }

  if (!recipes.length && !query) {
    return <p>Start by searching for an ingredient above.</p>;
  }

  return (
    <div className="row">
      {recipes.map((item, index) => (
        <div className="col-sm-6 col-md-4 mb-4" key={index}>
          <RecipeCard recipe={item.recipe} />
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
