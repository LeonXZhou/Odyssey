const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { reservationsUrl } = require('twilio/lib/jwt/taskrouter/util');

const insertUser = (db, user) => {
    const query = `INSERT INTO users (first_name,last_name,email,password) 
    VALUES ('john','doe',$1,$2)
    RETURNING *`
    const values = [user.email, user.password];
    return db.query(query, values)
}

const checkEmail = (db, email) => {
    const query = `SELECT count(*) 
    FROM users
    WHERE email = $1`
    const values = [email];
    return db.query(query, values)
}

module.exports = (db) => {
    router.get("", (req, res) => {
        res.send("i display here");
    });

    router.post("/login", (req, res) => {
        console.log(req.body);
        res.send('asdf');
    })

    router.post("/register", (req, res) => {
        console.log('asdf',req.session.user_id);
        const email = req.body.email;
        checkEmail(db, email)
            .then(
                (data) => {
                    if (data.rows[0].count > 0) {
                        console.log('email in use');
                        res.send('email in use');
                        return;
                    }
                    else {
                        bcrypt.genSalt(10)
                            .then((salt) => {
                                return bcrypt.hashSync(req.body.password, salt);
                            })
                            .then((hashedPassword) => {
                                insertUser(db, { email: email, password: hashedPassword })
                                    .then((data) => {
                                        req.session.user_id = data.rows[0].id;
                                        console.log(req.session.user_id);
                                        return;
                                    });
                            })
                    }
                }
            )
    })
    return router;
};
