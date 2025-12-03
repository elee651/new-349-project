import { useLocation, useNavigate } from "react-router-dom";
import { useCalories } from "../components/CalorieContext";

function RecipeDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addFood } = useCalories();  

  const recipe = location.state?.recipe;

  if (!recipe) {
    return (
      <div>
        <p>No recipe selected. Please go back and choose a recipe.</p>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/")}
        >
          Back to search
        </button>
      </div>
    );
  }

  const {
    label,
    image,
    calories,
    ingredientLines,
    dietLabels,
    healthLabels,
    url,
    source,
    yield: servings,
    totalTime,
    cuisineType,
    mealType,
    dishType,
  } = recipe;

  const displayIngredients = Array.isArray(recipe.ingredients) && recipe.ingredients.length
    ? recipe.ingredients.map((i) => i.text)
    : ingredientLines;

  const chips = [
    servings ? `${servings} servings` : null,
    totalTime ? `${totalTime} min` : null,
    cuisineType?.length ? `Cuisine: ${cuisineType.join(", ")}` : null,
    mealType?.length ? `Meal: ${mealType.join(", ")}` : null,
    dishType?.length ? `Dish: ${dishType.join(", ")}` : null,
  ].filter(Boolean);

  return (
    <div className="container-wide">
      <button
        className="btn btn-outline-light mb-3"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="recipe-detail-card">
        <div className="row g-0">
          {image && (
            <div className="col-md-5">
              <img src={image} alt={label} className="img-fluid recipe-img-lg" />
            </div>
          )}
          <div className={image ? "col-md-7" : "col-12"}>
            <div className="card-body">
              <h3 className="card-title recipe-title">{label}</h3>
              <p className="card-text muted">Source: {source}<br />Calories: {Math.round(calories)}</p>

              {chips.length > 0 && (
                <div className="chips">
                  {chips.map((c, idx) => (
                    <span key={idx} className="chip">{c}</span>
                  ))}
                </div>
              )}

              <button
                className="btn btn-success mb-3 btn-glow btn-wide"
                onClick={() => addFood({ label, calories })}
              >
                 Add to My Intake
              </button>

              {dietLabels && dietLabels.length > 0 && (
                <p className="muted">Diet: {dietLabels.join(", ")}</p>
              )}

              {healthLabels && healthLabels.length > 0 && (
                <p className="muted">Health: {healthLabels.join(", ")}</p>
              )}

              <h5 className="mt-3">Ingredients</h5>
              <ul>
                {displayIngredients.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>

              <h5 className="mt-3">Instructions</h5>
              <p className="muted">Full step-by-step instructions are available from the source below.</p>

              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary mt-3 btn-glow btn-wide"
              >
                Open full recipe (instructions)
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
