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
     * @param {number} zoom The map zoom, defaults to 10
     * @returns {string} URL of generated map
     */
    getMapUrl(latitude, longitude, tags = [], zoom = 10) {
        if (this.#apiKey === '') {
            console.log("No API key provided.");
            return "images/mapview.jpg";
        }
<<<<<<< HEAD
        
        let tagList = `${latitude},${longitude}\|marker-FF0000`;
        //tagList += tags.reduce((acc, tag) => `${acc}|${tag.name},${tag.location.latitude},${tag.location.longitude}`, "")
        if (tags !== undefined){
            for(let i = 0; i < tags.length; i++){
                tagList += "\|\|"  + tags[i].latitude + "," + tags[i].longitude;
            }
        }
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            tagList +="&type=dark"+"&defaultMarker=circle-white";
        }else{
            tagList +="&defaultMarker=circle";
        }
        
        const mapQuestUrl = `https://www.mapquestapi.com/staticmap/v5/map?locations=${tagList}&zoom=${zoom}&center=${latitude},${longitude}&size=1095,953&key=${this.#apiKey}`;
=======

        let tagList = `You,${latitude},${longitude}`;
        tagList += tags.reduce((acc, tag) => `${acc}|${tag.name},${tag.latitude},${tag.longitude}`, "");

        const mapQuestUrl = `https://www.mapquestapi.com/staticmap/v4/getmap?key=${this.#apiKey}&size=600,400&zoom=${zoom}&center=${latitude},${longitude}&pois=${tagList}`;
>>>>>>> a56b114ac2d126f0fe847ed2337b485d26515918
        console.log("Generated MapQuest URL:", mapQuestUrl);


        return mapQuestUrl;
    }
<<<<<<< HEAD
}
=======
}

>>>>>>> a56b114ac2d126f0fe847ed2337b485d26515918
