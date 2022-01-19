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
function insertNewMeal(db,day_id,name){
  const query =`INSERT INTO gear_categories (trip_id , name)
  VALUES($1,$2)`;
  const values = [day_id,name]
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
function insertNewMealItem (db ,mealItemName ,mealItemQuantity ,meal_id){

  const query = `INSERT INTO mea_items (name,quantity,meal_id)
                VALUES ($1 ,$2 ,$3);
  `
  const values = [mealItemName,mealItemQuantity, meal_id]
  return db.query(query,values) 
  }
  function deleteMealItems(db, meal_id) {
    const query = `
    DELETE FROM meal_items
    WHERE id =$1;
   `;
    const values = [meal_id];
    return db.query(query, values);
  }

module.exports = (db) => {
  router.get("/", (req, res) => {
   getMealsInfo(db)
      .then((data) => {
        const allMeals = data.rows;
        console.log(allMeals);
        res.json(allMeals);
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
    insertNewMeal(db ,req.params.day_id,req.params.name)

    console.log(req.body);
    
    
  });
  router.post("/:day_id/meals/:meals_id", (req, res) => {
    insertNewMealItem(db ,req.params.meal_id,req.params.name ,req.params.quantity)

    console.log(req.body);
    
    
  });

  return router;
};
