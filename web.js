// https://github.com/brianc/node-postgres/wiki/Client

var express = require("express");
var app = express();
var pg = require('pg');

app.get('/', function(req, res) {
    pg.connect(process.env.DATABASE_URL, function(err, client) {
        if (req.query.u !== undefined && req.query.s !== undefined)
        {   client.query('INSERT INTO topscores VALUES ($1 , $2)',
                [req.query.u,req.query.s],function(err, result) {
                    console.log(err);   });
        }        
        client.query('SELECT * FROM topscores ORDER BY score DESC',function(err, result) {
        var ts = "";
        for (var i=0; i < result.rows.length; i++)
        {   ts += result.rows[i].name+' : '+result.rows[i].score+'\n';  }
        res.end(ts);
            console.log(err);  });
    });
});

app.listen(process.env.PORT);
