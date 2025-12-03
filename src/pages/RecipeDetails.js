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
  } = recipe;

  return (
    <div>
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="card">
        <div className="row g-0">
          {image && (
            <div className="col-md-4">
              <img
                src={image}
                alt={label}
                className="img-fluid rounded-start"
              />
            </div>
          )}
          <div className={image ? "col-md-8" : "col-12"}>
            <div className="card-body">
              <h3 className="card-title">{label}</h3>
              <p className="card-text">
                <strong>Source:</strong> {source}
                <br />
                <strong>Calories:</strong> {Math.round(calories)}
              </p>

              <button
                className="btn btn-success mb-3"
                onClick={() => addFood({ label, calories })}
              >
                 Add to My Intake
              </button>

              {dietLabels && dietLabels.length > 0 && (
                <p>
                  <strong>Diet:</strong> {dietLabels.join(", ")}
                </p>
              )}

              {healthLabels && healthLabels.length > 0 && (
                <p>
                  <strong>Health:</strong> {healthLabels.join(", ")}
                </p>
              )}

              <h5>Ingredients</h5>
              <ul>
                {ingredientLines.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>

              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary mt-3"
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
