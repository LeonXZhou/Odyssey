/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { Console } = require("console");
const express = require("express");
const router = express.Router();

Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

function getDates(startDate, stopDate) {
  const dateArray = [];
  let currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
}

const generateDays = (db, start, end, trip_id) => {
  console.log("inside generate days", start, end);
  const startDate = new Date(start);
  const endDate = new Date(end);
  const dateToInsert = getDates(startDate, endDate);
  const allDateQueries = [];
  console.log("inside generate days",startDate,endDate)
  const query = `INSERT INTO days (trip_id,date)
  VALUES ($1,$2)
  ON CONFLICT
  DO NOTHING
  RETURNING *;`;
  for (date of dateToInsert) {
    const value = [trip_id, date.toISOString().split('T')[0]];
    console.log(date.toISOString().split('T')[0])
    console.log(trip_id);
    allDateQueries.push(db.query(query, value));
  }
  return Promise.all(allDateQueries);
};
const createNewTripOwner = (db, user_id, trip_id) => {
  const query = `INSERT INTO trip_owners (user_id,trip_id)
  VALUES ($1,$2)
  RETURNING *;`;
  const values = [user_id, trip_id];
  return db.query(query, values);
};

const createDefaultMap = (db, trip_id) => {
  const query = `INSERT INTO routes (trip_id, latitude, longitude)
  VALUES ($1,$2,$3)
  RETURNING trip_id;`;
  const values = [trip_id, 49.246292, -123.116226];
  return db.query(query, values);
};

const createNewTrip = (db, tripInfo, user_id) => {
  const query = `INSERT INTO trips (name,start_date,end_date,creator)
  VALUES ($1,$2,$3,$4)
  RETURNING *;`;
  const values = [tripInfo.name, tripInfo.startDate, tripInfo.endDate, user_id];
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


function getGeneral(db, trip_id) {
  const query = `SELECT * FROM trips
  WHERE id = $1`;
  values = [trip_id];
  return db.query(query, values);
}

function updateTrip(db, trip_id, name, description, start_date, end_date) {
  const query = `UPDATE trips
  SET name = $1, description = $2, start_date = $3, end_date = $4 
  WHERE id = $5;`;
  values = [name, description, start_date, end_date, trip_id];
  return db.query(query, values);
}

function deleteDays(db, trip_id, start_date, end_date) {
  console.log(end_date)
  const query = `DELETE FROM days
  where trip_id = $1 AND (date < $2::date OR date > $3::date)`;
  values = [trip_id, start_date, end_date]

  return db.query(query, values);
}


function addNewDays(db, trip_id, start_date, end_date) {
  return generateDays(db, start_date, end_date, trip_id);
}
module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(
      `SELECT users.id AS user_id ,users.first_name , users.last_name  , users.email, trips.id AS trip_id,trips.name AS trips_name, trips.description , stops.id AS stops_id,stops.day AS stop_days, stops.name AS stop_names,stops.type AS stop_types, stops.latitude AS stops_LAT , stops.longitude AS stops_LONG, routes.id AS routes_id,routes.latitude AS routes_LAT,routes.longitude AS routes_LONG,trips.start_date AS trip_start, trips.end_date AS trip_end,routes.zoom AS routes_zoom
    FROM trips
    JOIN routes ON trips.id=routes.trip_id
    FULL JOIN stops ON trips.id=stops.route_id
    JOIN users ON trips.creator=users.id
    ORDER BY trips.id DESC;`
    )
      .then((req) => {
        const allTrip = req.rows;
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
    FULL JOIN stops ON trip_owners.trip_id=stops.route_id
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
    const allQueryPromises = [];
    createNewTrip(db, req.body, req.session.user_id).then((data) => {
      const startDate = data.rows[0].start_date;
      const endDate = data.rows[0].end_date;
      const tripId = data.rows[0].id;
      createNewTripOwner(db, req.body.user_id, data.rows[0].id).then((data) => {
        createDefaultMap(db, data.rows[0].trip_id).then((data) => {
          generateDays(db, startDate, endDate, tripId).then(() => {
            res.send({ trip_id: data.rows[0].trip_id });
          });
        });
      });
    });
  });

  router.post("/map/:map_id", (req, res) => {
    //{lat:lat,long:long,zoom:zoom})

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

  router.get("/:trip_id/general", (req, res) => {
    getGeneral(db, req.params.trip_id)
      .then((data) => {
        res.send(data.rows[0])
      })
  })

  router.put("/:trip_id", (req, res) => {
    updateTrip(db, req.params.trip_id, req.body.name, req.body.description, req.body.start_date, req.body.end_date)
      .then(() => {
        console.log(req.body.end_date)
        deleteDays(db, req.params.trip_id, req.body.start_date, req.body.end_date)
          .then(() => {
            console.log(req.body.end_date)
            addNewDays(db, req.params.trip_id, req.body.start_date, req.body.end_date)
              .then(() => {
                console.log('well shit')
                res.send("woot")});
          })
      })
    // ()=>{res.send('success')}?
  })

  return router;
};
