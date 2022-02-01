const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { reservationsUrl } = require("twilio/lib/jwt/taskrouter/util");
const route = require("color-convert/route");

const insertUser = (db, user) => {
  const query = `INSERT INTO users (first_name,last_name,email,password)
    VALUES ('john','doe',$1,$2)
    RETURNING *`;
  const values = [user.email, user.password];
  return db.query(query, values);
};

const checkEmail = (db, email) => {
  const query = `SELECT count(*)
    FROM users
    WHERE email = $1`;
  const values = [email];
  return db.query(query, values);
};

const verifyEmail = (db, email) => {
  const query = `SELECT password, id from users
    where email = $1`;
  const values = [email];
  return db.query(query, values);
};

const getEmailById = (db, id) => {
  const query = `SELECT email from users
    where id = $1`;
  const values = [id];
  return db.query(query, values);
};

const getUserInfo = (db, id) => {
  const query = `SELECT email, first_name, last_name, id from users
      where id = $1`;
  const values = [id];
  return db.query(query, values);
};

module.exports = (db) => {
  router.get("", (req, res) => {
    res.send(req.session.user_id);
  });

  router.get("/authenticate", (req, res) => {
    getUserInfo(db, req.session.user_id).then((data) => {
      if (data.rows.length === 0) {
        res.send({ message: "no user" });
        return;
      }
      res.send({
        userId: data.rows[0].id,
        email: data.rows[0].email,
        firstName: data.rows[0].first_name,
        lastName: data.rows[0].last_name,
      });
      return;
    });
  });

  router.post("/login/dev", (req, res) => {
    getUserInfo(db, req.body.user_id).then((data) => {
      if (data.rows.length === 0) {
        res.send({ message: "no user" });
        return;
      }
      req.session.user_id = req.body.user_id;
      res.send({
        userId: data.rows[0].id,
        email: data.rows[0].email,
        firstName: data.rows[0].first_name,
        lastName: data.rows[0].last_name,
      });
      return;
    });
  });

  router.post("/login", (req, res) => {
    verifyEmail(db, req.body.email).then((data) => {
      if (!data.rows[0]) {
        res.send("invalid login");
        return;
      }
      bcrypt
        .compare(req.body.password, data.rows[0].password)
        .then((result) => {
          if (!result) {
            res.send({
              userId: data.rows[0].id,
              email: data.rows[0].email,
              firstName: data.rows[0].first_name,
              lastName: data.rows[0].last_name,
            });
            return;
          }
          req.session.user_id = data.rows[0].id;
          res.send("invalid login");
          return;
        });
    });
  });

  router.post("/register", (req, res) => {
    const email = req.body.email;
    checkEmail(db, email).then((data) => {
      if (data.rows[0].count > 0) {
        console.log("email in use");
        res.send("email in use");
        return;
      } else {
        bcrypt
          .genSalt(10)
          .then((salt) => {
            return bcrypt.hashSync(req.body.password, salt);
          })
          .then((hashedPassword) => {
            insertUser(db, { email: email, password: hashedPassword }).then(
              (data) => {
                req.session.user_id = data.rows[0].id;
                res.send("success");
                return;
              }
            );
          });
      }
    });
  });
  return router;
};
