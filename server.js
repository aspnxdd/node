const express = require("express");
let server = express()

const { connectar: connect } = require('./database.js')
const dbName = 'test';

server.engine('htmls', require('ejs').renderFile);
server.set('view engine', 'htmls');

server.get('/', function (req, res) {
    const db = client.db(dbName)
    const collection = db.collection("materials");
    // collection.find({}).toArray(function (err, materials_list) {
    //     assert.equal(err, null);
    //     console.log("collection loaded");
    //     console.log(materials_list);
    //     res.render("index2.ejs", {
    //         materials: materials_list
    //     });
    // });
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
//
//npm run dev
const client = connect(server);

