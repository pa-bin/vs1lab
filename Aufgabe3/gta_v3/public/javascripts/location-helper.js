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
     * The 'findLocation' method requests the current location details through the geolocation API.
     * It is a static method that should be used to obtain an instance of LocationHelper.
     * Throws an exception if the geolocation API is not available.
     * @param {*} callback a function that will be called with a LocationHelper instance as parameter, that has the current location details
     */
    static findLocation(callback) {
        console.log("Testsdsdsd");
        const geoLocationApi = navigator.geolocation;

        if (!geoLocationApi) {
            throw new Error("The GeoLocation API is unavailable.");
        }

        // Call to the HTML5 geolocation API.
        // Takes a first callback function as argument that is called in case of success.
        // Second callback is optional for handling errors.
        // These callbacks are given as arrow function expressions.
        geoLocationApi.getCurrentPosition((location) => {
            // Create and initialize LocationHelper object.
            let helper = new LocationHelper();
            helper.#latitude = location.coords.latitude.toFixed(5);
            helper.#longitude = location.coords.longitude.toFixed(5);
            // Pass the locationHelper object to the callback.
            callback(helper);
        }, (error) => {
            alert(error.message)
        });
    }

}

let x = function writeCoordinates() {
    LocationHelper.findLocation(updateLocation);
}()

function updateLocation(helper) {
    const latitude = document.getElementById("latitude");
    const longitude = document.getElementById("longitude");
    const discovery_latitude = document.getElementById("current_latitude")
    const discovery_longitude = document.getElementById("current_longitude")

    const map = document.getElementById("mapView");

    const obj = new MapManager;
    map.src = obj.getMapUrl(helper.latitude, helper.longitude);

    latitude.value = helper.latitude;
    longitude.value = helper.longitude;

    discovery_latitude.value = helper.latitude;
    discovery_longitude.value = helper.longitude;

}
