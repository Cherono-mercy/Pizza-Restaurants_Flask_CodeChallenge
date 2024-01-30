import { Routes, Route } from "react-router-dom";
// import Header from "./Header";
import Restaurant from "./Restaurant";
import Home from "./Home";
import PizzaForm from "./PizzaForm";

function App() {
  return (
    <div>
      {/* <Header /> */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant_pizzas/new" element={<PizzaForm />} />
          <Route path="/restaurants/:id" element={<Restaurant />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
