/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

const createNewTripOwner = (db, user_id, trip_id) => {
  const query = `INSERT INTO trip_owners (user_id,trip_id)
  VALUES ($1,$2)
  RETURNING *;`;
  const values = [user_id, trip_id];
  return db.query(query, values);
};

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
function updateRoute(db, lat, lon, zoom, id) {
  const query = `UPDATE routes
    SET latitude  = $1,
    longitude   = $2,
    zoom = $3
    WHERE id = $4;`;
  const values = [lat, lon, zoom, id];
  return db.query(query, values);
}
function updateStops(db, day, name, lat, lng, type, id, description) {
  console.log(description);
  const query = `UPDATE stops
    SET day  = $1,
    name   = $2,
    latitude  = $3,
    longitude = $4,
    type = $5,
    description = $6
    WHERE id = $7;`;
  const values = [day, name, lat, lng, type, description, id];
  return db.query(query, values);
}
function insertNewStop(db, day, name, lat, long, type, route_id, description) {
  const query = `INSERT INTO stops (day, name, latitude, longitude ,type,route_id, description)
  VALUES($1,$2,$3,$4,$5,$6,$7);`;
  const values = [day, name, lat, long, type, route_id, description];

  return db.query(query, values);
}

function deleteStop(db, id) {
  const query = `DELETE FROM stops
  WHERE id = $1`;
  values = [id];
  return db.query(query, values);
}
module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(
      `SELECT users.id AS user_id ,users.first_name , users.last_name  , users.email, trips.id AS trip_id,trips.name AS trips_name, trips.description , stops.id AS stops_id,stops.day AS stop_days, stops.name AS stop_names,stops.type AS stop_types, stops.latitude AS stops_LAT , stops.longitude AS stops_LONG, routes.id AS routes_id,routes.latitude AS routes_LAT,routes.longitude AS routes_LONG,trips.start_date AS trip_start, trips.end_date AS trip_end,routes.zoom AS routes_zoom
    FROM trips
    JOIN routes ON trips.id=routes.trip_id
    JOIN stops ON trips.id=stops.route_id
    JOIN users ON trips.creator=users.id
    ORDER BY trips.id DESC;`
    )
      .then((req) => {
        const allTrip = req.rows;
        console.log(req.rows);
        res.json(allTrip);
      })

      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.get("/:trip_id", (req, res) => {
    const query = `SELECT users.id AS user_id ,
      users.first_name ,
      users.last_name  ,
      users.email,
      trips.id AS trip_id,
      trips.name AS trips_name,
      trips.description ,
      stops.id AS stops_id,
      stops.day AS stop_day,
      stops.name AS stop_name,
      stops.type AS stop_types,
      stops.latitude AS stops_LAT ,
      stops.longitude AS stops_LONG,
      stops.description as stop_description,
      routes.id AS routes_id,
      routes.latitude AS routes_LAT,
      routes.longitude AS routes_LONG,
      routes.zoom AS routes_zoom,
      trips.start_date AS trip_start,
      trips.end_date AS trip_end
    FROM trip_owners
    JOIN trips ON trip_owners.trip_id=trips.id
    JOIN routes ON trip_owners.trip_id=routes.trip_id
    FULL JOIN stops ON trip_owners.trip_id=stops.route_id
    JOIN users ON trip_owners.user_id=users.id
    WHERE trips.id = $1
    ORDER BY stops.type DESC;`;
    const values = [req.params.trip_id];
    db.query(query, values)
      .then((req) => {
        const allTrip = req.rows;
        res.json(req.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/user/:user_id", (req, res) => {
    const query = `SELECT users.id AS user_id ,users.first_name , users.last_name  , users.email, trips.id AS trip_id,trips.name AS trips_name, trips.description , stops.id AS stops_id,stops.day AS stop_days, stops.name AS stop_names,stops.type AS stop_types, stops.latitude AS stops_LAT , stops.longitude AS stops_LONG, routes.id AS routes_id,routes.latitude AS routes_LAT,routes.longitude AS routes_LONG,trips.start_date AS trip_start, trips.end_date AS trip_end, routes.zoom AS routes_zoom
    FROM trip_owners
    JOIN trips ON trip_owners.trip_id=trips.id
    JOIN routes ON trip_owners.trip_id=routes.trip_id
    JOIN stops ON trip_owners.trip_id=stops.route_id
    JOIN users ON trip_owners.user_id=users.id
    WHERE users.id = $1
    ORDER BY stops.type DESC;`;
    const values = [req.params.user_id];
    db.query(query, values)
      .then((req) => {
        const allTrips = req.rows;
        res.json(allTrips);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    createNewTrip(db, req.body).then((data) => {
      createNewTripOwner(db, req.body.user_id, data.rows[0].id).then((data) => {
        res.send({ trip_id: data.rows[0].trip_id });
      });
    });
  });

  router.post("/map/:map_id", (req, res) => {
    //{lat:lat,long:long,zoom:zoom})

    console.log(req.body);
    updateRoute(
      db,
      req.body.lat,
      req.body.long,
      req.body.zoom,
      req.params.map_id
    )
      .then(() => {
        res.send("success");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/stop/:stop_id", (req, res) => {
    console.log(req.body.description);
    updateStops(
      db,
      req.body.date,
      req.body.name,
      req.body.lat,
      req.body.lng,
      req.body.type,
      req.params.stop_id,
      req.body.description
    )
      .then(() => {
        res.send("successfully updated stops");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.delete("/stop/:stop_id", (req, res) => {
    console.log(req.body);
    deleteStop(db, req.params.stop_id)
      .then(() => {
        res.send("successfully updated stops");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/stop", (req, res) => {
    insertNewStop(
      db,
      req.body.date,
      req.body.name,
      req.body.lat,
      req.body.lng,
      req.body.type,
      req.body.route_id,
      req.body.description
    ).then(() => {
      res.send("successfully inserted new stops");
    });
    // .catch((err) => {
    //   res.status(500).json({ error: err.message });
    // });
  });

  return router;
};
