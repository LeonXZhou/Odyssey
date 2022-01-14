const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT gear_items.name AS gear_item, gear_categories.name AS catergory
    FROM gear_items
    JOIN gear_categories on gear_items.gear_category_id=gear_categories.id
    where gear_categories.id = 1;`)
      .then(data => {
        const users = data.rows;
        console.log(users.email)
        res.json({ users});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
