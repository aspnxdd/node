// import { FirebaseContext } from './contexts/firebase';
// import { Firebase, auth, analytics } from './lib/firebase';

const express = require("express");
let server = express()
const jwt = require("jsonwebtoken")

const { connectar: connect } = require('./database.js')
const dbName = 'test';

server.engine('htmls', require('ejs').renderFile);
server.set('view engine', 'htmls');

server.use('/', express.static('./static'));

const superPass = "wow"

server.get('/', function (req, res) {
    console.log(req)
    const db = client.db(dbName)
    const collection = db.collection("materials");
    collection.aggregate([
        {
            $lookup:
            {
                from: "driver",
                localField: "driver_id",
                foreignField: "driver_id",
                as: "driver"
            }
        },
    ]).toArray(function (err, driver_list) {
        if (err) throw err;
        console.log(JSON.stringify(driver_list, undefined, 2));
        res.render("index2.ejs", {
            materials: driver_list
        });
    });
});

function getUserToken(usuari) {
    return jwt.sign(usuari, superPass)
}

server.post('/login', function (req, res) {
    console.log(req.headers)
    const { nom, pass } = req.headers

    const db = client.db(dbName)
    const collection = db.collection("auth")

    collection.findOne({
        nom,
        pass
    }, (err, usuari) => {
        console.log("usuari", err, usuari, nom, pass)
        if (usuari.pass == pass) {
            res.json({
                token: getUserToken(usuari)
            })
        }
    })
})

const client = connect(server);

