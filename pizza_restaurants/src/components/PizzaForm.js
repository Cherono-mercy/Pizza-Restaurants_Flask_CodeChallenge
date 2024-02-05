import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function PizzaForm({ onAddPizza }) {
  const [pizzas, setPizzas] = useState([]);
  const [pizzaId, setPizzaId] = useState("");
  const [price, setPrice] = useState("");
  const [formErrors, setFormErrors] = useState([]);
  const location = useLocation();
  
  // Extract restaurant ID from the URL
  const restaurantId = new URLSearchParams(location.search).get("restaurant_id");

  useEffect(() => {
    fetch("/pizzas")
      .then((response) => response.json())
      .then((data) => {
        setPizzas(data);
      })
      .catch((error) => {
        console.error("Error fetching pizzas:", error);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      pizza_id: pizzaId,
      price: parseInt(price),
      restaurant_id: restaurantId, // Include restaurant ID in the form data
    };
    fetch("/restaurant_pizzas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add pizza to restaurant");
        }
        return response.json();
      })
      .then((newPizza) => {
        onAddPizza(newPizza);
        setFormErrors([]);
      })
      .catch((error) => {
        console.error("Error adding pizza to restaurant:", error);
        setFormErrors(["Failed to add pizza to restaurant"]);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="pizza_id">Pizza:</label>
      <select
        id="pizza_id"
        name="pizza_id"
        value={pizzaId}
        onChange={(e) => setPizzaId(e.target.value)}
      >
        <option value="">Select a pizza</option>
        {pizzas.map((pizza) => (
          <option key={pizza.id} value={pizza.id}>
            {pizza.name}
          </option>
        ))}
      </select>
      <label htmlFor="price">Price:</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {formErrors.length > 0 &&
        formErrors.map((err, index) => (
          <p key={index} style={{ color: "red" }}>
            {err}
          </p>
        ))}
      <button type="submit">Add To Restaurant</button>
    </form>
  );
}

export default PizzaForm;
