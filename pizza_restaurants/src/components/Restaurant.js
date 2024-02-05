// Restaurant.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PizzaForm from "./PizzaForm";

function Restaurant() {
  const [{ data: restaurant, error, status }, setRestaurant] = useState({
    data: null,
    error: null,
    status: "pending",
  });
  const { id } = useParams();

  useEffect(() => {
    fetch(`/restaurants/${id}`)
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        throw new Error("Failed to fetch restaurant");
      })
      .then((restaurant) => {
        setRestaurant({ data: restaurant, error: null, status: "resolved" });
      })
      .catch((error) => {
        setRestaurant({ data: null, error: error.message, status: "rejected" });
      });
  }, [id]);

  function handleDelete() {
    fetch(`/restaurants/${id}`, {
      method: "DELETE",
    })
    .then((response) => {
      if (response.ok) {
        // Redirect to home after successful deletion
        window.location.href = "/";
      } else {
        throw new Error("Failed to delete restaurant");
      }
    })
    .catch((error) => {
      console.error("Error deleting restaurant:", error);
    });
  }
  
  return (
    <section className="container">
      {status === "pending" && <h1>Loading...</h1>}
      {status === "rejected" && <h1>Error: {error}</h1>}
      {status === "resolved" && (
        <div>
          <div className="card">
            <h1>{restaurant.name}</h1>
            <p>Address: {restaurant.address}</p>
          </div>
          <div className="card">
            <h2>Pizza Menu</h2>
            {restaurant.pizzas.map((pizza) => (
              <div key={pizza.id}>
                <h3>{pizza.name}</h3>
                <p>
                  <em>{pizza.ingredients}</em>
                </p>
              </div>
            ))}
          </div>
          <div className="card">
            <h3>Add New Pizza</h3>
            <PizzaForm restaurantId={restaurant.id} />
          </div>
          <div className="card">
            <button onClick={handleDelete}>Delete Restaurant</button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Restaurant;
