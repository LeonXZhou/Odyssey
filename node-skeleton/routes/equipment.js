const express = require("express");
const router = express.Router();

const getEquipmentById = (db,tripID) => {
  const query = `SELECT gear_items.name AS gear_item, gear_items.quantity,gear_categories.name AS catergory, trips.id , trips.name
  FROM gear_items
  JOIN gear_categories on gear_items.gear_category_id=gear_categories.id
  JOIN trips ON gear_categories.trip_id = trips.id
  WHERE trips.id = $1;`;
  const values = [tripID];
  return db.query(query, values);
};
const insertEquipmentItem = (db, categoryId, name, quantity) => {
  const query = `INSERT INOT gear_items (gear_category_id, name ,quantity)
              VALUES ($2 ,$3 ,$4 )`;
  const values = [db, categoryId, name, quantity];
  return db.query(query, values);
};
// -----------------------------------TESTING
const updateTripItems = (db,name,id) => {
  const query = `UPDATE gear_categories
              SET name= $2
              WHERE id=$1`;
  const values = [id ,name ]          
  return db.query(query, values)
};





// req.body = {category:{name}, updatedItems{0:{name,quantity,itemId}} newItems={0:{name,quantity}}} items can have 0-N keys
// -----------------------------------------------

module.exports = (db) => {
  router.get("/:trip_id", (req, res) => {
    getEquipmentById(db)
      .then((req) => {
        res.json(req.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });

    router.post("/:trip_id/new_equipment", (req, res) => {
      console.log(req);
      insertEquipmentItem = (db, req.categoryId, req.name, req.quantity);
    });
    

    router.post("/:trip_id/:categoryid", (req, res)=>{
      console.log(req.body);
    }) 
  });

  router.post("/:trip_id", (req, res) => {
    console.log("this is the post request", req.body[1].items);
    res.send("success");
  });

  router.post("/:trip_id/category", (req, res) => {
    const query = `INSERT INTO gear_categories (trip_id , name)
                    VALUES($1,$2)`;
    const values = [req.params.trip_id, req.body.name];
    console.log(values);
    db.query(query, values)
      .then(() => {
        res.send("success");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;

  return router;
};
