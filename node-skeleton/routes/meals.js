const { query } = require("express");
const express = require("express");
const router = express.Router();

function getMealsInfo(db) {
  const query = `SELECT  meals.id AS meals_id ,meals.name AS meal, meal_items.id AS meal_itemID,meal_items.name AS food_item, meal_items.quantity, days.date AS days_date , days.id AS days_id
FROM meal_items
JOIN meals on meal_items.meal_id=meals.id
JOIN days on meals.day_id=days.id
;
`;
  return db.query(query);
}
function insertNewMeal(db, day_id, name) {
  const query = `INSERT INTO meals (day_id , name)
  VALUES($1,$2);`;
  const values = [day_id, name];
  console.log("FUNCTION");
  return db.query(query, values);
}

function updateMealItems(db, mealName, mealId, mealQuantity) {
  console.log("ITEM NAME ITEM NAME", mealName);
  console.log("ITEM ID ITEM ID", mealId);
  console.log("ITEM QUANTITY", mealQuantity);
  const query = `
  UPDATE meal_items
  SET name = $1,
      quantity = $3
  WHERE id = $2;`;
  const values = [mealName, mealId, mealQuantity];
  return db.query(query, values);
}
function updateMealsName(db, day_id, name) {
  const query = `UPDATE meals
  SET name = $1
  WHERE id = $2;`;
  const values = [name, day_id];
  return db.query(query, values);
}
function insertNewMealItem(db, mealItemName, mealItemQuantity, meal_id) {
  const query = `INSERT INTO mea_items (name,quantity,meal_id)
                VALUES ($1 ,$2 ,$3);
  `;
  const values = [mealItemName, mealItemQuantity, meal_id];
  return db.query(query, values);
}
function deleteMealItems(db, meal_id) {
  const query = `
    DELETE FROM meal_items
    WHERE id =$1;
   `;
  const values = [meal_id];
  return db.query(query, values);
}
function getMealsForTrip(db, trip_id) {
  const query = `SELECT  meals.id AS meals_id ,meals.name AS meal, meal_items.id AS meal_itemID,meal_items.name AS food_item, meal_items.quantity, days.date AS days_date , days.id AS days_id
  FROM meal_items
  FULL OUTER JOIN meals on meal_items.meal_id=meals.id
  JOIN days on meals.day_id=days.id
  JOIN trips on days.trip_id=trips.id
  where trips.id = $1;
  `;
  const values = [trip_id];
  return db.query(query, values);
}

module.exports = (db) => {
  router.get("/:trip_id", (req, res) => {
    console.log("I got the request");
    getMealsForTrip(db, req.params.trip_id)
      .then((data) => {
        res.send(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/", (req, res) => {
    getMealsInfo(db)
      .then((data) => {
        res.send(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/:trip_id", (req, res) => {
    console.log("this is the post request", req.body);
    res.send("success");
  });
  
  router.post("/:day_id/meals", (req, res) => {
    insertNewMeal(db, req.params.day_id, req.body.name)
      .then(() => {
        res.send("success");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/:day_id/meals/:meals_id", (req, res) => {
    insertNewMealItem(
      db,
      req.params.meal_id,
      req.params.name,
      req.params.quantity
    );

    console.log(req.body);
  });

  return router;
};
