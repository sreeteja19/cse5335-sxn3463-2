var pg = require('pg');
var connectionString = 'postgres://unhlaerfphkfkm:9TtXOeU-BDpgW3I6K0TNHV_DEu@ec2-107-21-223-147.compute-1.amazonaws.com:5432/d5hhtjt6mdib0o';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
query.on('end', function() { client.end(); });
