SELECT meals.name AS meal, meal_items.name AS food_item, meal_items.quantity
FROM meal_items
JOIN meals on meal_items.meal_id=meals.id
WHERE meals.id =1;