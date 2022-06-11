// File origin: VS1LAB A2 

/**
 * A class to help using the MapQuest map service.
 */
 // eslint-disable-next-line no-unused-vars
 class MapManager {
    #apiKey = 'y2BrdV0W0lRLeBlOVAz13NCGkvNSYzEC';

    /**
     * Create a new MapManager instance.
     * @param {string} apiKey Your MapQuest API Key
     */

    constructor(apiKey) {
        this.#apiKey = 'y2BrdV0W0lRLeBlOVAz13NCGkvNSYzEC';
    }

    /**
     * Generate a MapQuest image URL for the specified parameters.
     * @param {number} latitude The map center latitude
     * @param {number} longitude The map center longitude
     * @param {{latitude, longitude, name}[]} tags The map tags, defaults to just the current location
     * @param {number} zoom The map zoom, defaults to 11
     * @returns {string} URL of generated map
     */
    getMapUrl(latitude, longitude, tags = [], zoom = 11) {
        if (this.#apiKey === '') {
            console.log("No API key provided.");
            return "images/mapview.jpg";
        }

        let tagList = `You,${latitude},${longitude}`;

        const tagElement = document.getElementById("discoveryResults").getElementsByTagName("li");
        let tagStrings = [];
        if (tagElement.length > 0) {
            tagList += "|";
        }
        for (var i = 0; i < tagElement.length; ++i) {
            const listElementString = tagElement[i].innerHTML;
            const name =  listElementString.split("(")[0].trim();
            const lat = listElementString.split("(")[1].split(",")[0].trim();
            const lon = listElementString.split("(")[1].split(",")[1].split(")")[0];
            tagStrings.push(name + "," + lat + ","+ lon);
        }
        tagList += tagStrings.join("|");

        //bit.do/YeetYeet
        const mapQuestUrl = `https://www.mapquestapi.com/staticmap/v4/getmap?key=${this.#apiKey}&size=600,400&zoom=${zoom}&center=${latitude},${longitude}&pois=${tagList}`;
        console.log("Generated MapQuest URL:", mapQuestUrl);

        return mapQuestUrl;
    }
}