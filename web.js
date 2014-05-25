// https://github.com/brianc/node-postgres/wiki/Client

var express = require("express");
var app = express();
var pg = require('pg');

app.get('/', function(req, res) {
    pg.connect(process.env.DATABASE_URL, function(err, client) {
        if (req.query.u !== undefined && req.query.s !== undefined)
        {   client.query('INSERT INTO topscores VALUES ($1 , $2)',[req.query.u,req.query.s],function(err, result) {
            });
        }        
        client.query('SELECT * FROM topscores',function(err, result) {
/*      var ts ="";
        for (var i=0; result.rows.length; i++)
        {   ts += result.rows[i].toString();    }
*/      res.end(JSON.parse(result.rows));
        });
    });
});

app.listen(process.env.PORT);