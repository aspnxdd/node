const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

const client = new MongoClient(url);
const assert = require('assert');


// Connect using MongoClient
function connectar(server) {
    client.connect(function (err) {
        assert.equal(null, err);
        console.log("Connected to DB");
        server.listen(8000, () => console.log("Connected to server!"));
    });
    return client
}

module.exports = {connectar};