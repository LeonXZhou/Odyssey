// { day: day_id , meals: [{meal_name  : meal_name ,meal.id , meal_items: [{meals_itemname: meal_items.name, meal_items.id mealsquantity: meal_items.quantity}]}]}
const express = require("express");
const dotenv = require("dotenv");
const router = express.Router();
dotenv.config();
const accountSid = process.env.TWILIO_ACC_SID;
const authToken = process.env.TWILIO_AUTH_KEY; //CHANGES DAILY****
const cron = require("node-cron");
const client = require("twilio")(accountSid, authToken);

module.exports = (db) => {
  router.get("/", (req, res) => {
    const query = `SELECT message_sent,id ,name, time_date, phone_number
      FROM emergency_contacts
      WHERE message_sent = 'false' AND time_date > send_date;
      `;

    db.query(query)
      .then((req) => {
        // res.json(req.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
    console.log("on start");
    cron.schedule("*/05 * * * * *", function () {
      db.query(query)
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
                  to: /*process.env.TWILIO_PHONE_NUMBER*/ item['phone_number'], /*phone number needs the +1 */
                })
                .then((message) => {
                  if ((message.status = "accepted")) {
                    console.log("MSG_STATUS:",message.status);
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
