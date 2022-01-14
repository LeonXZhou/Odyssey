/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(
      `SELECT first_name ,last_name , email FROM users WHERE id =1`
    ).then((req) => {
      const user = req.rows;

      db.query(
        `SELECT trips.name , trips.description , trips.start_date , trips.end_date 
    FROM trip_owners 
    JOIN trips ON trip_owners.trip_id=trips.id
    JOIN users ON trip_owners.user_id=users.id
    WHERE users.id = 1;
    `
      ).then((data2) => {
        const trip = data2.rows;
        console.log(trip);

        db.query(
          `SELECT stops.name AS stop_names , stops.day AS stop_days , stops.longitude AS stops_LONG , stops.latitude AS stops_LAT ,stops.type AS stop_types
    FROM stops
    JOIN routes ON stops.route_id=routes.id
    JOIN trips ON routes.trip_id=trips.id
    WHERE trips.id = 1;
    `
        ).then((data3) => {
          const stops = data3.rows;
          console.log(stops);

          db.query(
            `SELECT routes.latitude AS routes_LAT,  routes.longitude AS routes_LONG
            FROM routes
            JOIN trips ON routes.trip_id=trips.id
            WHERE trips.id = 1;
                            `
          )
            .then((data4) => {
              const routes = data4.rows;
              console.log(routes);
              res.json( {user,trip, stops, routes});
            })
            .catch((err) => {
              res.status(500).json({ error: err.message });
            });
        });
      });
    });
  });
  router.get("/1", (req, res) => {
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
  return router;
};
