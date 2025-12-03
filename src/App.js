import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import DailyIntake from "./pages/DailyIntake";
import { CalorieProvider, useCalories } from "./components/CalorieContext";

function Header() {
  const { selectedFoods } = useCalories();

  const totalCalories = selectedFoods.reduce(
    (sum, food) => sum + Math.round(food.calories),
    0
  );

  return (
    <header className="d-flex flex-column flex-md-row align-items-center mb-4 border-bottom pb-3">
      <Link to="/" className="text-decoration-none">
        <span className="fs-3 fw-bold text-primary">EasyEats</span>
      </Link>

      <Link
        to="/intake"
        className="ms-md-3 mt-2 mt-md-0 btn btn-warning fw-bold"
      >
        My Intake ({totalCalories} cal)
      </Link>
    </header>
  );
}

function App() {
  return (
    <CalorieProvider>
      <Router>
        <div className="container py-4">

          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe" element={<RecipeDetails />} />
            <Route path="/intake" element={<DailyIntake />} />
          </Routes>

        </div>
      </Router>
    </CalorieProvider>
  );
}

export default App;
