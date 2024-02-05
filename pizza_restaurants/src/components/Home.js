// Home.js
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch("/restaurants")
      .then((r) => r.json())
      .then(setRestaurants);
  }, []);

  return (
    <section className="container">
      {restaurants.map((restaurant) => (
        <div key={restaurant.id} className="card">
          <h2>
            <Link to={`/restaurants/${restaurant.id}`}>{restaurant.name}</Link>
          </h2>
          <p>Address: {restaurant.address}</p>
        </div>
      ))}
    </section>
  );
}

export default Home;
