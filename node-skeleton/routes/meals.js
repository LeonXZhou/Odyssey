const express = require("express");
const router = express.Router();


function getMealsForTrip(db, trip_id) {
  const query = `SELECT  meals.id AS meals_id ,meals.name AS meal, meal_items.id AS meal_itemID,meal_items.name AS food_item, meal_items.quantity, days.date AS days_date , days.id AS days_id
  FROM meal_items
  FULL OUTER JOIN meals on meal_items.meal_id=meals.id
  JOIN days on meals.day_id=days.id
  JOIN trips on days.trip_id=trips.id
  where trips.id = $1;
  `;
  const values = [trip_id]
  return db.query(query, values);
}


module.exports = (db) => {
  router.get("/:trip_id", (req, res) => {
    console.log('I got the request')
    getMealsForTrip(db,req.params.trip_id)
      .then((data) => {
        res.send(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
