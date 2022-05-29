// File origin: VS1LAB A2 

/**
 * A class to help using the HTML5 Geolocation API.
 */
// eslint-disable-next-line no-unused-vars
class LocationHelper {
    // Location values for latitude and longitude are private properties to protect them from changes.
    #latitude = '';

    /**
     * Getter method allows read access to privat location property.
     */
    get latitude() {
        return this.#latitude;
    }

    #longitude = '';

    get longitude() {
        return this.#longitude;
    }

    /**
     * Create LocationHelper instance if coordinates are known.
     * @param {string} latitude 
     * @param {string} longitude 
     */
    constructor(latitude, longitude) {
        this.#latitude = (parseFloat(latitude)).toFixed(5);
        this.#longitude = (parseFloat(longitude)).toFixed(5);
    }

    /**
     * The 'findLocation' method requests the current location details through the geolocation API.
     * It is a static method that should be used to obtain an instance of LocationHelper.
     * Throws an exception if the geolocation API is not available.
     * @param {*} callback a function that will be called with a LocationHelper instance as parameter, that has the current location details
     */
    static findLocation(callback) {
        const geoLocationApi = navigator.geolocation

        if (!geoLocationApi) {
            throw new Error("The GeoLocation API is unavailable.");
        }
        // Call to the HTML5 geolocation API.
        // Takes a first callback function as argument that is called in case of success.
        // Second callback is optional for handling errors.
        // These callbacks are given as arrow function expressions.
        geoLocationApi.getCurrentPosition((location) => {
            // Create and initialize LocationHelper object.
            let helper = new LocationHelper(location.coords.latitude, location.coords.longitude);
            // Pass the locationHelper object to the callback.
            callback(helper);
        }, (error) => {
            alert(error.message)
        });
    }

    static updateLocation(){
        console.log(document.cookie.split("=")[1]);
        if(document.cookie.split("=")[1] == null || document.cookie.split("=")[1].match(/^ *$/) !== null){
            LocationHelper.findLocation(callback => {
                document.cookie = "location=" + callback.latitude + "_" + callback.longitude;
                  document.getElementById("latitude").value = callback.latitude;
                  document.getElementById("longitude").value = callback.longitude;
                  document.getElementById("latitudeDiscoverySearch").value = callback.latitude;
                  document.getElementById("longitudeDiscoverySearch").value = callback.longitude;
                  document.getElementById("mapView").src = new MapManager("cbNCoIPEkmRLNU7bmHaJcRAejpzrjRiD").getMapUrl(callback.latitude, callback.longitude, JSON.parse(document.getElementById('map-image').dataset.tags), 16);
              });
        } else {
            let loc = document.cookie.split("=")[1].split("_");
            let lat = loc[0];
            let lon = loc[1];
            console.log("lat " + lat);
            console.log("lon " + lon);
            document.getElementById("latitude").value = lat;
            document.getElementById("longitude").value = lon;
            document.getElementById("latitudeDiscoverySearch").value = lat;
            document.getElementById("longitudeDiscoverySearch").value = lon;
            document.getElementById("mapView").src = new MapManager("cbNCoIPEkmRLNU7bmHaJcRAejpzrjRiD").getMapUrl(lat, lon, JSON.parse(document.getElementById('map-image').dataset.tags), 16);
        }
 
    }
}
