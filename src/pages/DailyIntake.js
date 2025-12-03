import { useCalories } from "../components/CalorieContext";

export default function DailyIntake() {
  const { selectedFoods, removeFood } = useCalories();

  const totalCalories = selectedFoods.reduce(
    (sum, food) => sum + Math.round(food.calories),
    0
  );

  return (
    <div className="container-narrow">
      <section className="hero">
        <h1 className="hero-title">My Daily Calorie Intake</h1>
        <p className="hero-sub">Track foods you’ve added from recipes.</p>
      </section>

      {!selectedFoods.length && (
        <div className="search-card">
          <p className="muted mb-0">No foods added yet.</p>
        </div>
      )}

      <div className="grid" style={{ gap: 12 }}>
        {selectedFoods.map((food, index) => (
          <div key={index} className="recipe-card p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong className="recipe-title">{food.label}</strong>
                <div className="muted">{Math.round(food.calories)} cal</div>
              </div>
              <button
                className="btn btn-danger btn-sm btn-glow"
                onClick={() => removeFood(food.label)}
              >
                ✖ remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedFoods.length > 0 && (
        <div className="recipe-card p-3 mt-3 d-flex justify-content-between align-items-center">
          <strong className="recipe-title">Total</strong>
          <span>{totalCalories} calories</span>
        </div>
      )}
    </div>
  );
}
