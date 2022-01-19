const express = require("express");
const router = express.Router();

const getAllMeals = (db)=>{
const query = `SELECT  meals.id AS meals_id ,meals.name AS meal, meal_items.id AS meal_itemID,meal_items.name AS food_item, meal_items.quantity, days.date AS days_date , days.id AS days_id
FROM meal_items
JOIN meals on meal_items.meal_id=meals.id
JOIN days on meals.day_id=days.id
;
`
return db.query(query)
}

const insertIntoMeals = (db,id) =>{
 const query = `INSERT INTO meals (day_id , name)
                    VALUES(${values},lunch)`
const values = [id]
return db.query(query, values)
}


module.exports = (db) => {
  router.get("/", (req, res) => {
    getAllMeals(db)
    
      .then((data) => {
        const allMeals = data.rows;
        console.log(allMeals);
        res.json(allMeals);
        return;
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.post("/:trip_id/meals", (req, res) => {
    
   insertIntoMeals( db ,[req.params.trip_id] )
      .then((req) => {
      
        res.json(req.rows)
        return;
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;

};

