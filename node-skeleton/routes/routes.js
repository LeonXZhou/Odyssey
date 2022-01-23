function updateRoute(db, lat, lon, id) {
  const query = `UPDATE routes
    SET latitude  = $1,
    longitude   = $2
    WHERE id = $3;`;
  const values = [lat, lon, id];
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
  return router;
};
