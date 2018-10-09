//create the main and favorite maps
function initMaps() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 29.7604267, lng: -95.3698028 },
        zoom: 9,
        mapTypeId: "terrain"
    });
    showAir(map,29.7604267,-95.3698028);
    favMap1 = new google.maps.Map(document.getElementById("favMap1"), {
        center: { lat: 40.7127753, lng: -74.0059728 },
        zoom: 8,
        mapTypeId: "terrain"
    });
    showAir(favMap1,40.7127753,-74.0059728);
    favMap2 = new google.maps.Map(document.getElementById("favMap2"), {
        center: { lat: 39.7392358, lng: -104.990251 },
        zoom: 8,
        mapTypeId: "terrain"
    });
    showAir(favMap2,39.7392358,-104.990251);
    favMap3 = new google.maps.Map(document.getElementById("favMap3"), {
        center: { lat: 34.0522342, lng: -118.2436849 },
        zoom: 8,
        mapTypeId: "terrain"
    });
    showAir(favMap3,34.0522342,-118.2436849);
    favMap4 = new google.maps.Map(document.getElementById("favMap4"), {
        center: { lat: 41.8781136, lng: -87.6297982 },
        zoom: 8,
        mapTypeId: "terrain"
    });
    showAir(favMap4,41.8781136,-87.6297982);
}