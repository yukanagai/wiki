var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var SpotifyWebApi = require('spotify-web-api-node');
var Spotify = require('machinepack-spotify');
var request = require('request');
var app = express();
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var http = require("http");


app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extend: false}));
app.use(bodyParser.json());

app.set('port', 3000);
app.use('/', express.static(path.join(__dirname, 'public')));


// Client Credential Flow:
var clientId = '04356fac08414ec38bc23fbef2d74a2b';
var clientSecret = 'e0489365728643f088555d41abf6c99e';
var redirect_uri = 'http://localhost:8888/callback';
var scopes = 'user-read-private user-read-email';
var echoKey = '6ZYD20T5AIRI1KWF6';


// Catching the "city" keyword + sending AJAX call to 
// Echo Nest to fetch artists from that city
app.get('/fetchArtists', function(req, res) {
	var options = { 
		host: 'http://developer.echonest.com',
		path: '/api/v4/artist/search?api_key=6ZYD20T5AIRI1KWF6&format=json&results=4&bucket=id:spotify-WW&limit=true&bucket=songs&artist_location='+req.body.city,
		method: 'GET',
	};

	console.log('requesting...');

	request(options, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log("yay ajax call worked", body);
			res.send(body);
		}
	});
});



app.listen(app.get('port'), function() {
	console.log('App listening on http://localhost:%s', app.get('port'));
});