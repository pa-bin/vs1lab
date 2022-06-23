// File origin: VS1LAB A3, A4

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
 */
// eslint-disable-next-line no-unused-vars
const GeoTag = require('../models/geotag');

/**
 * The module "geotag-store" exports a class GeoTagStore. 
 * It provides an in-memory store for geotag objects.
 */
// eslint-disable-next-line no-unused-vars
const GeoTagStore = require('../models/geotag-store');
var store = new GeoTagStore();
const Examples = require('../models/geotag-examples');
const InMemoryGeoTagStore = require('../models/geotag-store');

// App routes (A3)

/**
 * Route '/' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests cary no parameters
 *
 * As response, the ejs-template is rendered without geotag objects.
 */

 router.get('/', (req, res) => {
  if(store.getGeoTags() == ''){
  Examples.tagList.forEach(function(Examples) {
    let tag=new GeoTag(Examples[0],Examples[1],Examples[2],Examples[3]);
    store.addGeoTag(tag);
    
  })
}
  res.render('index', { 
    taglist: store.getGeoTags(),
    tags: JSON.stringify(store.getGeoTags())
  })
});

router.post('/tagging', (req, res) => {
  let body =req.body;
  
  let tag = new GeoTag(body.name, body.latitude, body.longitude, body.hashtag);
  
  store.addGeoTag(tag);
  console.log(store);
  
  
  res.render('index', { 
    taglist: 
    store.getGeoTags(),
    tags: JSON.stringify(store.getGeoTags())
  })
});

router.post('/discovery', (req, res) => {
  let body =req.body;

  console.log(body.current_latitude);
  if(body.nameSearch.length>0){
    res.render('index', { 
      taglist: store.searchNearbyGeoTags(body.nameSearch),
      tags: JSON.stringify(store.searchNearbyGeoTags(body.nameSearch))
    })
  }else{
    res.render('index', { 
      taglist: store.getNearbyGeoTags(body.current_latitude, body.current_longitude, 1),
      tags: JSON.stringify(store.getNearbyGeoTags(body.current_latitude, body.current_longitude, 1))
    })
  }
});

router.get('/error', (req, res) => {
  res.render('error', { taglist: [] })
});
module.exports = router;

// API routes (A4)

/**
 * Route '/api/geotags' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests contain the fields of the Discovery form as query.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * As a response, an array with Geo Tag objects is rendered as JSON.
 * If 'searchterm' is present, it will be filtered by search term.
 * If 'latitude' and 'longitude' are available, it will be further filtered based on radius.
 */

// TODO: ... your code here ...
router.get('/api/geotags', function (req, res) {
  let result;
  let url = new URL(req.url, 'http://${req.headers.host}');
  if (url.searchParams.has('searchterm') && url.searchParams.has('latitude') && url.searchParams.has('longitude')) {
    let search = {
      searchterm: url.searchParams.get('searchterm'),
      latitude: url.searchParams.get('latitude'),
      longitude: url.searchParams.get('longitude')
    }
    search.searchterm=search.searchterm.replace(/1/g,"#")//ersetzung für hashtag
    result = store.searchNearbyGeoTags(search);
    
  }else{
    result = store.getGeoTags();
    
  }
  
  
  console.log(result);

  res.json(result);
});
/**
 * Route '/api/geotags' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests contain a GeoTag as JSON in the body.
 * (http://expressjs.com/de/4x/api.html#req.query)
 *
 * The URL of the new resource is returned in the header as a response.
 * The new resource is rendered as JSON in the response.
 */

// TODO: ... your code here ...
router.post('/api/geotags', function (req, res) {
  let body = req.body;
  console.log(req.body);
  let tag = new GeoTag(body.name, body.latitude, body.longitude, body.hashtag);
  store.addGeoTag(tag);
  console.log(tag);
  let response = store.getNearbyGeoTags(body.latitude, body.longitude, 1);
  console.log(response);
  res.json(response);
});
/**
 * Route '/api/geotags/:id' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests contain the ID of a tag in the path.
 * (http://expressjs.com/de/4x/api.html#req.params)
 *
 * The requested tag is rendered as JSON in the response.
 */

// TODO: ... your code here ...
router.get('/api/geotags/:id', function (req, res) {
  let tag = store.getId(req.params.id);
  console.log(tag)
  if (tag !== null) {
    res.json(JSON.stringify(tag));
  }
  else {
    res.status(404).send();
  }
});

/**
 * Route '/api/geotags/:id' for HTTP 'PUT' requests.
 * (http://expressjs.com/de/4x/api.html#app.put.method)
 *
 * Requests contain the ID of a tag in the path.
 * (http://expressjs.com/de/4x/api.html#req.params)
 * 
 * Requests contain a GeoTag as JSON in the body.
 * (http://expressjs.com/de/4x/api.html#req.query)
 *
 * Changes the tag with the corresponding ID to the sent value.
 * The updated resource is rendered as JSON in the response. 
 */

// TODO: ... your code here ...
router.put('/api/geotags/:id', function (req, res) {
  let body = req.body;
  let tag = new GeoTag(body.name, body.latitude, body.longitude, body.hashtag);
  console.log(store.getId(req.params.id));
  store.overrideId(tag, req.params.id);
  console.log(store.getId(req.params.id));

  res.send(JSON.stringify());
});

/**
 * Route '/api/geotags/:id' for HTTP 'DELETE' requests.
 * (http://expressjs.com/de/4x/api.html#app.delete.method)
 *
 * Requests contain the ID of a tag in the path.
 * (http://expressjs.com/de/4x/api.html#req.params)
 *
 * Deletes the tag with the corresponding ID.
 * The deleted resource is rendered as JSON in the response.
 */

// TODO: ... your code here ...
router.delete('/api/geotags/:id', function (req, res) {
  let remove = req.params.id;
  console.log(store.getId(remove));
  res.json(store.getId(remove));
  if (remove !== undefined) {
    store.removeGeoTag(remove);
  }
});


module.exports = router;
