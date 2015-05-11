var buildGraphs = function(data1, data2, data3) {
    var options1 = {
        //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
        scaleBeginAtZero : true,

        //Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines : true,

        //String - Colour of the grid lines
        scaleGridLineColor : "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth : 1,

        //Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,

        //Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,

        //Boolean - If there is a stroke on each bar
        barShowStroke : true,

        //Number - Pixel width of the bar stroke
        barStrokeWidth : 2,

        //Number - Spacing between each of the X value sets
        barValueSpacing : 5,

        //Number - Spacing between data sets within X values
        barDatasetSpacing : 1,

        //String - A legend template
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

    }
    var options2 = {

        ///Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines : true,

        //String - Colour of the grid lines
        scaleGridLineColor : "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth : 1,

        //Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,

        //Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,

        //Boolean - Whether the line is curved between points
        bezierCurve : true,

        //Number - Tension of the bezier curve between points
        bezierCurveTension : 0.4,

        //Boolean - Whether to show a dot for each point
        pointDot : true,

        //Number - Radius of each point dot in pixels
        pointDotRadius : 4,

        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth : 1,

        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius : 20,

        //Boolean - Whether to show a stroke for datasets
        datasetStroke : true,

        //Number - Pixel width of dataset stroke
        datasetStrokeWidth : 2,

        //Boolean - Whether to fill the dataset with a colour
        datasetFill : true,

        //String - A legend template
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

    };
    var options3 = {
      //Boolean - Show a backdrop to the scale label
      scaleShowLabelBackdrop : true,

      //String - The colour of the label backdrop
      scaleBackdropColor : "rgba(255,255,255,0.75)",

      // Boolean - Whether the scale should begin at zero
      scaleBeginAtZero : true,

      //Number - The backdrop padding above & below the label in pixels
      scaleBackdropPaddingY : 2,

      //Number - The backdrop padding to the side of the label in pixels
      scaleBackdropPaddingX : 2,

      //Boolean - Show line for each value in the scale
      scaleShowLine : true,

      //Boolean - Stroke a line around each segment in the chart
      segmentShowStroke : true,

      //String - The colour of the stroke on each segement.
      segmentStrokeColor : "#fff",

      //Number - The width of the stroke value in pixels
      segmentStrokeWidth : 2,

      //Number - Amount of animation steps
      animationSteps : 100,

      //String - Animation easing effect.
      animationEasing : "easeOutBounce",

      //Boolean - Whether to animate the rotation of the chart
      animateRotate : true,

      //Boolean - Whether to animate scaling the chart from the centre
      animateScale : false,

      //String - A legend template
      legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

  }

    var ctx = document.getElementById('myBar').getContext("2d");
    var myBarChart = new Chart(ctx).Bar(data1, options1);

    ctx = document.getElementById('myLine').getContext("2d");
    var myLineChart = new Chart(ctx).Line(data2, options2);

    ctx = document.getElementById('myPolar').getContext("2d");
    var myPolarChart = new Chart(ctx).PolarArea(data3, options3);
}

var tweetdex = 0; //counter to keep track keep track of current tweet

//Cheating to kill the different
var tweetTickerActive = false;
var tagTickerActive = false;
var tweetTickerKill = false;
var tagTickerKill = false;

var dispData = function (tweets) {
  tweetTickerKill = false;
  tweetTickerActive = false;
  lengths = [0,0,0,0]
  var tracker = [];
  var friend_s = [];
  var follower_s = [];
  var letters = {};
  for (var i = 0; i < tweets.length; ++i) {
    var l = tweets[i].text.length;
    if (l <= 35) lenghts[0]++;
    else if (l <= 70) lengths[1]++;
    else if (l <= 105) lengths[2]++;
    else if (l <= 140) lengths[3]++;
    tracker.push([tweets[i].friends, tweets[i].followers]);
    var t = tweets[i].text;
    for (var j = 0; j < t.length; ++j) {
      if (letters[t[j]]) letters[t[j]]++;
      else letters[t[j]] = 1;
    }
  }
  tracker.sort(function(a, b) {
    return a[0]-b[0];
  });
  for (i = 0; i < tracker.length; ++i) {
    friend_s.push(tracker[i][0]);
    follower_s.push(tracker[i][1]);
  }
  var fourth = [];
  var keys = Object.keys(letters);
  for (var i = 0; i < keys.length; ++i) {
    if (keys[i] != ' ') fourth.push([keys[i], letters[keys[i]]]);
    // var tmp = {}
    // tmp['value'] = letters[keys[i]]; 
    // var rnd = Math.floor(Math.random()*16777215);
    // tmp['color'] = '#' + rnd.toString(16);
    // tmp['highlight'] = '#'+(rnd+25).toString(16);
    // tmp['label'] = keys[i];
    // third.push(tmp);
  }
  fourth.sort(function(a, b) {
    return b[1]-a[1];
  });
  var third = [];
  for (var i = 0; i < fourth.length && i < 10; ++i) {
    var tmp = {}
    tmp['value'] = fourth[i][1]; 
    var rnd = Math.floor(Math.random()*16777215);
    tmp['color'] = '#' + rnd.toString(16);
    tmp['highlight'] = '#'+(rnd+25).toString(16);
    tmp['label'] = fourth[i][0];
    third.push(tmp);
  }
  var data1 = {
      labels: ["s <= 35", "35 < s <= 70", "70 < s <= 105", "105 < s <= 140"],
      datasets: [
          {
              label: "Tweet Length",
              fillColor: "rgba(220,220,220,0.5)",
              strokeColor: "rgba(220,220,220,0.8)",
              highlightFill: "rgba(220,220,220,0.75)",
              highlightStroke: "rgba(220,220,220,1)",
              data: lengths
          }
      ]
  };

  var data2 = {
    labels: friend_s,
    datasets: [
        {
            label: "Friends vs Followers",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: follower_s
        }
    ]
  };


  var data3 = third;

  buildGraphs(data1, data2, data3);


}


var tagdex = 0; //counter to keep track keep track of current tag


var aquireTweets = function () {
  //var widget_id = "571079149499187200"; //id of twitter widget
  //abuseWidget(widget_id);
  // old aquire tweets, with tweets.json
  // console.log('aquiring tweets...');
  var tweets = [];
  var tags = [];
  var tweet_loc = '/tweets/'
  $.get(tweet_loc, function(data) {
    // console.log(data);
    json = JSON.parse(data);
    $.each(json, function(i, tweet) {
      tweets.push({
        "screen_name" : tweet.user.screen_name,
        "text" : tweet.text,
        "color" : tweet.user.profile_background_color,
        "friends" : tweet.user.friends_count,
        "followers" : tweet.user.followers_count
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
    dispData(tweets);
    tagTickerKill = false;
    tagTickerActive = false;
  });
}


var tickerInit = function() {
  //Check status of loading...
  var query = document.getElementById('text-1').value;
  var number = document.getElementById('num-1').value;
  var outfile = document.getElementById('text-2').value;
  if (!tagTickerKill && !tweetTickerKill) {
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
