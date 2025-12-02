import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";

function App() {
  return (
    <div className="container py-4">
      <header className="d-flex flex-column flex-md-row align-items-center mb-4 border-bottom pb-3">
        <Link to="/" className="text-decoration-none">
          <span className="fs-3 fw-bold text-primary">EasyEats</span>
        </Link>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe" element={<RecipeDetails />} />
      </Routes>
    </div>
  );
}

export default App;
