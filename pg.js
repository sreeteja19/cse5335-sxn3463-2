var fs = require('fs');
var pg = require('pg');
var converter = require('csvtojson').Converter;
var prompt = require('prompt');


var connect = process.env.DATABASE_URI || 'postgres://unhlaerfphkfkm:9TtXOeU-BDpgW3I6K0TNHV_DEu@ec2-107-21-223-147.compute-1.amazonaws.com:5432/d5hhtjt6mdib0o?ssl=true';


var client = new pg.Client(connect);
console.log('Connected to postgres...');
client.connect(function(err, client){
    
    if (err) throw err;
    });
    
    //var query2 = client.query('CREATE TABLE eq(id VARCHAR(15), year VARCHAR(40), occ VARCHAR(40), intensity VARCHAR(40))');
    //query2.on('end', function(){
    var csvfile = 'new.csv';
    var csv_con = new converter();

    fs.createReadStream(csvfile).pipe(csv_con);
    csv_con.on("end_parsed", function(jsonObj){
        
        for(var i = 0; i<jsonObj.length;i++){
        
        client.query('INSERT INTO eq(id,year,occ,intensity) VALUES ($1,$2,$3,$4)', 
        [jsonObj[i].id, jsonObj[i].year, jsonObj[i].occ,jsonObj[i].intensity],function(err){
            
            if(err) throw err;
        });
            
        }
    
    });
         prompt.start();
         prompt.get(['P_Key', 'S_key'], function(err, result) {
         
          if (err) throw err; 
          
          var query = client.query('SELECT occ FROM eq WHERE id = $1',[result.P_Key]);
              
              query.on('row', function(row, result){
            result.addRow(row);
          });
         query.on('end', function(result){
            
           console.log(result.rows[0]);
            
         });
         
          
          var query1 = client.query('SELECT intensity FROM eq WHERE occ = $1',[result.S_key]);
          
          query1.on('row', function(row1, result1){
            result1.addRow(row1);
          });
         query1.on('end', function(result1){
            
           console.log(result1.rows);
           client.end();
         });
         
         });