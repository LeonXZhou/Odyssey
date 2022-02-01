const express = require("express");
const { use } = require("express/lib/application");
const router = express.Router();

function getAllUserEmergencyInfo(db, user_id) {
  const query = `SELECT users.id ,users.first_name , users.last_name , trips.name ,trips.description ,trips.start_date,trips.end_date, emergency_contacts.name AS emergency_contact, emergency_contacts.phone_number AS emergency_contact_phone, emergency_contacts.send_date
    FROM trip_owners
    JOIN  users ON trip_owners.user_id =users.id
    JOIN  trips ON trip_owners.trip_id =trips.id
    JOIN emergency_contacts ON trip_owners.trip_id =emergency_contacts.trip_id
    WHERE users.id = $1 ;
    `;
  const values = [user_id];
  return db.query(query, values);
}

function getAllEmergencyInfoByTripId(db, trip_id) {
  const query = `SELECT * FROM emergency_contacts
  where trip_id = $1;`;
  const values = [trip_id];
  return db.query(query, values);
}

function updateEmergencyContactInfor(
  db,
  name,
  phone_number,
  send_date,
  send_time,
  id
) {
  const query = `UPDATE emergency_contacts
    SET name = $1,
        phone_number = $2,
        send_date = $3,
        send_time = $4,
        message_sent = false
    WHERE id = $5 RETURNING *;`;
  const values = [name, `+1${phone_number}`, send_date, send_time, id];
  console.log(values);
  return db.query(query, values);
}

function deleteEmergencyContact(db, contact_id) {
  const query = `DELETE FROM emergency_contacts WHERE id=$1;`;
  const values = [contact_id];
  return db.query(query, values);
}

function insertEmergencyContact(
  db,
  trip_id,
  name,
  phone_number,
  send_date,
  send_time,
  message_sent
) {
  const query = `INSERT INTO emergency_contacts
  (trip_id, name, phone_number, send_date, send_time, message_sent)
  VALUES ($1,$2,$3, $4, $5, $6);`;
  const values = [
    trip_id,
    name,
    `+1${phone_number}`,
    send_date,
    send_time,
    message_sent,
  ];
  console.log(values);
  return db.query(query, values);
}

module.exports = (db) => {
  router.get("/:trip_id", (req, res) => {
    getAllEmergencyInfoByTripId(db, req.params.trip_id)
      .then((data) => {
        res.send(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/:trip_id/update_contact", (req, res) => {
    console.log("HIT2");
    updateEmergencyContactInfor(
      db,
      req.body.name,
      req.body.phone_number,
      req.body.send_date,
      req.body.send_time,
      req.body.id
    )
      .then((data) => {
        res.send(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/:trip_id/delete_contact", (req, res) => {
    console.log("POST");
    deleteEmergencyContact(db, req.body.id)
      .then((data) => {
        res.send(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/:trip_id/new_contact", (req, res) => {
    console.log("post");
    insertEmergencyContact(
      db,
      req.params.trip_id,
      req.body.name,
      req.body.phone_number,
      req.body.send_date,
      req.body.send_time,
      req.body.message_sent
    )
      .then((data) => {
        res.send(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
