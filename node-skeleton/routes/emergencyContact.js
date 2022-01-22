const express = require("express");
const { use } = require("express/lib/application");
const router = express.Router();

function getAllUserEmergencyInfo(db, user_id) {
  const query = `SELECT users.id ,users.first_name , users.last_name , trips.name ,trips.description ,trips.start_date,trips.end_date, emergency_contacts.name AS emergency_contact, emergency_contacts.phone_number AS emergency_contact_phone,emergency_contacts.email AS emergency_contact_email, emergency_contacts.send_date
    FROM trip_owners
    JOIN  users ON trip_owners.user_id =users.id
    JOIN  trips ON trip_owners.trip_id =trips.id
    JOIN emergency_contacts ON trip_owners.trip_id =emergency_contacts.trip_id
    WHERE users.id = $1 ;
    `;
  const values = [user_id];
  return db.query(query, values);
}
function updateEmergencyContactInfor(db, name, email, phone_number, id) {
  const query = `UPDATE emergency_contacts
    SET name = $1
        email =$2
        phone_number = $3
    WHERE id = $4;`;
  const values = [name, email, phone_number, id];
  return db.query(query, values);
}
function deleteEmergencyContact(db, id) {
  const query = ` DELETE FROM emergencey_contact
    WHERE id =$1;`;
  const values = [id];
  return db.query(query, values);
}
function insertEmergencyContact(db, name, phone_number, email) {
  const query = `INSERT INTO emergency_contacts (name, phone_number, email)
    VALUES($1,$2,$3);`;
  const values = [name, phone_number, email];

  return db.query(query, values);
}

module.exports = (db) => {
  router.get("/:user_id", (req, res) => {
    const userID = req.params.user_id;
    //   console.log(req.params.user_id);
    getAllUserEmergencyInfo(db, userID)
      .then((data) => {
        const user = data.rows[0];
        console.log(":D", user);
        res.send(user);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/:user_id/update_contact", (req, res) => {
    updateEmergencyContactInfor(
      req.body.name,
      req.body.email,
      req.body.phone_number,
      req.body.id
    ).then((data) => {
      res.send(data.rows).catch((err) => {
        res.status(500).json({ error: err.message });
      });
    });
    console.log("this is the post request", req.body);
    res.send("success");
  });

  router.post("/:user_id/delete_contact", (req, res) => {
    deleteEmergencyContact(req.body.id)
    .then((data) => {
      res.send(data.rows).catch((err) => {
        res.status(500).json({ error: err.message });
      });
    });
    console.log("this is the post request", req.body);
    res.send("success");
  });

  router.post("/:user_id/new_contact", (req, res) => {
    insertEmergencyContact( req.body.name, req.body.phone_number, req.body.email)
    .then((data) => {
      res.send(data.rows).catch((err) => {
        res.status(500).json({ error: err.message });
      });
    });
    console.log("this is the post request", req.body);
    res.send("success");
  });







  return router;
};
