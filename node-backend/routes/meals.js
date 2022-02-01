const { query } = require("express");
const express = require("express");
const axios = require("axios");
const router = express.Router();

// function getMealsInfo(db) {
//   const query = `SELECT  meals.id AS meals_id ,meals.name AS meal, meal_items.id AS meal_itemID,meal_items.name AS food_item, meal_items.quantity, days.date AS days_date , days.id AS days_id
// FROM meal_items
// JOIN meals on meal_items.meal_id=meals.id
// JOIN days on meals.day_id=days.id
// ;
// `;
//   return db.query(query);
// }

// function updateMealItems(db, mealName, mealId, mealQuantity) {
//   console.log("ITEM NAME ITEM NAME", mealName);
//   console.log("ITEM ID ITEM ID", mealId);
//   console.log("ITEM QUANTITY", mealQuantity);
//   const query = `
//   UPDATE meal_items
//   SET name = $1,
//       quantity = $3
//   WHERE id = $2;`;
//   const values = [mealName, mealId, mealQuantity];
//   return db.query(query, values);
// }
// function insertNewMealItem(db, mealItemName, mealItemQuantity, meal_id) {
//   const query = `INSERT INTO mea_items (name,quantity,meal_id)
//                 VALUES ($1 ,$2 ,$3);
//   `;
//   const values = [mealItemName, mealItemQuantity, meal_id];
//   return db.query(query, values);
// }
// function deleteMealItems(db, meal_id) {
//   const query = `
//     DELETE FROM meal_items
//     WHERE id =$1;
//    `;
//   const values = [meal_id];
//   return db.query(query, values);
// }
function insertNewMeal(db, day_id, name) {
  const query = `INSERT INTO meals (day_id , name)
        VALUES($1,$2);`;
  const values = [day_id, name];
  console.log("FUNCTION");
  return db.query(query, values);
}
function getMealsForTrip(db, trip_id) {
  const query = `SELECT  meals.id AS meals_id ,meals.name AS meal, meal_items.id AS meal_itemID,meal_items.name AS food_item, meal_items.quantity, days.date AS days_date , days.id AS days_id,trips.id AS trip_id
  FROM meal_items
  FULL OUTER JOIN meals on meal_items.meal_id=meals.id
  FULL OUTER JOIN days on meals.day_id=days.id
  JOIN trips on days.trip_id=trips.id
  where trips.id = $1
  ORDER BY meals.id;
  `;
  const values = [trip_id];
  return db.query(query, values);
}

function updateMealName(db, mealId, name) {
  const query = `UPDATE meals
  SET name = $1
  WHERE id = $2;`;
  const values = [name, mealId];
  return db.query(query, values);
}

function updateItems(db, itemName, itemId, itemQuantity) {
  const query = `
  UPDATE meal_items
  SET name = $1,
      quantity = $3
  WHERE id = $2;`;
  const values = [itemName, itemId, itemQuantity];
  return db.query(query, values);
}

function insertNewItem(db, itemName, itemQuantity, mealId) {
  console.log(
    "ASDFASDFASDFASDF IO RAN RJNAJNDERJJSDUJUWUERUUWESG ASDJFASJDF AS DASDFAS D"
  );
  const query = `INSERT INTO meal_items (name,quantity,meal_id)
              VALUES ($1 ,$2 ,$3);
`;
  const values = [itemName, itemQuantity, mealId];
  return db.query(query, values);
}

function deleteItems(db, item_id) {
  const query = `
  DELETE FROM meal_items
  WHERE id =$1;
 `;
  const values = [item_id];
  return db.query(query, values);
}

function deleteMeal(db, meal_id) {
  const query = `
  DELETE FROM meals
  WHERE id =$1;
 `;
  const values = [meal_id];
  return db.query(query, values);
}

module.exports = (db) => {
  router.get("/:trip_id", (req, res) => {
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

  router.post("/:day_id/meals", (req, res) => {
    insertNewMeal(db, req.params.day_id, req.body.name)
      .then(() => {
        res.send("success");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/:day_id/:meals_id", (req, res) => {
    const allQueryPromises = [];
    allQueryPromises.push(
      updateMealName(db, req.params.meals_id, req.body.meal_name)
    );

    const itemsToUpdate = req.body.updateItems;
    for (const updateItemKey in itemsToUpdate) {
      if (
        Number(itemsToUpdate[updateItemKey].quantity) !== 0 &&
        itemsToUpdate[updateItemKey].quantity !== "0" &&
        itemsToUpdate[updateItemKey].quantity !== ""
      ) {
        allQueryPromises.push(
          updateItems(
            db,
            itemsToUpdate[updateItemKey].name,
            updateItemKey,
            itemsToUpdate[updateItemKey].quantity
          )
        );
      } else {
        allQueryPromises.push(deleteItems(db, updateItemKey));
      }
    }

    const newItems = req.body.newItems;

    for (const newItemKey in newItems) {
      if (newItems[newItemKey].quantity) {
        console.log("for looopppp", req.body.newItems);
        allQueryPromises.push(
          insertNewItem(
            db,
            newItems[newItemKey].name,
            newItems[newItemKey].quantity,
            req.params.meals_id
          )
        );
      }
    }

    Promise.all(allQueryPromises).then(() => {
      console.log("all inserts worked");
      res.send("success");
    });
    console.log(req.body);
  });

  router.delete("/meal_items/:meal_item_id", (req, res) => {
    deleteItems(db, req.params.meal_item_id).then(res.send("success"));
  });
  router.delete("/:meal_id", (req, res) => {
    deleteMeal(db, req.params.meal_id).then(res.send("success"));
  });

  router.post("/nutrition", (req, res) => {
    // res.send({
    //   calories: 0,
    //   weight: 0,
    // });
    console.log("this is nutrion baby", req.body.search);
    axios
      .post(
        "https://trackapi.nutritionix.com/v2/natural/nutrients",
        {
          query: req.body.search,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-app-id": process.env.NUTRITION_ID,
            "x-app-key": process.env.NUTRITION_API,
            "x-remote-user-id": 0,
          },
        }
      )
      .then((data) => {
        console.log(data.data.foods);
        let totalWeight = 0;
        let totalCalories = 0;
        for (const food of data.data.foods) {
          totalWeight += food.serving_weight_grams;
          totalCalories += food.nf_calories;
        }
        res.send({
          calories: totalCalories,
          weight: totalWeight,
        });
      })
      .catch((e) => {
        console.log(e);
        res.send({
          calories: "",
          weight: "",
        });
      });
  });

  return router;
};
