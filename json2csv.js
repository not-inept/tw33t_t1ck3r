//change to false to handle any json file
var tweetsOnly = true;

//includes
var fs = require('fs');

//function for making csv files formatted the way the prof asked for them
var buildTweets = function(obj, call) {
  var tweetsObj = [];
  for (var i = 0; i < obj.length; ++i) {
    var tweet = {
      "created_at" : obj[i].created_at,
      "id" : obj[i].id,
      "text" : obj[i].text,
      "user_id" : obj[i].user.id,
      "user_name" : obj[i].user.name,
      "user_screen_name" : obj[i].user.screen_name,
      "user_location" : obj[i].user.location,
      "user_followers_count" : obj[i].user.followers_count,
      "user_friends_count" : obj[i].user.friends_count,
      "user_created_at" : obj[i].user.created_at,
      "user_time_zone" : obj[i].user.time_zone,
      "user_profile_background_color" : obj[i].user.profile_background_color,
      "user_profile_image_url" : obj[i].user.profile_image_url,
      "geo" : obj[i].geo,
      "coordinates" : obj[i].coordinates,
      "place" : obj[i].place
    }
    tweetsObj.push(tweet); 
  }
  return tweetsObj;
}

//modular format for proper portability
module.exports = {
  convertStatus : true,
  report : '',
  json2csv : function(dir, jsonFile, outputfile) {
    module.exports.convertStatus = false;
    module.exports.report = '';
    fs.readFile(dir + jsonFile, 'utf8', function (err, data) {
      if (err) {
        module.exports.convertStatus = true;
        module.exports.report += "<p class='red'>File didn't exist for reading D: !</p>";
      } else {
        var obj = JSON.parse(data);
        // for working specifically with tweets
        if (tweetsOnly) obj = buildTweets(obj);
        var keys = Object.keys(obj[0]);
        var out = "";
        // prepare header row
        for (var i = 0; i < keys.length; ++i) {
          out += '"' + keys[i] + '"';
          if (i != keys.length-1) out += ',';
        } out += '\n';
        for (var i = 0; i < obj.length; ++i) {
          for (var j = 0; j < keys.length; ++j) {
            out += '"' + obj[i][keys[j]] + '"';
            if (j != keys.length-1) out += ',';
          } out += '\n';
        } 
        //check to see if existed already
        fs.stat(dir+outputfile, function(err, stat) {
            if(err == null) {
                module.exports.report += "<p class='red'>File exists, overwriting...</p>";
            } 
        });
        fs.appendFile(dir+outputfile, out);
        module.exports.convertStatus = true;
      }
    });
  }
}
/*

*/