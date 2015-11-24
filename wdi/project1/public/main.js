var weatherAPIKey = '3c8e84ea9c6f7938384d3c3980033d80';
var echoKey = '6ZYD20T5AIRI1KWF6';


var App = React.createClass({
	render: function() {
		return (
			<div id="wrapper">
				<Title />
				<MusicApp />
				<Footer />
			</div>
		);
	}
});

var Title = React.createClass({
	render: function() {
		return(
			<div id="title">
				<h1 id="title1">CITY/SOUNDS.io</h1>
				<h4 id="title2">Create playlists out of cities from around the world.</h4>
			</div>
		);
	}
});

var MusicApp = React.createClass({
	getInitialState: function() {
		return {currentCity: null, currentWeather: null, artist: null, embedURL: null};
	},
	handleWeatherSearch: function(city) {
		this.fetchWeather(city);
		this.fetchArtist(city);
	},
	fetchWeather: function(city) {
		$.ajax({
			url: 'http://api.openweathermap.org/data/2.5/weather/',
			method: 'GET',
			data: {
				q: city,
				APPID: weatherAPIKey
			},
			success: function(result) {
				this.setState({currentWeather: result.weather[0].main});
				this.setState({currentCity: city});

				// initiating fetchArtist API
				this.fetchArtist(city);

				var weatherKeyword = result.weather[0].main;
				var currentWeatherDescrpt = result.weather[0].description;
				
				// Displaying current city's temp on DOM:
				var tempKelvin = result.main.temp;
				var tempFarenheit = Math.round(tempKelvin * 9/5 - 459.67);

			   $('#weatherTemp').html(tempFarenheit + "&deg;F");
			   $('#weatherDescription').html(currentWeatherDescrpt);
			   $('#weatherCity').html(city);

			   // Initiating animation based on weather condition:
			   if (weatherKeyword == "Clouds") {
					animateClouds();
				} else if (weatherKeyword == "Clear") {
					animateClear();
				} else if (weatherKeyword == "Haze" ) {
					animateHaze();
				} else if (weatherKeyword == "Rain") {
					 animateRain();
				} else {
					return;
				};

			}.bind(this)
		});
	},
	fetchArtist: function(city) {
		$.ajax({
	        url: 'http://developer.echonest.com/api/v4/artist/search?',
	        method: 'GET',
	        data: {
	        	api_key: echoKey,
	        	format: 'json',
	        	results: 5,
	        	bucket: 'id:spotify-WW&limit=true',
	        	bucket: 'songs',
	        	artist_location: city
	        },
	        success: function(result) {
	        	var artists = result.response.artists;
	    		var artistsNames = [];
	    		for (var i=0; i<artists.length; i++) {
	    			var artistName = artists[i].name;
	    			artistsNames.push(artistName);
	    		};	
	    		var artistURL = artistsNames.join('&artist=');

	    		$('#playlistTitle').html("Playlist from artists: " + artistsNames);

	        	this.setState({artist: artistsNames});
	        	this.generatePlaylist(artistURL, city);
			}.bind(this)
		});
	},
	generatePlaylist: function(artistGroup, city) {
		$.ajax({
			url: 'http://developer.echonest.com/api/v4/playlist/static?api_key=6ZYD20T5AIRI1KWF6&artist='+artistGroup+'&format=json&results=10&type=artist&bucket=id:spotify-WW&limit=true&song_selection=song_hotttnesss-top&bucket=tracks&bucket=audio_summary&bucket=artist_location',
			method: 'GET',
			success: function(data) {
				var songs = data.response.songs;
				var songsIdCollection = [];
				// Iterating to grab the song's Spotify ID:
				songs.forEach(function(songData) {
					var trackID = songData.tracks[0].foreign_id;
					var splitID = trackID.split(':');
					var spotifyID = splitID[splitID.length-1];
					songsIdCollection.push(spotifyID);
				});
				
				var tracks = songsIdCollection.join(',');
				
				var embed = '<iframe src="https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:TRACKS" id="widget" style="width: 400px; height: 360px;" frameborder="0" allowtransparency="true"></iframe>';

				var trackEmbed = embed.replace('PREFEREDTITLE', "Playlist for " + city).replace('TRACKS', tracks);

				this.setState({embedURL: trackEmbed});
			
				// $('#playlist').html(trackEmbed);

			}.bind(this)
		});
	},
	render: function() {
		return (
			<div className="musicBox">
				<SearchForm onWeatherSearch={this.handleWeatherSearch}    />
				<WeatherPanel city={this.state.currentCity} weather={this.state.currentWeather} />
				<Playlist iframe={this.state.embedURL} />
			</div>
		);
	}
});

var SearchForm = React.createClass({
	handleSubmit: function(event) {
		event.preventDefault();
		var city = this.refs.city.value;
		// Initiates OpenWeather API call on submit:
		this.props.onWeatherSearch(city);
		if (!city) { return; }
		this.refs.city.value = "";
		return;
	},
	render: function() {
		return(
			<form onSubmit={this.handleSubmit} id="form">
				<input type="text" placeholder="Type in a city..." ref="city" id="searchbox" />
			</form>
		);
	}
});


var WeatherPanel = React.createClass({
	render: function() {
		return (
			<div className="WeatherComponent">
				<div id="weatherTemp"></div>
				<div id="weatherDescription"></div>
				<div id="weatherCity"></div>
			</div>
		);
	}
});


var Playlist = React.createClass({
	render: function() {
		return(
			<div className="playlistComponent">
				<div id="playlist"></div>
			</div>
		);
	}
});

var Footer = React.createClass({
	render:function(){
		return(
			<div id="footer">
				<p>Created & designed by <a href="http://twitter.com/yukanagai">@yukanagai</a> using Spotify's Web API, Echo Nest API, React, and Node/Express.</p>
			</div>
		);
	}
});



ReactDOM.render(<App />, document.getElementById('content') );