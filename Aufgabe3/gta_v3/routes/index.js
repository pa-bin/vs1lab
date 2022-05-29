// File origin: VS1LAB A3

/**
 * This script defines the main router of the GeoTag server.
 * It's a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * Define module dependencies.
 */

const express = require('express');
const router = express.Router();

/**
 * The module "geotag" exports a class GeoTagStore. 
 * It represents geotags.
 * 
 * TODO: implement the module in the file "../models/geotag.js"
 */
// eslint-disable-next-line no-unused-vars
const GeoTag = require('../models/geotag');

/**
 * The module "geotag-store" exports a class GeoTagStore. 
 * It provides an in-memory store for geotag objects.
 * 
 * TODO: implement the module in the file "../models/geotag-store.js"
 */
// eslint-disable-next-line no-unused-vars
const GeoTagStore = require('../models/geotag-store');
var store = new GeoTagStore();
<<<<<<< HEAD
const Examples = require('../models/geotag-examples');
const InMemoryGeoTagStore = require('../models/geotag-store');
=======

const Examples = require('../models/geotag-examples');
const InMemoryGeoTagStore = require('../models/geotag-store');

>>>>>>> a56b114ac2d126f0fe847ed2337b485d26515918
/**
 * Route '/' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests cary no parameters
 *
 * As response, the ejs-template is rendered without geotag objects.
 */

// TODO: extend the following route example if necessary
router.get('/', (req, res) => {
  if(store.getGeoTags() == ''){
  Examples.tagList.forEach(function(Examples) {
    let tag=new GeoTag(Examples[0],Examples[1],Examples[2],Examples[3]);
    store.addGeoTag(tag);
    
  })
}
<<<<<<< HEAD
  //console.log(store);
=======
>>>>>>> a56b114ac2d126f0fe847ed2337b485d26515918
  res.render('index', { 
    taglist: store.getGeoTags(),
    tags: JSON.stringify(store.getGeoTags())
  })
});

/**
 * Route '/tagging' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests cary the fields of the tagging form in the body.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * Based on the form data, a new geotag is created and stored.
 *
 * As response, the ejs-template is rendered with geotag objects.
 * All result objects are located in the proximity of the new geotag.
 * To this end, "GeoTagStore" provides a method to search geotags 
 * by radius around a given location.
 */

// TODO: ... your code here ...
router.post('/tagging', (req, res) => {
  let body =req.body;
  
  let tag = new GeoTag(body.name, body.latitude, body.longitude, body.hashtag);
  
  store.addGeoTag(tag);
  console.log(store);
  
  
  res.render('tagging', { 
    taglist: 
    store.getGeoTags(),
    tags: JSON.stringify(store.getGeoTags())
<<<<<<< HEAD
    //store.searchInRadius(body.latitude, body.longitude, 1000000),
=======
>>>>>>> a56b114ac2d126f0fe847ed2337b485d26515918
  })
});
/**
 * Route '/discovery' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests cary the fields of the discovery form in the body.
 * This includes coordinates and an optional search term.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * As response, the ejs-template is rendered with geotag objects.
 * All result objects are located in the proximity of the given coordinates.
 * If a search term is given, the results are further filtered to contain 
 * the term as a part of their names or hashtags. 
 * To this end, "GeoTagStore" provides methods to search geotags 
 * by radius and keyword.
 */

// TODO: ... your code here ...
router.post('/discovery', (req, res) => {
  let body =req.body;
<<<<<<< HEAD
=======

  console.log(body.latitudeSearch);
  if(body.searchSearch.length>0){
    res.render('discovery', { 
      taglist: store.searchString(body.searchSearch),
      tags: JSON.stringify(store.searchString(body.searchSearch))
    })
  }else{
    res.render('discovery', { 
      taglist: store.searchInRadius(body.latitudeSearch, body.longitudeSearch, 0.01),
      tags: JSON.stringify(store.searchInRadius(body.latitudeSearch, body.longitudeSearch, 0.01))
    })
  }
});

router.get('/error', (req, res) => {
  res.render('error', { taglist: [] })
});
>>>>>>> a56b114ac2d126f0fe847ed2337b485d26515918

  console.log(body.current_latitude);
  if(body.nameSearch.length>0){
    res.render('discovery', { 
      taglist: store.searchNearbyGeoTags(body.nameSearch),
      tags: JSON.stringify(store.searchNearbyGeoTags(body.nameSearch))
    })
  }else{
    res.render('discovery', { 
      taglist: store.getNearbyGeoTags(body.current_latitude, body.current_longitude, 0.01),
      tags: JSON.stringify(store.getNearbyGeoTags(body.current_latitude, body.current_longitude, 0.01))
    })
  }
});

router.get('/error', (req, res) => {
  res.render('error', { taglist: [] })
});
module.exports = router;
