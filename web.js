// web.js
var express = require("express");
var app = express();
app.use(express.logger());

var pg = require('pg');

pg.connect(process.env.DATABASE_URL, function(err, client, done) {
  client.query('INSERT INTO topscores VALUES ("Enio", 100)', function(err, result) {
    done();
    if(err) return console.error(err);

    app.get('/', function(request, response) {
        response.send('Error: '+err);
    });

  });
});



var port = process.env.PORT || 80;
app.listen(port, function() {
  console.log("Listening on " + port);
});