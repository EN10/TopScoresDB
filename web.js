// web.js
var pg = require('pg');

pg.connect(process.env.DATABASE_URL, function(err, client, done) {
  client.query("INSERT INTO films VALUES ('Enio', 100)", function(err, result) {
    done();
    if(err) return console.error(err);
    console.log(result.rows);
  });
});