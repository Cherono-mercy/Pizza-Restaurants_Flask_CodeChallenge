from app import create_app, db
from models import Restaurant, Pizza, RestaurantPizza

app = create_app()

with app.app_context():
    # Create tables
    db.create_all()

    # Add sample data
    pizza_margherita = Pizza(name='Margherita', ingredients='Tomato, Mozzarella, Basil')
    pizza_pepperoni = Pizza(name='Pepperoni', ingredients='Tomato, Mozzarella, Pepperoni')

    db.session.add_all([pizza_margherita, pizza_pepperoni])
    db.session.commit()

    restaurant_one = Restaurant(name='Pizza Palace', address='123 Main St')
    restaurant_two = Restaurant(name='Cheese Haven', address='456 Oak St')

    db.session.add_all([restaurant_one, restaurant_two])
    db.session.commit()

    # Adding relationship data
    restaurant_pizza_one = RestaurantPizza(restaurant=restaurant_one, pizza=pizza_margherita, price=10)
    restaurant_pizza_two = RestaurantPizza(restaurant=restaurant_one, pizza=pizza_pepperoni, price=15)
    restaurant_pizza_three = RestaurantPizza(restaurant=restaurant_two, pizza=pizza_margherita, price=12)

    db.session.add_all([restaurant_pizza_one, restaurant_pizza_two, restaurant_pizza_three])
    db.session.commit()

print("Database seeded successfully!")
