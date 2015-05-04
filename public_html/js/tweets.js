var tweetdex = 0; //counter to keep track keep track of current tweet

//Cheating to kill the different
var tweetTickerActive = false;
var tagTickerActive = false;
var tweetTickerKill = false;
var tagTickerKill = false;

var tweetTicker = function (tweets) {
  //initialize first 6 tweets
  //var interval = 3000; //ms interval for looping
  //var interval = document.getElementById('slider-2').value*1000;
  var ta = ""; //to append
  var tweetBox = document.getElementById('tweetBox'); //element we'll be messing with
  tweetdex = 0;
  var tweetCount = 0;
  while (tweetCount < 6) {
    ta += '<div class="tweet" style="top: ';
    ta += tweetCount*20; //distance from top for visibility
    ta += '%;"><div class="tweetPic" style="background-color: #';
    ta += tweets[tweetdex].color;
    ta += ';"><a class="tweetUser" href="https://www.twitter.com/';
    ta += tweets[tweetdex].screen_name;
    ta += '" target="_blank">@';
    ta += tweets[tweetdex].screen_name;
    ta += '</a></div><div class="tweetText">';
    ta += tweets[tweetdex].text;
    ta += '</div></div>';
    ++tweetdex;
    ++tweetCount;
    if (tweetdex >= tweets.length) { //reset if no more tweets available
      tweetdex = 0; 
    }
  } //last tweet is hidden
  tweetBox.innerHTML = ta; //append to tweetbox
  tweetTickerActive = true;
  tickTweets(tweets);
}

var tickTweets = function(tweets) {
  var interval = document.getElementById('slider-2').value*1000;
  var tweetBox = document.getElementById('tweetBox'); //element we'll be messing with
  tweetInt = setTimeout(function() {
    $.each(tweetBox.childNodes, function(i, node) { //go through each node and increment height
      var newTop = node.style.top.replace('%','')-20;
      node.style.top =  newTop + "%";
    });
    setTimeout(function() { //wait before removing to avoid visual freakouts
      if (tweetdex >= tweets.length) { //reset if no more tweets available
        tweetdex = 0; 
      }
      var ta = '<div class="tweet" style="top: 100%;"><div class="tweetPic" style="background-color: #';
      ta += tweets[tweetdex].color;
      ta += ';"><a class="tweetUser" href="https://www.twitter.com/';
      ta += tweets[tweetdex].screen_name;
      ta += '" target="_blank">@';
      ta += tweets[tweetdex].screen_name;
      ta += '</a></div><div class="tweetText">';
      ta += tweets[tweetdex].text;
      ta += '</div></div>';
      ++tweetdex;
      tweetBox.innerHTML += ta;
      tweetBox.removeChild(tweetBox.firstChild);
    }, interval*(2/3));
    if (!tweetTickerKill) { //if signal to kill ticker has been broadcast
      tickTweets(tweets);
    } else {
      tweetTickerKill = false;
      tweetTickerActive = false;
    }
  }, interval);
}

var tagdex = 0; //counter to keep track keep track of current tag
var tagTicker = function (tags) {
  //initialize first 6 tweets
  //var interval = 3500; //ms interval for looping
  var ta = ""; //to append
  var tagBox = document.getElementById('tagBox'); //element will be messing with
  var tagKeys = Object.keys(tags);
  tagdex = 0;
  var tagCount = 0;
  while (tagCount < 6) {
    ta += '<div class="tag" style="left: ';
    ta += tagCount*20; //distance from top for visibility
    ta += '%;"><a href="https://www.twitter.com/hashtag/';
    ta += tagKeys[tagdex];
    ta += '" target="_blank">#';;
    ta += tagKeys[tagdex];
    ta += '</a></div>';
    ++tagdex;
    ++tagCount
    if (tagdex >= tagKeys.length) { //reset if no more tweets available
      tagdex = 0; 
    }
  } //last tweet is hidden
  tagBox.innerHTML = ta; //append to tagbox
  tagTickerActive = true;
  tickTags(tagKeys);
}

var tickTags = function(tagKeys) {
  var interval = document.getElementById('slider-1').value*1000;
  var tagBox = document.getElementById('tagBox'); //element will be messing with
  setTimeout(function() {
    $.each(tagBox.childNodes, function(i, node) { //go through each node and increment height
      var newTop = node.style.left.replace('%','')-20;
      node.style.left =  newTop + "%";
    });
    setTimeout(function() { //wait before removing to avoid visual freakouts
      if (tagdex >= tagKeys.length) { //reset if no more tweets available
        tagdex = 0; 
      }
      ta = '<div class="tag" style="left: 100%"><a href="https://www.twitter.com/hashtag/';
      ta += tagKeys[tagdex];
      ta += '" target="_blank">#';;
      ta += tagKeys[tagdex];
      ta += '</a></div>';
      ++tagdex;
      tagBox.innerHTML += ta;
      tagBox.removeChild(tagBox.firstChild);
    }, interval*(2/3));
      if (!tagTickerKill) { //if signal to kill ticker has been broadcast
        tickTags(tagKeys);
      } else {
        tagTickerKill = false;
        tagTickerActive = false;
      }
  }, interval);
}

var aquireTweets = function () {
  //var widget_id = "571079149499187200"; //id of twitter widget
  //abuseWidget(widget_id);
  // old aquire tweets, with tweets.json
  console.log('aquiring tweets...');
  var tweets = [];
  var tags = [];
  var tweet_loc = '/tweets/'
  $.get(tweet_loc, function(data) {
    console.log(data);
    json = JSON.parse(data);
    $.each(json, function(i, tweet) {
      tweets.push({
        "screen_name" : tweet.user.screen_name,
        "text" : tweet.text,
        "color" : tweet.user.profile_background_color
      });
      //console.log(tweet.user.profile_image_url_https);
      $.each(tweet.entities.hashtags, function(j, tag) {
        if (tags[tag.text]) {
          ++tags[tag.text];
        } else {
          tags[tag.text] = 1;
        }
      });
    });
    console.log(tweets);
    tweetTicker(tweets);
    tagTicker(tags);
  });
}


var tickerInit = function() {
  //Check status of loading...
  var query = document.getElementById('text-1').value;
  var number = document.getElementById('num-1').value;
  var outfile = document.getElementById('text-2').value;
  if (!tagTickerKill && !tweetTickerKill && tagTickerActive && tweetTickerActive) {
    tagTickerKill = true; //kill tickers if running
    tweetTickerKill = true;
    var reqs = "/ticker/reqtweets/" + number + "/" + query + "/" + outfile;
    $.get( reqs , function( r ) { console.log(r) });
    tickerInit();
  } else {
    $.get( "/ticker/status/", function( loaded ) {
      if (loaded) {
        document.getElementById('loading').style.display = 'none';
        aquireTweets();
      } else {
        setTimeout(function() {
          document.getElementById('loading').style.display = 'inline';
          tickerInit();
          console.log('pulling...');
        }, 1000)

      }
    });
  }
}

var exportJSON = function() {
  var outfile = document.getElementById('text-3').value;
  var reqs = "/export/" + outfile;
  $.get( reqs , function( r ) { console.log(r) });
}

tickerInit();

angular.module('ticker', []).
config(function(injectables) { 

}).
run(function(injectables) { // instance-injector
  // This is an example of a run block.
  // You can have as many of these as you want.
  // You can only inject instances (not Providers)
  // into run blocks
});