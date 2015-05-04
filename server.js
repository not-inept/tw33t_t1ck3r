//import js things
var express = require('express');
var Twitter = require('twitter');
var fs = require('fs');

//import my conversion library
var j2c = require('./json2csv.js');

//import multer for file upload purposes
var multer  = require('multer');

//global app var for express actions / director access
var app = express();
var root = './public_html/'

//global mongo client/url for database interaction
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
 var url = 'mongodb://localhost:27017/lab7';

//global vars for app func
var tweetsStatus = false;
var tweetsNumber = '20';
var tweetsOutputFile = 'tweets.json';
var tweetsQuery = 'code';

//getTweets function for aquiring tweets and building json file
//expunge these for github?
var getTweets = function(number, query, filepath) {
  var client = new Twitter({
    consumer_key: 'xURhSELKR6QHbmYszEbD5CkIl',
    consumer_secret: 'xyu0icIgq55jmjO1JTMo1VMfyXj1IWEQ0671Uk1GSFZUkvFllb',
    access_token_key: '954180925-pCCuAwoOxGogNuNp23MZ4oiVHIha4KtCzwmuO0sv',
    access_token_secret: 'Q1APmXYFGVslhZLhlG4MiC9WMGhQ7WmhOuHXpoC85dtbN'
  });

  //preapre stream request
  var params = {track: query};
  var tweets = 0;
  if (filepath == 'mongo') {
    console.log('Outputting to MongoDB');
    //clear tweets previously loaded
    MongoClient.connect(url, function(err, db) {
      db.collection('tweets').remove({}, function(err, removed){});
      client.stream('statuses/filter', params, function(stream) {
        stream.on('data', function(tweet)  {
          ++tweets;
          console.log(tweets + ' out of ' + number);

          if (tweets == number) {
            db.collection('tweets').insert(tweet)
            tweetsStatus = true;
            db.close();       
            stream.destroy();
          } else {
              assert.equal(null, err);
              db.collection('tweets').insert(tweet)
          }
        });
        stream.on('error', function(error) {
          console.log(error);
        });

      });
    });
  } else {
    console.log('Outputting to JSON file');
    //empty the tweets.json if exists, create if doesn't
    fs.closeSync(fs.openSync(filepath, 'w'));
    //begin json array
    fs.appendFile(filepath, '[', function(err) { if(err) { console.log(err); } });
    client.stream('statuses/filter', params, function(stream) {
      stream.on('data', function(tweet)  {
        //parse object to json type string
        tweet = JSON.stringify(tweet);
        ++tweets;
        console.log(tweets + ' out of ' + number);
        //end if over, else add comma for json formatting
        //encapsulated in specific else/if to avoid async errors
        if (tweets == number) {
          fs.appendFile(filepath, tweet + ']', function(err) { if(err) { console.log(err); } });
          tweetsStatus = true;
          stream.destroy();
        }
        else if (tweets < number) {
          fs.appendFile(filepath, tweet + ',', function(err) { if(err) { console.log(err); } });
        }
      });
    });
  }
};

//extract tweets from DB
var tweetsFromMongo = function(response, offline) {
  MongoClient.connect(url, function(err, db) {
    var tweetsJSON = '[';
    db.collection('tweets').find({}).toArray(function(err, results) {
      for (var i = 0; i < results.length; ++i) {
        tweet = JSON.stringify(results[i]);
        tweetsJSON += tweet;
        if (i == results.length-1) {
          tweetsJSON += ']';
        }
        else if (i < results.length-1) {
          tweetsJSON += ',';
        }
      }
      if (!offline) response.send(tweetsJSON);
      else {
        fs.writeFile(response, tweetsJSON);
      }
    });
  });
}
//set html serving directory
app.set("view options", {layout: false});
app.use(express.static(root));

//set up multer uploading
app.use(multer({ dest: './public_html/uploads/', 
  rename: function (fieldname, filename) {
      return filename;
  },
  onFileUploadStart: function (file) {
    console.log(file.originalname + ' is starting ...')
  },
  onFileUploadComplete: function (file) {
    console.log(file.fieldname + ' uploaded to  ' + file.path)
    done=true;
  }
}));

//Handle conversion requests
app.get('/convert/:infile/:outfile', function(req, response) {
  //only start if not already going...
  console.log('convert triggered');
  if (j2c.convertStatus) {
    j2c.json2csv(root + 'uploads/', req.params.infile, req.params.outfile);
    response.send('Buzzing away...');
  } else {
    response.send('Already working, buzz me later');
  }
});

//for preventing operations while tweets.json remains unloaded
app.get('/convert/status/', function(req, response){
  response.send(j2c.convertStatus);
});

//for reporting on conversion events
app.get('/convert/report/', function(req, response) {
  response.send(j2c.report);
  j2c.report = '';
});

//Handle upload attempts 
app.post('/upload/',function(req,res){
  if(done==true){
    console.log(req);
    res.statusCode = 302;
    //send us the index with the name of the uploaded file and uploaded boolean=true
    res.setHeader('Location', 'http://' + req.headers['host'] + '/csv.html?u=1&n=' + encodeURIComponent(req.files.userJSON.name) + '&o=' + encodeURIComponent(req.body.outFile));
    res.end();
  }
});

//for handling reloading of tweets.json 
app.get('/ticker/reqtweets/:number/:query/:outfile', function(req, response) {
  //only start if not already going...
  console.log('trying this...');
  if (tweetsStatus) {
    //var data = "regtweets:\n" + "number: " + request.params.number + "\nquery: " + request.params.query;
    tweetsStatus = false;
    getTweets(req.params.number, req.params.query, root + req.params.outfile, mongo);
    response.send('Buzzing away...');
  } else {
    response.send('Already working, buzz me later');
  }
});

//for preventing operations while tweets.json remains unloaded
app.get('/ticker/status/', function(req, response){
  response.send(tweetsStatus);
});

//for permitting mongo data transferal
app.get('/tweets/', function(req, response){
  tweetsFromMongo(response, false);
});

//output file from mongo
app.get('/export/:outfile', function(req, response) {
  tweetsFromMongo(root+req.params.outfile, true);
});

//for providing access to angular folders
app.get('/node_modules/angular/angular.js', function(req, response) {
  response.sendfile('./node_modules/angular/angular.js');
  
});

//getTweets(tweetsNumber, tweetsQuery, root+tweetsOutputFile);
getTweets(tweetsNumber, tweetsQuery, 'mongo');

app.listen(3000)