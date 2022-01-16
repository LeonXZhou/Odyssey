const express = require("express");
const router = express.Router();

// const accountSid = "ACab6e2eae17eb65bd94de329bf0201591";
// const authToken = "ee9c5fd4448f2a0942a21c13628dd3f9";
// const client = require("twilio")(accountSid, authToken);
// const cron = require("node-cron");

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT  trips.id AS trip_ID,meals.id AS meals_id ,meals.name AS meal, meal_items.id AS meal_itemID,meal_items.name AS food_item, meal_items.quantity, days.date AS days_date , days.id AS days_id
    FROM meal_items
    JOIN meals on meal_items.meal_id=meals.id
    JOIN days on meals.day_id=days.id
    JOIN trips ON days.trip_id=trips.id;

    `)
      .then(data => {
        const allMeals = data.rows;
        console.log(allMeals);
        res.json(allMeals);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
