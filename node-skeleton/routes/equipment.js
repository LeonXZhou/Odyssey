const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/:trip_id", (req, res) => {
    const query = `SELECT gear_items.name AS gear_item, gear_items.quantity,gear_categories.name AS catergory, trips.id as id , trips.name, gear_categories.id as category_id, gear_items.id as item_id
    FROM gear_items
    FULL OUTER JOIN gear_categories on gear_items.gear_category_id=gear_categories.id
    JOIN trips ON gear_categories.trip_id = trips.id
    WHERE trips.id = $1;`;
    const values = [req.params.trip_id];
    db.query(query, values)
      .then((req) => {
        res.json(req.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
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

  router.post("/delete/:trip_id/:category_id", (req, res) => {
    console.log("this is the delete request");
    const query = `DELETE FROM gear_categories
                  WHERE(trip_id = $1 AND id = $2);`;
    const values = [req.params.trip_id, req.params.category_id];
    console.log(values);
    db.query(query, values)
      .then(() => {
        res.send("success");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/delete/:item_id", (req, res) => {
    console.log("this is the delete request");
    const query = `DELETE FROM gear_items
                  WHERE id=$1;`;
    const values = [req.params.item_id];
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
};
