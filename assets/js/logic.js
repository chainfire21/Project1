$(document).foundation();
var map;

const queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=hou,tx&key=AIzaSyA5MpvY77M88RbRZ2JsaPYR5lEjsX_HyXg";

$.ajax({
    url: queryURL,
    method: "GET",
    async: true,
    dataType: "json",
}).then(function (response) {
    console.log(response);
    
    updatePosition(response.results[0].geometry.location.lat,response.results[0].geometry.location.lng);
});

//update the map location to new search location
function updatePosition(lat, long) {
    var location = new google.maps.LatLng(lat, long);
    map.setCenter(location);
    map.setZoom(8);
}
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });
}