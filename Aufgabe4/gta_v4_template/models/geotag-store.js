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

var idCounter=0;
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
        //id ändern das sie eindeutig hochzählt
        tag.id=idCounter;
        idCounter++;
        this.geotags.push(tag);
        idCounter++;
    }

    removeGeoTag(id) {
        if (id > -1) {
            var pos = undefined;
            for(var i = 0; i < this.geotags.length; i++)
            {
                if (this.geotags[i].id == id)
                {
                    pos = i;
                }
            }
            this.geotags.splice(pos, 1);
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
        let tags = [];
        for(let i = 0; i < this.geotags.length; i++){
            if(searchString.searchterm==this.geotags[i].name || searchString.searchterm==this.geotags[i].hashtag){
                tags.push(this.geotags[i]);
            }    
        }

        return tags;
    }

    getId(id){
        return this.geotags.find(element=>element.id==id);
    }

    overrideId(tag,id){
        var tagID = this.getId(id);
        tagID.name = tag.name;
        tagID.latitude = tag.latitude;
        tagID.longitude = tag.longitude;
        tagID.hashtag = tag.hashtag;
    }
}

module.exports = InMemoryGeoTagStore
