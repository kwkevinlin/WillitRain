//Moving back to local later
var weatherVar = new Array(11);
var willRain = false;

/*
	To Do for popup.js
	- Separate fetch data from popup display
	- If last visit > 1 hr (?) away, refetch data and display
	  else, display old data
*/

//When Document Ready
$(document).ready(function() {
	$('#cityInput').attr('value', localStorage.cityName);

	$('#searchWeather').click(function() {

		//If input city name changed
		if (localStorage.currentCity != $('#cityInput').val()) {
			console.log("Fetching new");
			fetchWeather();
		} else {
			//If city not changed, only allow updating every 1.5 hours
			if (Date.now() > localStorage.lastChecked + 5400000) {
				console.log("Fetching new");
				fetchWeather();
			}
			else {
				//Use existing data
				console.log("Using old data");
				weatherVar = JSON.parse(localStorage.weatherObj);
			}
		}

		if (willRain === true) {
			console.log("It is going to rain in the next 36 hours!");
			$('#rainLabel').html("Yes, it will rain!");
			willRain = false;
		} else 
			$('#rainLabel').html("No rain, hurray!");

		drawGraph();
	}); 

}); //End document.ready()


function fetchWeather() {
	var cityParam = $('#cityInput').val();
	localStorage.currentCity = cityParam;

	$.getJSON('http://api.openweathermap.org/data/2.5/forecast?q=' + cityParam + '&units=imperial', function(data) {
		//http://api.openweathermap.org/data/2.5/forecast?q=new%20york,us&APPID=a51c4014680aa337f617628d6040187f&units=imperial

		/* 	2D array to hold parsed data. [][0]
			[][0] = Weather status (rain)
			[][1] = Weather description (moderate rain)
			[][2] = Current temp (70 F)
			[][3] = Current low
			[][4] = Current high
			[][5] = Data/time of caluclation, UTC
		*/
		//var weatherVar = new Array(11);
		for (var i = 0; i < weatherVar.length; i++)
			weatherVar[i] = new Array(6);

		for (i = 0; i < weatherVar.length; i++) {
			weatherVar[i][0] = data.list[i].weather[0].main;
			weatherVar[i][1] = data.list[i].weather[0].description.charAt(0).toUpperCase() + data.list[i].weather[0].description.slice(1); //Capitalize first letter
			weatherVar[i][2] = data.list[i].main.temp+1; //For testing
			weatherVar[i][3] = data.list[i].main.temp_min;
			weatherVar[i][4] = data.list[i].main.temp_max;
			weatherVar[i][5] = data.list[i].dt_txt;

			if (data.list[i].weather[0].main == "Rain") {
				willRain = true;
			}
		}

		localStorage.weatherObj = JSON.stringify(weatherVar);

	});
}

function drawGraph() {

	google.load('visualization', '1.1', {
		packages: ['line'],
		callback: drawChart
	});

	function drawChart() {

		//Note: Can actually pass JSON directly to construct table

		var data = new google.visualization.DataTable();
		data.addColumn('date');
		data.addColumn('number', 'Current');
		data.addColumn('number', 'High');
		data.addColumn('number', 'Low');

		/* 	weatherVar Holding:
			[][0] = Weather status (rain)
			[][1] = Weather description (moderate rain)
			[][2] = Current temp (70 F)
			[][3] = Current low
			[][4] = Current high
			[][5] = Data/time of caluclation, UTC
		*/

		for (var i = 0; i < weatherVar.length; i++) {
			console.log(weatherVar[i][0] + " - " + weatherVar[i][1] + " - " + weatherVar[i][2] + " - " + weatherVar[i][3] + " - " + weatherVar[i][4] + " - " + weatherVar[i][5]);
		}

		data.addRows([
			[new Date(weatherVar[0][5]), weatherVar[0][2], weatherVar[0][4], weatherVar[0][3]],
			[new Date(weatherVar[1][5]), weatherVar[1][2], weatherVar[1][4], weatherVar[1][3]],
			[new Date(weatherVar[2][5]), weatherVar[2][2], weatherVar[2][4], weatherVar[2][3]],
			[new Date(weatherVar[3][5]), weatherVar[3][2], weatherVar[3][4], weatherVar[3][3]],
			[new Date(weatherVar[4][5]), weatherVar[4][2], weatherVar[4][4], weatherVar[4][3]],
			[new Date(weatherVar[5][5]), weatherVar[5][2], weatherVar[5][4], weatherVar[5][3]],
			[new Date(weatherVar[6][5]), weatherVar[6][2], weatherVar[6][4], weatherVar[6][3]],
			[new Date(weatherVar[7][5]), weatherVar[7][2], weatherVar[7][4], weatherVar[7][3]],
			[new Date(weatherVar[8][5]), weatherVar[8][2], weatherVar[8][4], weatherVar[8][3]],
			[new Date(weatherVar[9][5]), weatherVar[9][2], weatherVar[9][4], weatherVar[9][3]],
			[new Date(weatherVar[10][5]), weatherVar[10][2], weatherVar[10][4], weatherVar[10][3]]
		]);

		/*
			Issues:
			temp = temp_max
			To Do:
			Auto call API every 3 - 6 hours, ping users. Permissions: notification
		*/

		//https://developers.google.com/chart/interactive/docs/gallery/linechart#Configuration_Options
		var options = {
			chart: {
				title: 'Weather Forcast',
				subtitle: 'for upcoming 36 hours'
			},
			width: 450,
			height: 250,
			legend: {
				position: 'bottom'
			},
			hAxis: {
    			format: "HH:mm"
    		}
		};

		var chart = new google.charts.Line(document.getElementById('weatherChart'));

		chart.draw(data, options);
	}
}

/*
Flow
Type in for (autocomplete?)
Dropdown -> confirm your city
Submit
*/