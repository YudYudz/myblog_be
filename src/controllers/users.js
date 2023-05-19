const connectionDatabase = require('../database/db');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

function signUp(req, res) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    connectionDatabase.connection.query(
        `INSERT INTO users(username,name,email,password) 
        VALUES ('${req.body.username}','${req.body.name}','${req.body.email}','${hash}')`,
        function (err) {
            if (err) {
                return res.status(400).send({
                    status: 400,
                    message: "Cannot Create account",
                });
            } else {
                return res.status(201).send({
                    status: 201,
                    message: "Succesfully create account",
                });
            }
        });
}

function signIn(req, res) {
    const { username, password } = req.body
    connectionDatabase.connection.query(
        `SELECT * FROM users 
        WHERE username = '${username}'`,
        function (err, result) {
            if (err) {
                return res.status(400).send({
                    status: 400,
                    message: "Username or Password invalid"
                });
            } else {
                let resPassword = bcrypt.compareSync(password, result[0].password);
                if (resPassword) {
                    let token = jwt.sign({
                        data: {
                            id: req.body.id,
                            username: req.body.username
                        },
                    },
                        'secret',
                        { expiresIn: '1h' });
                    return res.status(200).send({
                        data: {
                            id: result[0].id,
                            username: result[0].username,
                            nama: result[0].nama,
                        },
                        token: token,
                        message: "Succesfully Login",
                    });
                }
            }
        });
}

function deleteAccount(req, res) {
    const id = req.params.id
    connectionDatabase.connection.query(
        `DELETE FROM users 
        WHERE id = ${id}`,
        function (err) {
            if (err) {
                return res.status(500).send({
                    status: 500,
                    message: "Cannot Delete"
                })
            } else {
                return res.status(200).send({
                    status: 200,
                    message: "Data Deleted"
                })
            }
        }
    )
}

function updateAccount (req, res) {
    const id = req.params.id
    connectionDatabase.connection.query(
        `UPDATE users 
        SET username = '${req.body.username}', name = '${req.body.name}' 
        WHERE id = ${id}`,
        function (err) {
            if (err) {
                return res.status(400).send({
                    status: 400,
                    message: "Cannot Update"
                })
            } else {
                return res.status(201).send({
                    status: 201,
                    message: "Data Update"
                })
            }
        }
    )
}

module.exports = {
    signUp,
    signIn,
    deleteAccount,
    updateAccount
}