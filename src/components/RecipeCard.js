import { Link } from "react-router-dom";
import { useCalories } from "../components/CalorieContext";

function RecipeCard({ recipe }) {
  const { label, image, calories, source } = recipe;
  const { addFood } = useCalories();  

  return (
    <div className="card h-100">
      {image && (
        <img
          src={image}
          className="card-img-top"
          alt={label}
          style={{ objectFit: "cover", height: "200px" }}
        />
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{label}</h5>
        <p className="card-text">
          <strong>Source:</strong> {source}
          <br />
          <strong>Calories:</strong> {Math.round(calories)}
        </p>

        <button
          className="btn btn-success mb-2"
          onClick={() => addFood({ label, calories })}
        >
           Add to My Intake
        </button>

        <Link
          to="/recipe"
          state={{ recipe }}
          className="btn btn-outline-primary mt-auto"
        >
          View details
        </Link>
      </div>
    </div>
  );
}

export default RecipeCard;
