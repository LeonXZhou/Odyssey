const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(
      `SELECT gear_items.name AS gear_item, gear_categories.name AS catergory , trips.id , trips.name
    FROM gear_items
    JOIN gear_categories on gear_items.gear_category_id=gear_categories.id
    JOIN trips ON gear_categories.trip_id = trips.id
    ;
    
    `
    )
      .then((data) => {
        const allEquipment = data.rows;
        console.log(allEquipment);
        res.json(allEquipment);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
