// { day: day_id , meals: [{meal_name  : meal_name ,meal.id , meal_items: [{meals_itemname: meal_items.name, meal_items.id mealsquantity: meal_items.quantity}]}]}
const express = require("express");
const router = express.Router();
const accountSid = "ACab6e2eae17eb65bd94de329bf0201591";
const authToken = "1374cb38bcd9fc1250a40c5f045669f7";
const client = require("twilio")(accountSid, authToken);
const cron = require("node-cron");

module.exports = (db) => {
  router.get("/", (req, res) => {
    const query = `SELECT message_sent,id ,name, time_date
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
              const name = item["name"]
              console.log(` ID to string ${item['id'].toString()}`);
              console.log(` name ${item['name'].replace(/"/g, "'")}`);
              const updatedQuery = `UPDATE emergency_contacts
                                    SET message_sent = 'true'
                                    WHERE id=${item["id"]}
                                    `;
                                    // cant get 
                      
               console.log(req.rows,"req.rows populated");
              client.messages
                .create({
                  body: "do you need help?",
                  messagingServiceSid: "MGa730aa4879224aa80c628f0499107330",
                  to: "+14039919017",
                })
                .then((message) => console.log(message))
                .done();


              db.query(updatedQuery);
              
            }
          }
         
          console.log(req.rows,"req.rows empty");
          

          console.log("after 1min");
        })

        .catch((err) => {
          res.status(500).json({ error: err.message });
        });

      console.log("running a task every minute");
    })
  });
  return router;
};


