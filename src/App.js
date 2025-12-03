import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import DailyIntake from "./pages/DailyIntake";
import { CalorieProvider, useCalories } from "./components/CalorieContext";
import "./index.css";

function Header() {
  const { selectedFoods } = useCalories();

  const totalCalories = selectedFoods.reduce(
    (sum, food) => sum + Math.round(food.calories),
    0
  );

  return (
    <header className="app-header py-3">
      <div className="container-narrow d-flex flex-column flex-md-row align-items-center justify-content-between">
        <Link to="/" className="brand">
          <span className="brand-badge" />
          <span className="fs-4 fw-bold">EasyEats</span>
        </Link>

        <nav className="d-flex align-items-center gap-2 mt-3 mt-md-0">
          <Link to="/" className="btn btn-outline-light">Search</Link>
          <Link to="/intake" className="btn btn-warning fw-bold">
            My Intake ({totalCalories} cal)
          </Link>
        </nav>
      </div>
    </header>
  );
}

function App() {
  return (
    <CalorieProvider>
      <div className="app-shell">
        <Router>
          <Header />

          <main className="py-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipe" element={<RecipeDetails />} />
              <Route path="/intake" element={<DailyIntake />} />
            </Routes>
          </main>

          <footer className="app-footer py-3">
            <div className="container-narrow d-flex justify-content-between">
              <span>© {new Date().getFullYear()} EasyEats</span>
              <span className="muted">Made with React</span>
            </div>
          </footer>
        </Router>
      </div>
    </CalorieProvider>
  );
}

export default App;
