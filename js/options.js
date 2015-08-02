$(document).ready(function() {

    //Currently stored cityName -> value attribute
    var cityName = localStorage.cityName;
    $('#cityOptionInput').attr('value', cityName);

    //Currently stored checkFreq -> value attribute
    var checkFreq = localStorage.checkFreq;
    $('#checkFreqInput').attr('value', checkFreq);

});

$('#save-options-button').on('click', function() {

    var cityName = $('#cityOptionInput').val();
    localStorage.cityName = cityName;
    console.log("Local Storage 'cityName': " + cityName);

    var checkFreq = $('#checkFreqInput').val();
    if(checkFreq >= 3) {
        $('#checkFreqError').hide();
        localStorage.checkFreq = checkFreq;
        console.log("Local Storage 'cityName': " + checkFreq);

        $('#optionsSaved').show().delay(2000).fadeOut(2000);
    } else 
        $('#checkFreqError').show();



    //Checklist
    //Make a green checkbox appear after successful save
    //Combine options into popout page?
    //If data returned list == 0 or something, "Error, city not found"
    //Documentation for query searches
    //Actually use own API

});