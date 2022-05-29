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
class InMemoryGeoTagStore{

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


    searchInRadius(lat, long, radius){
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

    searchString( searchString){
        let tags = [];
        for(let i = 0; i < this.geotags.length; i++){
            if(searchString==this.geotags[i].name){
                tags.push(this.geotags[i]);
            }else if(searchString==this.geotags[i].hashtag){
                tags.push(this.geotags[i]);
            }      
        }
        return tags;
    }
}

module.exports = InMemoryGeoTagStore
