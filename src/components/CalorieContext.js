import { createContext, useContext, useState, useEffect } from "react";

export const CalorieContext = createContext();

export function CalorieProvider({ children }) {
  
  const storedFoods = JSON.parse(localStorage.getItem("selectedFoods")) || [];

  const [selectedFoods, setSelectedFoods] = useState(storedFoods);

  const addFood = (food) => {
    setSelectedFoods((prev) => [...prev, food]);
  };

  const removeFood = (label) => {
    setSelectedFoods((prev) => prev.filter((f) => f.label !== label));
  };

  
  useEffect(() => {
    localStorage.setItem("selectedFoods", JSON.stringify(selectedFoods));
  }, [selectedFoods]);

  return (
    <CalorieContext.Provider
      value={{ selectedFoods, addFood, removeFood }}
    >
      {children}
    </CalorieContext.Provider>
  );
}

export function useCalories() {
  return useContext(CalorieContext);
}
