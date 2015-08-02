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

        //Clears existing alarm
        chrome.alarms.clearAll();

        //Initiate alarm
        chrome.alarms.create("fetchAlarm", {
                delayInMinutes: 1, periodInMinutes: 1
                //delayInMinutes: checkFreq * 60, 
                //periodInMinutes: checkFreq * 60
            } 
        );

        chrome.alarms.onAlarm.addListener( function(alarm) {
            console.log("Got an alarm!", alarm);

            //If weatherVar[i][0] == rain
            chrome.notifications.clear("notif");
            chrome.notifications.create("notif", {
                type: "basic",
                iconUrl: "icons/icon48.png",
                title: "Will It Rain?",
                message: "Rain expected tomorrow!"
            });

            chrome.notifications.onClicked.addListener(function (notifID) {
                console.log("Notification clicked: " + notifID);
                //open popup.html
            });

        });

    } else 
        $('#checkFreqError').show();

});

    //Checklist
    //Combine options into popout page?

    //Separate parse data and display data

    //Make Yes/No accented when selected
    //Hide how often to check notify user only if yes selected

    //Alarm not persistent yet

