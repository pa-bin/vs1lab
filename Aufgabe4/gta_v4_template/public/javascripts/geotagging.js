// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.
// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...
console.log("The geoTagging script is going to start...");



function updateLocation(helper) {
    const map = document.getElementById("mapView");
    const obj = new MapManager;
    if(document.getElementById("latitude").value === "" || document.getElementById("longitude").value === ""){
        LocationHelper.findLocation(callback => {
         //console.log(callback.latitude);
         document.getElementById("latitude").value = callback.latitude;
         document.getElementById("longitude").value = callback.longitude;
         document.getElementById("current_latitude").value = callback.latitude;
         document.getElementById("current_longitude").value = callback.longitude;
         map.src = obj.getMapUrl(callback.latitude, callback.longitude);
         });
    }
    else
    {
    map.src = obj.getMapUrl(document.getElementById("latitude").value, document.getElementById("longitude").value);
    }
}
/**
 * A class to help using the HTML5 Geolocation API.
 */

// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    updateLocation();
});

document.getElementById("add-tag").addEventListener("submit", async (event) => {
    event.preventDefault();

    //muss noch was rein (glaub ich)

});

document.getElementById("searchButton").addEventListener("submit", async (event) => {
    event.preventDefault();

    //muss noch was rein (glaub ich)
});