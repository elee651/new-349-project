import { useCalories } from "../components/CalorieContext";

export default function DailyIntake() {
  const { selectedFoods, removeFood } = useCalories();

  const totalCalories = selectedFoods.reduce(
    (sum, food) => sum + Math.round(food.calories),
    0
  );

  return (
    <div className ="text-center">
      <h2>My Daily Calorie Intake</h2>

      {!selectedFoods.length && <p>No foods added yet.</p>}

      {selectedFoods.map((food, index) => (
        <div key={index} className="card p-2 mb-2">
          <strong>{food.label}</strong> — {Math.round(food.calories)} cal
          <button
            className="btn btn-danger btn-sm float-end"
            onClick={() => removeFood(food.label)}
          >
            ✖ remove
          </button>
        </div>
      ))}

      {selectedFoods.length > 0 && (
        <h4 className="mt-4">TOTAL: {totalCalories} calories</h4>
      )}
    </div>
  );
}
