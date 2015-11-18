var redis = require('redis');
var prompt = require('prompt')
var converter = require('csvtojson').Converter; 
var fs = require('fs');


var client = redis.createClient(9469, 'ec2-54-83-59-218.compute-1.amazonaws.com'); 
client.auth('p655vo29h96rs91qu6c3umi30h5');

client.on('connect', function(err){
    
    if (err) throw err;
    console.log('Connection established');    
});

var csvfile = 'new.csv';
var csv_con = new converter();

fs.createReadStream(csvfile).pipe(csv_con);


csv_con.on("end_parsed", function(jsonObj, err){
    
    if (err) throw err;
    for (var i = 0; i<jsonObj.length;i++){
        if (i == 0){
            
        client.hmset(jsonObj[i].intensity,'year',jsonObj[i].year, 'intensity', jsonObj[i].intensity, function(err){
            
            if (err) throw err;
            //console.log('hmset added');
        });
            
        }
        client.set(jsonObj[i].e_id, jsonObj[i].intensity, function(err, reply){
            
            if (err) throw err;
            //console.log(reply);
        });
        
        
    }
    
    console.log('Data inserted to redis');
    }); 

    prompt.start();
    prompt.get(['key1','key2'], function(err, res){
        
        if (err) throw err;
        
        client.get(res.key1, function(err, rep){
            
            if (err) throw err;
            console.log(rep);
        });
    
        client.hgetall(res.key2, function(err, object){
            
            if (err) throw err;
            console.log(object);
        });
        
    });