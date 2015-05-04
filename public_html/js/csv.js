//var for tracking conversion status
var converting = false;

//for aquiring parameters I'm passing via GET
var fetchGET = function() {
  //get GET vars from url
  var params = window.location.search.replace("?", "").split('&');
  var r = {};
  //and parse them...
  for (var i = 0; i < params.length; ++i) {
    p = params[i].split('=');
    if (p.length == 2) {
      r[p[0]] = p[1];
    }
  }
  return r;
}

//Convert file from JSON
var convertFile = function (infile, outfile) {
  console.log('Converting file...');

  if (!converting) {
    document.getElementById('loading').style.display = 'inline';
    converting = true;
    var reqs = "/convert/" + encodeURIComponent(infile) + "/" + encodeURIComponent(outfile);
    $.get( reqs , function( r ) { console.log(r) });
    setTimeout(function() {
        convertFile(infile, outfile);
      }, 1000
      );
  } else {
    var reqs = "/convert/report/";
    $.get( reqs , function( r ) { 
      document.getElementById('notice-bar').innerHTML += r;
      if (!r.contains("didn't")) {
      $.get("/convert/status/", function(done) {
          if (done) {
            document.getElementById('convBox').style.display = 'block';
            document.getElementById('loading').style.display = 'none';
            converting = false;
            document.getElementById('convText').innerHTML = '<a class="pure-button pure-button-primary" href="/uploads/' +outfile + '" download="' + outfile + '">Download</a>';
            window.location = '/uploads/' + outfile;
          } else {
            setTimeout(function() {
              document.getElementById('loading').style.display = 'inline';
              convertFile(infile, outfile);
            }, 1000)
          }
        });
      }
      else document.getElementById('loading').style.display = 'none';
    });
  }
}

document.onready = function() {
  //activate angular bindings
  angular.module('ticker', []).config(function(injectables) {}).run(function(injectables) {});
  //fetch get variables
  var get = fetchGET();
  //check if necessary parameters are ready
  if (get.u && get.n && get.u == 1) {
    document.getElementById('notice-bar').innerHTML = '<p class="green"><strong>' + get.n + '</strong> was uploaded!</p>';
  }
  //convert file if requested
  if (get.n && get.o) { convertFile(get.n, get.o); }
}

