d3 = require('d3');

'use strict'

d3.json("https://api.wunderground.com/api/ad2a396136d9d1ae/hourly/q/DC/Washington.json", function(err, response){

		var data = response.hourly_forecast;

		for(var i = 0; i < 24; i++){

			var square = d3.select('#square_' + (i + 1));
			var forecast = data[i];

			var commuteTimes = ['8:00 AM', '9:00 AM', '10:00 AM', '5:00 PM', '6:00 PM', '7:00 PM'];

			var info = square.select('.data');

			var temp = parseInt(forecast.temp.english),
				dewpoint = parseInt(forecast.dewpoint.english),
				rain = parseInt(forecast.pop),
				tempCheck = temp >= 83,
				dewCheck = dewpoint >= 70,
				rainCheck = rain >= 11;

			square.select('.time').html(forecast.FCTTIME.civil.replace(':00', ''));
			square.select('.rain').transition().duration(500).style('height', rain + '%');

			info.select('#heat').html(temp + '°').classed('bad', tempCheck);
			info.select('#humidity').html(dewpoint + '°').classed('bad', dewCheck);

			info.transition().duration(1000).style('opacity', 1);

			square
				.classed('commute', commuteTimes.indexOf(forecast.FCTTIME.civil) > -1)
				.classed('bad', tempCheck || dewCheck || rainCheck)
				.classed('good', !(tempCheck || dewCheck || rainCheck));

		}
	})







