$(document).ready(function() {

    //Currently stored cityName -> value attribute
    var cityName = localStorage['cityName'];
    $('#cityOptionInput').attr('value', cityName);
});

$('#save-options-button').on('click', function() {

    var cityName = $('#cityOptionInput').val();
    localStorage['cityName'] = cityName;
    console.log("Local Storage 'cityName': " + cityName);

    //Checklist
    //Make a green checkbox appear after successful save
    //Combine options into popout page?

});