//When Document Ready
$(document).ready(function() {

	/*
	var $h1Tag = $('#h1Test');
	$h1Tag.html("Hello jQuery");

	fetchParseJSON();

	});
	*/

	$('#checkPage').click( function () {

	});

	$('#findCityButton').click( function() {
		var cityParam = $('#cityInput').val();

		var weatherJSON;		
		$.getJSON("http://api.openweathermap.org/data/2.5/forecast?q=new%20york,us&units=imperial", function(data) {

			/* 	2D array to hold parsed data. [][0]
				[][0] = Weather status (rain)
				[][1] = Weather description (moderate rain)
				[][2] = Current temp (70 F)
				[][3] = Current low
				[][4] = Current high
			*/
			var weatherDescription = new Array(11);
  			for (var i = 0; i < weatherDescription.length; i++)
    			weatherDescription[i] = new Array(5);

			var willRain = false;

			for (i = 0; i < weatherDescription.length; i++) {
				weatherDescription[i][0] = data.list[i].weather[0].main;
				weatherDescription[i][1] = data.list[i].weather[0].description.charAt(0).toUpperCase() + data.list[i].weather[0].description.slice(1); //Capitalize first letter
				weatherDescription[i][2] = data.list[i].main.temp;
				weatherDescription[i][3] = data.list[i].main.temp_min;
				weatherDescription[i][4] = data.list[i].main.temp_max;

				if (data.list[i].weather[0].main == "Rain") {
					willRain = true;
				}
			}

			if (willRain === true) {
				console.log("It is going to rain in the next 36 hours!");
				$('#rainLabel').html("Yes, it will rain!");
			}

		}); //End getJSON()

	}); //End findCityButton.click()

}); //End document.ready()


/*
Flow
Type in for (autocomplete?)
Dropdown -> confirm your city
Submit
*/