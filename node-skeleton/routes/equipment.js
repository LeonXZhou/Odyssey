const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/:trip_id", (req, res) => {
    const query = `SELECT gear_items.name AS gear_item, gear_items.quantity,gear_categories.name AS catergory, trips.id as id , trips.name, gear_categories.id as category_id, gear_items.id as item_id
    FROM gear_items
    JOIN gear_categories on gear_items.gear_category_id=gear_categories.id
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

  return router;
};

// router.put("/:trip_id/quantities", (req, res) => {
//   const query = `UPDATE gear_items SET quantity = $1 WHERE name = $2;`;
//   const values = [quantity, gear_name];
//   db.query(query, values)
//     .then((req) => {
//       res.json(req.rows);
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err.message });
//     });
// });
