// load .env data into process.env
require("dotenv").config();

const dotenv = require("dotenv");
dotenv.config();
const accountSid = process.env.TWILIO_ACC_SID;
const authToken = process.env.TWILIO_AUTH_KEY; //CHANGES DAILY****
const cron = require("node-cron");
const client = require("twilio")(accountSid, authToken);

// Web server config
const PORT = process.env.PORT || 8080;
const express = require("express");
const app = express();
const morgan = require("morgan");

const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors({ credentials: true }));
app.use(helmet());
app.use(
  cookieSession({
    name: "session",
    keys: ["pi314", "e278"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

// app.use(bodyParser.urlencoded({ extended: true }));
// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const tripsRoutes = require("./routes/trips");
const equipmentRoutes = require("./routes/equipment");
const mealsRoutes = require("./routes/meals");
// const testHelperRoutes = require("./routes/helper");
const authentication = require("./routes/authentication");
const emergencyContactRoutes = require("./routes/emergencyContact");
const weatherRoute = require("./routes/weather");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/equipment", equipmentRoutes(db));
app.use("/api/plan-trips-meals", mealsRoutes(db));
app.use("/api/trips", tripsRoutes(db));
app.use("/api/meals", mealsRoutes(db));
// app.use("/api/helper", testHelperRoutes(db));
app.use("/api/emergency-contact", emergencyContactRoutes(db));
app.use("/api/weather", weatherRoute(db));
app.use("/", authentication(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.listen(PORT, () => {

  console.log(`Example app listening on port ${PORT}`);

  function getEmergencyContact(db) {

    const query = `SELECT message_sent,id ,name, time_date, phone_number
        FROM emergency_contacts
        WHERE message_sent = 'false' AND time_date > send_date;
        `;
        return db.query(query);
  }

  cron.schedule("*/05 * * * * *", function () {
    getEmergencyContact(db)
      .then((req) => {
        for (const item of req.rows) {
          if (item["message_sent"] === false) {
            const updatedQuery = `UPDATE emergency_contacts
                                  SET message_sent = 'true'
                                  WHERE id=${item["id"]}
                                  `;
            // console.log(item["phone_number"]);
            client.messages
              .create({
                body: "hey did this reach you ?",
                messagingServiceSid: process.env.TWILIO_MSG_SERVICEID,
                to: /*process.env.TWILIO_PHONE_NUMBER*/ item[
                  "phone_number"
                ] /*phone number needs the +1 */,
              })
              .then((message) => {
                if ((message.status = "accepted")) {
                  // console.log("MSG_STATUS:", message.status);
                  db.query(updatedQuery).done();
                }
              });
          }
        }

        // console.log(req.rows, "req.rows empty");

        // console.log("new cycle");
      })

      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
});

