$(document).foundation();
var map;
var favMap1;
var favMap2;
var favMap3;
var favMap4;

// ------------------------------------------------TYPEAHEAD START--------------------------------------------------//
var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
    'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
    'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];
var cityStCodes = [];
for (var i = 0; i < cityStates.length; i++) {
    var tempStr;
    tempStr = cityStates[i].city;
    switch (cityStates[i].state) {
        case "Alabama":
            tempStr = tempStr + ", AL";
            break;
        case "Alaska":
            tempStr = tempStr + ", AK";
            break;
        case "Arizona":
            tempStr = tempStr + ", AZ";
            break;
        case "Arkansas":
            tempStr = tempStr + ", AR";
            break;
        case "California":
            tempStr = tempStr + ", CA";
            break;
        case "Colorado":
            tempStr = tempStr + ", CO";
            break;
        case "Connecticut":
            tempStr = tempStr + ", CT";
            break;
        case "Delaware":
            tempStr = tempStr + ", DE";
            break;
        case "Florida":
            tempStr = tempStr + ", FL";
            break;
        case "Georgia":
            tempStr = tempStr + ", GA";
            break;
        case "Hawaii":
            tempStr = tempStr + ", HI";
            break;
        case "Idaho":
            tempStr = tempStr + ", ID";
            break;
        case "Illinois":
            tempStr = tempStr + ", IL";
            break;
        case "Indiana":
            tempStr = tempStr + ", IN";
            break;
        case "Iowa":
            tempStr = tempStr + ", IA";
            break;
        case "Kansas":
            tempStr = tempStr + ", KS";
            break;
        case "Kentucky":
            tempStr = tempStr + ", KY";
            break;
        case "Louisiana":
            tempStr = tempStr + ", LA";
            break;
        case "Maine":
            tempStr = tempStr + ", ME";
            break;
        case "Maryland":
            tempStr = tempStr + ", MD";
            break;
        case "Massachusetts":
            tempStr = tempStr + ", MA";
            break;
        case "Michigan":
            tempStr = tempStr + ", MI";
            break;
        case "Minnesota":
            tempStr = tempStr + ", MN";
            break;
        case "Mississippi":
            tempStr = tempStr + ", MS";
            break;
        case "Missouri":
            tempStr = tempStr + ", MO";
            break;
        case "Montana":
            tempStr = tempStr + ", MT";
            break;
        case "Nebraska":
            tempStr = tempStr + ", NE";
            break;
        case "Nevada":
            tempStr = tempStr + ", NV";
            break;
        case "New Hampshire":
            tempStr = tempStr + ", NH";
            break;
        case "New Jersey":
            tempStr = tempStr + ", NJ";
            break;
        case "New Mexico":
            tempStr = tempStr + ", NM";
            break;
        case "New York":
            tempStr = tempStr + ", NY";
            break;
        case "North Carolina":
            tempStr = tempStr + ", NC";
            break;
        case "North Dakota":
            tempStr = tempStr + ", ND";
            break;
        case "Ohio":
            tempStr = tempStr + ", OH";
            break;
        case "Oklahoma":
            tempStr = tempStr + ", OK";
            break;
        case "Oregon":
            tempStr = tempStr + ", OR";
            break;
        case "Pennsylvania":
            tempStr = tempStr + ", PA";
            break;
        case "Rhode Island":
            tempStr = tempStr + ", RI";
            break;
        case "South Carolina":
            tempStr = tempStr + ", SC";
            break;
        case "South Dakota":
            tempStr = tempStr + ", SD";
            break;
        case "Tennessee":
            tempStr = tempStr + ", TN";
            break;
        case "Texas":
            tempStr = tempStr + ", TX";
            break;
        case "Utah":
            tempStr = tempStr + ", UT";
            break;
        case "Vermont":
            tempStr = tempStr + ", VT";
            break;
        case "Virginia":
            tempStr = tempStr + ", VA";
            break;
        case "Washington":
            tempStr = tempStr + ", WA";
            break;
        case "West Virginia":
            tempStr = tempStr + ", WV";
            break;
        case "Wisconsin":
            tempStr = tempStr + ", WI";
            break;
        case "Wyoming":
            tempStr = tempStr + ", WY";
    }
    cityStCodes.push(tempStr);
}
var substringMatcher = function (strs) {
    return function findMatches(q, cb) {
        var matches, substringRegex;
        // to get the matches
        matches = [];

        // regex used to determine if a string contains the substring
        substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings for q and add it
        $.each(strs, function (i, str) {
            if (substrRegex.test(str)) {
                matches.push(str);
            }
        });
        cb(matches);
    };
};

$('#city-state .typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
},
    {
        name: 'cityStCodes',
        source: substringMatcher(cityStCodes)
    });
// ------------------------------------------------TYPEAHEAD END--------------------------------------------------//

$("form").submit(function (e) {
    e.preventDefault();
    const locArr = $("#input-location").val().split(",");
    console.log(locArr);
    const queryURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${locArr[0]},${locArr[1].trim()}tx&key=AIzaSyA5MpvY77M88RbRZ2JsaPYR5lEjsX_HyXg`;
    $.ajax({
        url: queryURL,
        method: "GET",
        async: true,
        dataType: "json",
    }).then(function (response) {
        console.log(response);
        if (response.status === "OK") {
            updatePosition(map, response.results[0].geometry.location.lat, response.results[0].geometry.location.lng);
        }
        else {
            console.log("no results found");
        }
    });
});

//update the map location to new search location
function updatePosition(mapType, lat, long) {
    var location = new google.maps.LatLng(lat, long);
    mapType.setCenter(location);
    mapType.setZoom(10);
}
//create the main and favorite maps
function initMaps() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 29.7604267, lng: -95.3698028 },
        zoom: 10
    });
    favMap1 = new google.maps.Map(document.getElementById("favMap1"), {
        center: { lat: 40.7127753, lng: -74.0059728 },
        zoom: 10
    });
    favMap2 = new google.maps.Map(document.getElementById("favMap2"), {
        center: { lat: 39.7392358, lng: -104.990251 },
        zoom: 8
    });
    favMap3 = new google.maps.Map(document.getElementById("favMap3"), {
        center: { lat: 34.0522342, lng: -118.2436849 },
        zoom: 8
    });
    favMap3 = new google.maps.Map(document.getElementById("favMap4"), {
        center: { lat: 41.8781136, lng: -87.6297982 },
        zoom: 8
    });


}

// incorporating AirVisual's endpoints
// $("#location-submit").on("click", function (e) {

//     function air(city, state) {
//         e.preventDefault();
//         for (i = 0; i < statesAbbr.length; i++) {
//             if (state === statesAbbr[i][1]) {
//                 state = statesAbbr[i][0];

//                 var queryURL = "api.airvisual.com/v2/nearest_city?lat={{LATITUDE}}&lon={{LONGITUDE}}&key={{YOUR_API_KEY}}";
//                 console.log(queryURL);

//                 // Performing our AJAX GET request
//                 $.ajax({
//                     url: queryURL,
//                     method: "GET",
//                 }).then(function (response) {
//                     console.log(response);
//                     var pollution = response.data.current.pollution.aqius;
//                     var coordinate = response.data.location.coordinates;
//                     console.log(pollution);
//                     console.log(coordinate);
//                 })
//             };
//         };
//     };
//     const locArr = $("#input-location").val().split(",");
//     air(locArr[0],locArr[1].trim());
// });
$("#location-submit").on("click", function (e) {

    function air(lat, long) {
        e.preventDefault();

        var queryURL = "api.airvisual.com/v2/nearest_city?lat={{LATITUDE}}&lon={{LONGITUDE}}&key={{YOUR_API_KEY}}";
        console.log(queryURL);

        // Performing our AJAX GET request
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            console.log(response);
            var pollution = response.data.current.pollution.aqius;
            var coordinate = response.data.location.coordinates;
            console.log(pollution);
            console.log(coordinate);
        })
    };
    const locArr = $("#input-location").val().split(",");
    air(locArr[0], locArr[1].trim());
});