const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.post("/:trip_id/category", (req, res) => {
    const query = `INSERT INTO gear_categories (trip_id , name)
                    VALUES(2,sock)`
    const values = [req.params.trip_id]
    console.log(values);
    db.query(query,values)
      .then((req) => {
      
        res.json(req.rows)
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
