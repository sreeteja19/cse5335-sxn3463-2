var redis = require('redis');
var prompt = require('prompt')
var converter = require('csvtojson').Converter; 
var fs = require('fs');


var client = redis.createClient(9469, 'ec2-54-83-59-218.compute-1.amazonaws.com'); 
client.auth('p655vo29h96rs91qu6c3umi30h5');

client.on('connect', function(err){
    
    if (err) throw err;
    console.log('Connected...');    
});

var csvfile = 'new.csv';
var csv_con = new converter();

fs.createReadStream(csvfile).pipe(csv_con);


csv_con.on("end_parsed", function(jsonObj, err){
    
    if (err) throw err;
    for (var i = 0; i<jsonObj.length;i++){
        if (i == 0){
            
        client.hmset(jsonObj[i].c,'a',jsonObj[i].a, 'b', jsonObj[i].b, function(err){
            
            if (err) throw err;
            //console.log('hmset added');
        });
            
        }
        client.set(jsonObj[i].id, jsonObj[i].a, function(err, reply){
            
            if (err) throw err;
            //console.log(reply);
        });
        
        
    }
    
    console.log('Data inserted');
    }); 

    prompt.start();
    prompt.get(['P_key','S_key'], function(err, res){
        
        if (err) throw err;
        
        client.get(res.P_key, function(err, rep){
            
            if (err) throw err;
            console.log(rep);
        });
    
        client.hgetall(res.S_key, function(err, object){
            
            if (err) throw err;
            console.log(object);
        });
        
    });