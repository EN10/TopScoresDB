// https://github.com/brianc/node-postgres/wiki/Client

var express = require("express");
var app = express();
var pg = require('pg');

app.get('/', function(req, res) {
    if (req.query.u !== undefined && req.query.s !== undefined)
    {   try {
        pg.connect(process.env.DATABASE_URL, function(err, client, done) {
            client.query('INSERT INTO topscores VALUES ($1 , $2)',[req.query.u,req.query.s],function(err, result) {
            });
            client.query('SELECT * FROM topscores',function(err, result) {
            done();
            var ts ="";
            for (var i=0; result.rows.length; i++)
        {   ts += result.rows[0].toString() + "<br>";    }
            res.end(ts);
            });
        });
        } catch(err)    {res.send(err);}
    }
});

app.listen(process.env.PORT);