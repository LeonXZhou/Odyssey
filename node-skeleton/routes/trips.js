/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { create } = require("domain");
const express = require("express");
const router = express.Router();

const createNewTripOwner = (db, user_id, trip_id) => {
  const query = `INSERT INTO trip_owners (user_id,trip_id)
  VALUES ($1,$2)
  RETURNING *;`;
  const values = [user_id, trip_id];
  return db.query(query, values);
}

const createNewTrip = (db, tripInfo) => {
  const query = `INSERT INTO trips (name,start_date,end_date)
  VALUES ($1,$2,$3)
  RETURNING *;`;
  const values = [tripInfo.name, tripInfo.startDate, tripInfo.endDate];
  return db.query(query, values);
  // .then((data) => {
  //   createNewTripOwner(db, tripInfo.user_id, data.rows[0].id)
  //   .then((data)=>{return data.rows[0].trip_id});
  // });
};

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT users.id AS user_id ,users.first_name , users.last_name  , users.email, trips.id AS trip_id,trips.name AS trips_name, trips.description , stops.id AS stops_id,stops.day AS stop_days, stops.name AS stop_names,stops.type AS stop_types, stops.latitude AS stops_LAT , stops.longitude AS stops_LONG, routes.id AS routes_id,routes.latitude AS routes_LAT,routes.longitude AS routes_LONG,trips.start_date AS trip_start, trips.end_date AS trip_end
    FROM trip_owners
    JOIN trips ON trip_owners.trip_id=trips.id
    JOIN routes ON trip_owners.trip_id=routes.trip_id
    JOIN stops ON trip_owners.trip_id=stops.route_id
    JOIN users ON trip_owners.user_id=users.id
    ORDER BY stops.type DESC;`)
      .then((req) => {
        const allTrip = req.rows;
        console.log(req.rows);
        res.json(allTrip)
      })

      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.get("/:trip_id", (req, res) => {

    const query = `SELECT users.id AS user_id ,users.first_name , users.last_name  , users.email, trips.id AS trip_id,trips.name AS trips_name, trips.description , stops.id AS stops_id,stops.day AS stop_days, stops.name AS stop_names,stops.type AS stop_types, stops.latitude AS stops_LAT , stops.longitude AS stops_LONG, routes.id AS routes_id,routes.latitude AS routes_LAT,routes.longitude AS routes_LONG,trips.start_date AS trip_start, trips.end_date AS trip_end
    FROM trip_owners
    JOIN trips ON trip_owners.trip_id=trips.id
    JOIN routes ON trip_owners.trip_id=routes.trip_id
    JOIN stops ON trip_owners.trip_id=stops.route_id
    JOIN users ON trip_owners.user_id=users.id
    WHERE trips.id = $1
    ORDER BY stops.type DESC;`;
    const values = [req.params.trip_id];
    db.query(query, values)
      .then((req) => {
        const allTrip = req.rows;
        res.json(req.rows)
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });


  router.post("/", (req, res) => {
    createNewTrip(db, req.body)
      .then((data) => {
        createNewTripOwner(db, req.body.user_id, data.rows[0].id)
          .then((data) => {res.send({trip_id: data.rows[0].trip_id}) });
      });
  })
  return router;
};
