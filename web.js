// https://github.com/brianc/node-postgres/wiki/Client

var express = require("express");
var app = express();
var pg = require('pg');

app.get('/', function(req, res) {
    if (req.query.u !== undefined && req.query.s !== undefined)
    {   pg.connect(process.env.DATABASE_URL, function(err, client, done) {
            client.query('INSERT INTO topscores VALUES ($1 , 100)',['Enio'],function(err, result) {
            done();
            if(err) return console.error(err);
            
            res.send('Error: ' + err);
            });
        });
    }
});

app.listen(process.env.PORT);