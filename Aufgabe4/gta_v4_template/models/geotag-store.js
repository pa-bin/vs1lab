// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * A class for in-memory-storage of geotags
 * 
 * Use an array to store a multiset of geotags.
 * - The array must not be accessible from outside the store.
 * 
 * Provide a method 'addGeoTag' to add a geotag to the store.
 * 
 * Provide a method 'removeGeoTag' to delete geo-tags from the store by name.
 * 
 * Provide a method 'getNearbyGeoTags' that returns all geotags in the proximity of a location.
 * - The location is given as a parameter.
 * - The proximity is computed by means of a radius around the location.
 * 
 * Provide a method 'searchNearbyGeoTags' that returns all geotags in the proximity of a location that match a keyword.
 * - The proximity constrained is the same as for 'getNearbyGeoTags'.
 * - Keyword matching should include partial matches from name or hashtag fields. 
 */
 class InMemoryGeoTagStore {
    #geotags = [];

    // TODO: ... your code here ...
    constructor() {
        this.geotags = [];
    }

    getGeoTags() {
        return this.geotags;
    }

    addGeoTag(tag) {
        this.geotags.push(tag);
    }

    removeGeoTag(tag) {
        const index = this.geotags.indexOf(tag);
        if (index > -1) {
            this.geotags.splice(index, 1);
        }
    }


    getNearbyGeoTags(lat, long, radius){
        let tags = [];
        for(let i = 0; i < this.geotags.length; i++){
            let tag = this.geotags[i];
            let latDiff = lat - tag.latitude;
            let longDiff = long - tag.longitude;
    
            let distance = Math.sqrt(latDiff*latDiff + longDiff*longDiff);
            if(distance < radius)
                tags.push(tag);
        }
        return tags;
    }

    searchNearbyGeoTags(searchString){
        let nearTags=this.getNearbyGeoTags(searchString.latitude,searchString.longitude, 20);
        let tags = [];
        
            for(let i = 0; i < nearTags.length; i++){
                let nameLow= nearTags[i].name.toLowerCase();
                let hashtagLow= nearTags[i].hashtag.toLowerCase();
                if(nameLow.includes(searchString.searchterm)||hashtagLow.includes(searchString.searchterm)){
                    tags.push(nearTags[i]);
                }     
            }
            if(tags.length<1){
                tags=this.getNearbyGeoTags(searchString.latitude,searchString.longitude, 20);
            }
        
        return tags;
    }
}

module.exports = InMemoryGeoTagStore
