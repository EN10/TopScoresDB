// https://github.com/brianc/node-postgres/wiki/Client

var express = require("express");
var app = express();
var pg = require('pg');

app.get('/', function(req, res) {
    if (req.query.u !== undefined && req.query.s !== undefined)
    {   pg.connect(process.env.DATABASE_URL, function(err, client, done) {
            client.query('INSERT INTO topscores VALUES ($1 , $2)',[req.query.u,req.query.s],function(err, result) {
            });
            if (err !== null)   res.send('Error: ' + err);
            
            client.query('SELECT * FROM topscores',function(err, result) {
            done();
            if (err !== null)   res.send('Error: ' + err);
            else {
                var json = JSON.stringify(result.rows);
                res.writeHead(200, {'content-type':'application/json', 'content-length':json.length}); 
                res.end(json);
                }
            });
        });
    }
});

app.listen(process.env.PORT);