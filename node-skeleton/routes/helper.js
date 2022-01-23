const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const accountSid = process.env.TWILIO_ACC_SID;
const authToken = process.env.TWILIO_AUTH_KEY; //CHANGES DAILY****
const cron = require("node-cron");
const client = require("twilio")(accountSid, authToken);


function getEmergencyContact(db) {

  const query = `SELECT message_sent,id ,name, time_date, phone_number
      FROM emergency_contacts
      WHERE message_sent = 'false' AND time_date > send_date;
      `;
      return db.query(query);
}


module.exports = (db) => {
  router.post("/", (req, res) => {
    getEmergencyContact(db)
      .then((req) => {
        res.json("checking db");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
    console.log("on start");

    cron.schedule("*/05 * * * * *", function () {
      getEmergencyContact(db)
        .then((req) => {
          for (const item of req.rows) {
            if (item["message_sent"] === false) {
              const updatedQuery = `UPDATE emergency_contacts
                                    SET message_sent = 'true'
                                    WHERE id=${item["id"]}
                                    `;
              console.log(item["phone_number"]);
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
                    console.log("MSG_STATUS:", message.status);
                    db.query(updatedQuery).done();
                  }
                });
            }
          }

          console.log(req.rows, "req.rows empty");

          console.log("new cycle");
        })

        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    });
  });
  return router;
};
