//When Document Ready
$(document).ready(function() {

	$('#checkPage').click( function () { //# = id

	var $h1Tag = $('#h1Test');
	$h1Tag.html("Hello jQuery");

	fetchParseJSON();

	});
});

function fetchParseJSON() {
	$.getJSON('http://ip.jsontest.com/', function(data) {
		$.each(data, function(key, value) {
			confirm(value);
		});

	});
}
