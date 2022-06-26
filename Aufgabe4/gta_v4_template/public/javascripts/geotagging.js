// File origin: VS1LAB A2

//const InMemoryGeoTagStore = require("../../models/geotag-store");

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
    updateLocation()
    console.log("test");
    fetch("/api/geotags/", {
        method: "GET",
        headers:{
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
    .then(data => console.log(data))
});


document.getElementById("tag-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    let currentName = document.getElementById("name").value;
    let currentHashtag = document.getElementById("hashtag").value;
    let currentLatitude = document.getElementById("latitude").value;
    let currentLongitude = document.getElementById("longitude").value;

    let values = {currentName, currentHashtag, currentLatitude, currentLongitude};
    let response = Test.addTagIntoList(values);
    document.getElementById("name").value = "";
    document.getElementById("hashtag").value = "";
});

var discoveryContainer = document.getElementById("discoveryResults");

function renderMapRIGHTAWAY(){
    var map = document.getElementById("mapView");
    var discoveryList = document.getElementById("discoveryResults");
    let tagStrings = [];
    var tagElement = discoveryList.getElementsByTagName("li");
    var zoom = 11;
    let tagList = `You,${document.getElementById("latitude").value},${document.getElementById("longitude").value}`;
    for (var i = 0; i < tagElement.length; ++i) {
        const listElementString = tagElement[i].innerHTML;
        const name =  listElementString.split("(")[0].trim();
        const lat = listElementString.split("(")[1].split(",")[0].trim();
        const lon = listElementString.split("(")[1].split(",")[1].split(")")[0];
        tagStrings.push(name + "," + lat + ","+ lon);  
    }

    if (discoveryList.childNodes.length > 0) {
        tagList += "|";
    }
    tagList += tagStrings.join("|");
    var apiKey = 'y2BrdV0W0lRLeBlOVAz13NCGkvNSYzEC';
    console.log(tagList);
    const mapQuestUrl = `https://www.mapquestapi.com/staticmap/v4/getmap?key=${apiKey}&size=600,400&zoom=${zoom}&center=${document.getElementById("latitude").value},${document.getElementById("longitude").value}&pois=${tagList}`;
    console.log("Generated MapQuest URL:", mapQuestUrl);
    map.src = mapQuestUrl;
}

class Test {    
static async addTagIntoList(body){
    var discoveryList = document.getElementById("discoveryResults");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(body.currentName+" ("+body.currentLatitude+", "+body.currentLongitude+") "+ body.currentHashtag))
    discoveryList.appendChild(li);
    let response  = await fetch("/api/geotags/",  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                name: body.currentName,
                latitude: body.currentLatitude,
                longitude: body.currentLongitude,
                hashtag: body.currentHashtag
            })
        }).then(res => {
            return res.json()
        })
        .then(data => console.log(data))
        renderMapRIGHTAWAY();
        let geotags = await response.json;
    }

}

document.getElementById("discoveryFilterForm").addEventListener("submit", async (event) => {
    event.preventDefault(); 
    var lat = document.getElementById("latitude").value;
    var long = document.getElementById("longitude").value;
    var nameSearch = document.getElementById("nameSearch").value;
    console.log(document.getElementById("nameSearch").value);
    fetch(`/api/geotags?searchterm=${nameSearch}&latitude=${lat}&longitude=${long}`,  {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
          },
    }).then(res => {
        return res.json();
    }).then(res => {
        console.log(res);
        var list = document.getElementById("discoveryResults");
        list.innerHTML = "";
        res.forEach(element=> {
            var li = document.createElement("li")
            li.innerHTML= element.name +" (" + element.latitude + "," + element.longitude + ") " + element.hashtag;            
            list.appendChild(li);
        })
        renderMapRIGHTAWAY();
    }) 
    

    //muss noch was rein (glaub ich)
});