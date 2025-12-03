import { Link } from "react-router-dom";
import { useCalories } from "../components/CalorieContext";

function RecipeCard({ recipe }) {
  const { label, image, calories, source } = recipe;
  const { addFood } = useCalories();  

  return (
    <div className="recipe-card h-100">
      {image && (
        <img
          src={image}
          className="card-img-top recipe-img"
          alt={label}
          style={{ objectFit: "cover" }}
        />
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title recipe-title">{label}</h5>
        <p className="card-text muted">
          Source: {source}
          <br />
          Calories: {Math.round(calories)}
        </p>

        <button
          className="btn btn-success mb-2 btn-wide btn-glow"
          onClick={() => addFood({ label, calories })}
        >
           Add to My Intake
        </button>

        <Link
          to="/recipe"
          state={{ recipe }}
          className="btn btn-outline-primary mt-auto btn-wide btn-glow"
        >
          View details
        </Link>
      </div>
    </div>
  );
}

export default RecipeCard;
