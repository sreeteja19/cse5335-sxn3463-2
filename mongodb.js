var mongoose = require('mongoose');
var prompt = require('prompt')
var converter = require('csvtojson').Converter;
var fs = require('fs');

mongoose.connect('mongodb://sreeteja:teja123@ds033153.mongolab.com:33153/heroku_w41twx8r')
var conn = mongoose.connection;

conn.on('error', function(err){
    
    console.log('Connection error', err);
    });
conn.once('open', function(){
    
    console.log('Connected...');
    });

var csvfile = 'new.csv';
var csv_con = new converter();

fs.createReadStream(csvfile).pipe(csv_con);


csv_con.on("end_parsed", function(jsonObj){
    
    conn.collection('flowers').insert(jsonObj);
    }); 


console.log('Collection created and data inserted successfully...');
var Schema = mongoose.Schema;
var Players_100_schema = new Schema({e_id : Number, year : Number, occ : String, intensity : String});

var earth = mongoose.model('earth', Players_100_schema,'earths');

prompt.start();

prompt.get(['P_key','S_key'], function (err, result) {
   
   if (err) throw err;
   
   earth.find({'e_id' : result.P_key}).exec(function(err, res){
       
       if(err) throw err;
       console.log('%s',res);
       //conn.close();
       });
    
    earth.find({'year' : result.S_key}).exec(function(err, res) {
       if(err) throw err;
       console.log('%s',res);
       conn.close();
        
    });
    
});