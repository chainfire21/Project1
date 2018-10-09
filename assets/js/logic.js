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
            break;
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
            showAir(response.results[0].geometry.location.lat, response.results[0].geometry.location.lng);
        }
        else {
            $('#error-modal').foundation('open');
            console.log("no results found");
        }
    });
});

$("#close-modal").on("click", function () { $("#error-modal").foundation("close"); });

//update the map location to new search location
function updatePosition(mapType, lat, long) {
    var location = new google.maps.LatLng(lat, long);
    air(lat, long);
    mapType.setCenter(location);
    mapType.setZoom(9);
};

function air(lat, long) {
    latTruncate = lat.toFixed(2);
    longTruncate = long.toFixed(2);

    var queryURL = "http://api.airvisual.com/v2/nearest_station?lat=" + latTruncate + "&lon=" + longTruncate + "&key=a94duGPQHHCF4FGeQ";
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



// {
//     "status": "success",
//         "data": {
//         "name": "St. John's",
//             "local_name": "St. John's",
//                 "city": "St. John's",
//                     "state": "Newfoundland",
//                         "country": "Canada",
//                             "location": {
//             "type": "Point",
//                 "coordinates": [
//                     -52.8167,
//                     47.6528
//                 ]
//         },
//         "forecasts": [
//             {
//                 "ts": "2017-09-04T03:00:00.000Z",
//                 "aqius": 21,
//                 "aqicn": 7,
//                 "tp": 10,
//                 "tp_min": 10,
//                 "pr": 1029,
//                 "hu": 100,
//                 "ws": 2,
//                 "wd": 204,
//                 "ic": "01n"
//             },
//             {
//                 "ts": "2017-09-04T06:00:00.000Z",
//                 "aqius": 21,
//                 "aqicn": 7,
//                 "tp": 10,
//                 "tp_min": 9,
//                 "pr": 1028,
//                 "hu": 100,
//                 "ws": 2,
//                 "wd": 213,
//                 "ic": "02n"
//             },
//             {
//                 "ts": "2017-09-04T09:00:00.000Z",
//                 "aqius": 21,
//                 "aqicn": 7,
//                 "tp": 9,
//                 "tp_min": 9,
//                 "pr": 1027,
//                 "hu": 100,
//                 "ws": 2,
//                 "wd": 226,
//                 "ic": "02d"
//             },
//             {
//                 "ts": "2017-09-04T12:00:00.000Z",
//                 "aqius": 21,
//                 "aqicn": 7,
//                 "tp": 14,
//                 "tp_min": 14,
//                 "pr": 1026,
//                 "hu": 95,
//                 "ws": 3,
//                 "wd": 200,
//                 "ic": "01d"
//             },
//             {
//                 "ts": "2017-09-04T15:00:00.000Z",
//                 "aqius": 21,
//                 "aqicn": 7,
//                 "tp": 15,
//                 "tp_min": 15,
//                 "pr": 1025,
//                 "hu": 84,
//                 "ws": 7,
//                 "wd": 179,
//                 "ic": "02d"
//             },
//             {
//                 "ts": "2017-09-04T18:00:00.000Z",
//                 "aqius": 21,
//                 "aqicn": 7,
//                 "tp": 15,
//                 "tp_min": 15,
//                 "pr": 1022,
//                 "hu": 88,
//                 "ws": 10,
//                 "wd": 182,
//                 "ic": "04d"
//             },
//             {
//                 "ts": "2017-09-04T21:00:00.000Z",
//                 "aqius": 21,
//                 "aqicn": 7,
//                 "tp": 14,
//                 "tp_min": 14,
//                 "pr": 1019,
//                 "hu": 92,
//                 "ws": 10,
//                 "wd": 175,
//                 "ic": "10d"
//             },
//             {
//                 "ts": "2017-09-05T00:00:00.000Z",
//                 "aqius": 21,
//                 "aqicn": 7,
//                 "tp": 14,
//                 "tp_min": 14,
//                 "pr": 1016,
//                 "hu": 97,
//                 "ws": 12,
//                 "wd": 171,
//                 "ic": "10n"
//             },
//             {
//                 "ts": "2017-09-05T03:00:00.000Z",
//                 "aqius": 41,
//                 "aqicn": 14,
//                 "tp": 16,
//                 "tp_min": 16,
//                 "pr": 1014,
//                 "hu": 88,
//                 "ws": 8,
//                 "wd": 220,
//                 "ic": "10n"
//             },
//             {
//                 "ts": "2017-09-05T06:00:00.000Z",
//                 "aqius": 68,
//                 "aqicn": 29,
//                 "tp": 15,
//                 "tp_min": 15,
//                 "pr": 1015,
//                 "hu": 92,
//                 "ws": 7,
//                 "wd": 225,
//                 "ic": "10n"
//             },
//             {
//                 "ts": "2017-09-05T09:00:00.000Z",
//                 "aqius": 21,
//                 "aqicn": 7,
//                 "tp": 15,
//                 "tp_min": 15,
//                 "pr": 1016,
//                 "hu": 91,
//                 "ws": 6,
//                 "wd": 234,
//                 "ic": "10d"
//             },
//             {
//                 "ts": "2017-09-05T12:00:00.000Z",
//                 "aqius": 21,
//                 "aqicn": 7,
//                 "tp": 16,
//                 "tp_min": 16,
//                 "pr": 1018,
//                 "hu": 85,
//                 "ws": 7,
//                 "wd": 251,
//                 "ic": "10d"
//             },
//             {
//                 "ts": "2017-09-05T15:00:00.000Z",
//                 "aqius": 29,
//                 "aqicn": 10,
//                 "tp": 18,
//                 "tp_min": 18,
//                 "pr": 1019,
//                 "hu": 76,
//                 "ws": 7,
//                 "wd": 252,
//                 "ic": "01d"
//             },
//             {
//                 "ts": "2017-09-05T18:00:00.000Z",
//                 "aqius": 41,
//                 "aqicn": 14,
//                 "tp": 20,
//                 "tp_min": 20,
//                 "pr": 1020,
//                 "hu": 69,
//                 "ws": 7,
//                 "wd": 243,
//                 "ic": "01d"
//             },
//             {
//                 "ts": "2017-09-05T21:00:00.000Z",
//                 "aqius": 68,
//                 "aqicn": 29,
//                 "tp": 18,
//                 "tp_min": 18,
//                 "pr": 1021,
//                 "hu": 71,
//                 "ws": 6,
//                 "wd": 234,
//                 "ic": "01d"
//             },
//             {
//                 "ts": "2017-09-06T00:00:00.000Z",
//                 "aqius": 68,
//                 "aqicn": 29,
//                 "tp": 15,
//                 "tp_min": 15,
//                 "pr": 1023,
//                 "hu": 86,
//                 "ws": 7,
//                 "wd": 225,
//                 "ic": "01n"
//             },
//             {
//                 "ts": "2017-09-06T03:00:00.000Z",
//                 "aqius": 68,
//                 "aqicn": 29,
//                 "tp": 14,
//                 "tp_min": 14,
//                 "pr": 1023,
//                 "hu": 93,
//                 "ws": 7,
//                 "wd": 227,
//                 "ic": "01n"
//             },
//             {
//                 "ts": "2017-09-06T06:00:00.000Z",
//                 "aqius": 88,
//                 "aqicn": 43,
//                 "tp": 15,
//                 "tp_min": 15,
//                 "pr": 1024,
//                 "hu": 91,
//                 "ws": 7,
//                 "wd": 228,
//                 "ic": "10n"
//             },
//             {
//                 "ts": "2017-09-06T09:00:00.000Z",
//                 "aqius": 88,
//                 "aqicn": 43,
//                 "tp": 16,
//                 "tp_min": 16,
//                 "pr": 1025,
//                 "hu": 86,
//                 "ws": 7,
//                 "wd": 232,
//                 "ic": "10d"
//             },
//             {
//                 "ts": "2017-09-06T12:00:00.000Z",
//                 "aqius": 88,
//                 "aqicn": 43,
//                 "tp": 18,
//                 "tp_min": 18,
//                 "pr": 1026,
//                 "hu": 79,
//                 "ws": 7,
//                 "wd": 232,
//                 "ic": "10d"
//             },
//             {
//                 "ts": "2017-09-06T15:00:00.000Z",
//                 "aqius": 88,
//                 "aqicn": 43,
//                 "tp": 20,
//                 "tp_min": 20,
//                 "pr": 1027,
//                 "hu": 71,
//                 "ws": 7,
//                 "wd": 237,
//                 "ic": "04d"
//             },
//             {
//                 "ts": "2017-09-06T18:00:00.000Z",
//                 "aqius": 88,
//                 "aqicn": 43,
//                 "tp": 20,
//                 "tp_min": 20,
//                 "pr": 1027,
//                 "hu": 69,
//                 "ws": 7,
//                 "wd": 236,
//                 "ic": "04d"
//             },
//             {
//                 "ts": "2017-09-06T21:00:00.000Z",
//                 "aqius": 88,
//                 "aqicn": 43,
//                 "tp": 19,
//                 "tp_min": 19,
//                 "pr": 1028,
//                 "hu": 72,
//                 "ws": 7,
//                 "wd": 238,
//                 "ic": "10d"
//             },
//             {
//                 "ts": "2017-09-07T00:00:00.000Z",
//                 "aqius": 88,
//                 "aqicn": 43,
//                 "tp": 18,
//                 "tp_min": 18,
//                 "pr": 1029,
//                 "hu": 76,
//                 "ws": 7,
//                 "wd": 227,
//                 "ic": "10n"
//             }
//         ],
//             "current": {
//             "weather": {
//                 "ts": "2017-09-04T02:00:00.000Z",
//                     "tp": 12,
//                         "pr": 1023,
//                             "hu": 81,
//                                 "ws": 5,
//                                     "wd": 250,
//                                         "ic": "03n"
//             },
//             "pollution": {
//                 "ts": "2017-09-04T01:00:00.000Z",
//                     "aqius": 11,
//                         "mainus": "o3",
//                             "aqicn": 9,
//                                 "maincn": "o3",
//                                     "o3": {
//                     "conc": 14,
//                         "aqius": 11,
//                             "aqicn": 9
//                 }
//             }
//         },
//         "history": {
//             "weather": [
//                 {
//                     "ts": "2017-09-04T02:00:00.000Z",
//                     "tp": 12,
//                     "pr": 1023,
//                     "hu": 81,
//                     "ws": 5,
//                     "wd": 250,
//                     "ic": "03n"
//                 },
//                 {
//                     "ts": "2017-09-04T01:00:00.000Z",
//                     "tp": 11,
//                     "pr": 1023,
//                     "hu": 81,
//                     "ws": 3,
//                     "wd": 240,
//                     "ic": "02n"
//                 },
//                 {
//                     "ts": "2017-09-04T00:00:00.000Z",
//                     "tp": 11,
//                     "pr": 1023,
//                     "hu": 81,
//                     "ws": 3,
//                     "wd": 240,
//                     "ic": "02n"
//                 },
//                 {
//                     "ts": "2017-09-03T23:00:00.000Z",
//                     "tp": 12,
//                     "pr": 1023,
//                     "hu": 76,
//                     "ws": 3,
//                     "wd": 160,
//                     "ic": "02d"
//                 },
//                 {
//                     "ts": "2017-09-03T22:00:00.000Z",
//                     "tp": 17,
//                     "pr": 1023,
//                     "hu": 48,
//                     "ws": 1,
//                     "wd": 250,
//                     "ic": "02d"
//                 },
//                 {
//                     "ts": "2017-09-03T21:00:00.000Z",
//                     "tp": 17,
//                     "pr": 1023,
//                     "hu": 48,
//                     "ws": 1,
//                     "wd": 250,
//                     "ic": "02d"
//                 },
//                 {
//                     "ts": "2017-09-03T20:00:00.000Z",
//                     "tp": 17,
//                     "pr": 1023,
//                     "hu": 48,
//                     "ws": 2,
//                     "wd": 280,
//                     "ic": "02d"
//                 },
//                 {
//                     "ts": "2017-09-03T19:00:00.000Z",
//                     "tp": 18,
//                     "pr": 1022,
//                     "hu": 45,
//                     "ws": 3,
//                     "wd": 300,
//                     "ic": "02d"
//                 },
//                 {
//                     "ts": "2017-09-03T18:00:00.000Z",
//                     "tp": 17,
//                     "pr": 1022,
//                     "hu": 45,
//                     "ws": 3,
//                     "wd": 330,
//                     "ic": "02d"
//                 },
//                 {
//                     "ts": "2017-09-03T17:00:00.000Z",
//                     "tp": 15,
//                     "pr": 1022,
//                     "hu": 54,
//                     "ws": 4,
//                     "wd": 330,
//                     "ic": "02d"
//                 },
//                 {
//                     "ts": "2017-09-03T16:00:00.000Z",
//                     "tp": 14,
//                     "pr": 1022,
//                     "hu": 58,
//                     "ws": 6,
//                     "wd": 360,
//                     "ic": "02d"
//                 },
//                 {
//                     "ts": "2017-09-03T15:00:00.000Z",
//                     "tp": 13,
//                     "pr": 1022,
//                     "hu": 66,
//                     "ws": 6,
//                     "wd": 300,
//                     "ic": "02d"
//                 },
//                 {
//                     "ts": "2017-09-03T14:00:00.000Z",
//                     "tp": 12,
//                     "pr": 1021,
//                     "hu": 76,
//                     "ws": 8,
//                     "wd": 310,
//                     "ic": "03d"
//                 },
//                 {
//                     "ts": "2017-09-03T13:00:00.000Z",
//                     "tp": 11,
//                     "pr": 1021,
//                     "hu": 76,
//                     "ws": 7,
//                     "wd": 330,
//                     "ic": "04d"
//                 },
//                 {
//                     "ts": "2017-09-03T12:00:00.000Z",
//                     "tp": 10,
//                     "pr": 1020,
//                     "hu": 81,
//                     "ws": 8,
//                     "wd": 320,
//                     "ic": "04d"
//                 },
//                 {
//                     "ts": "2017-09-03T11:00:00.000Z",
//                     "tp": 10,
//                     "pr": 1019,
//                     "hu": 81,
//                     "ws": 5,
//                     "wd": 350,
//                     "ic": "04d"
//                 },
//                 {
//                     "ts": "2017-09-03T10:00:00.000Z",
//                     "tp": 10,
//                     "pr": 1018,
//                     "hu": 81,
//                     "ws": 5,
//                     "wd": 350,
//                     "ic": "04d"
//                 },
//                 {
//                     "ts": "2017-09-03T09:00:00.000Z",
//                     "tp": 10,
//                     "pr": 1018,
//                     "hu": 81,
//                     "ws": 5,
//                     "wd": 350,
//                     "ic": "04d"
//                 },
//                 {
//                     "ts": "2017-09-03T08:00:00.000Z",
//                     "tp": 10,
//                     "pr": 1016,
//                     "hu": 87,
//                     "ws": 5,
//                     "wd": 330,
//                     "ic": "09n"
//                 },
//                 {
//                     "ts": "2017-09-03T07:00:00.000Z",
//                     "tp": 10,
//                     "pr": 1014,
//                     "hu": 87,
//                     "ws": 8,
//                     "wd": 340,
//                     "ic": "04n"
//                 },
//                 {
//                     "ts": "2017-09-03T05:00:00.000Z",
//                     "tp": 10,
//                     "pr": 1013,
//                     "hu": 87,
//                     "ws": 8,
//                     "wd": 330,
//                     "ic": "04n"
//                 },
//                 {
//                     "ts": "2017-09-03T04:00:00.000Z",
//                     "tp": 9,
//                     "pr": 1012,
//                     "hu": 93,
//                     "ws": 7,
//                     "wd": 340,
//                     "ic": "09n"
//                 },
//                 {
//                     "ts": "2017-09-03T03:00:00.000Z",
//                     "tp": 10,
//                     "pr": 1010,
//                     "hu": 87,
//                     "ws": 9,
//                     "wd": 330,
//                     "ic": "09n"
//                 },
//                 {
//                     "ts": "2017-09-03T02:00:00.000Z",
//                     "tp": 10,
//                     "pr": 1010,
//                     "hu": 87,
//                     "ws": 9,
//                     "wd": 330,
//                     "ic": "09n"
//                 },
//                 {
//                     "ts": "2017-09-03T01:00:00.000Z",
//                     "tp": 11,
//                     "pr": 1008,
//                     "hu": 87,
//                     "ws": 8,
//                     "wd": 320,
//                     "ic": "04n"
//                 },
//                 {
//                     "ts": "2017-09-03T00:00:00.000Z",
//                     "tp": 12,
//                     "pr": 1007,
//                     "hu": 87,
//                     "ws": 9,
//                     "wd": 320,
//                     "ic": "09n"
//                 },
//                 {
//                     "ts": "2017-09-02T23:00:00.000Z",
//                     "tp": 13,
//                     "pr": 1006,
//                     "hu": 93,
//                     "ws": 4,
//                     "wd": 270,
//                     "ic": "09n"
//                 },
//                 {
//                     "ts": "2017-09-02T22:00:00.000Z",
//                     "tp": 13,
//                     "pr": 1005,
//                     "hu": 93,
//                     "ws": 8,
//                     "wd": 260,
//                     "ic": "09d"
//                 },
//                 {
//                     "ts": "2017-09-02T21:00:00.000Z",
//                     "tp": 13,
//                     "pr": 1005,
//                     "hu": 87,
//                     "ws": 8,
//                     "wd": 250,
//                     "ic": "09d"
//                 },
//                 {
//                     "ts": "2017-09-02T20:00:00.000Z",
//                     "tp": 13,
//                     "pr": 1005,
//                     "hu": 82,
//                     "ws": 7,
//                     "wd": 250,
//                     "ic": "09d"
//                 },
//                 {
//                     "ts": "2017-09-02T19:00:00.000Z",
//                     "tp": 17,
//                     "pr": 1004,
//                     "hu": 51,
//                     "ws": 10,
//                     "wd": 260,
//                     "ic": "04d"
//                 },
//                 {
//                     "ts": "2017-09-02T18:00:00.000Z",
//                     "tp": 17,
//                     "pr": 1004,
//                     "hu": 51,
//                     "ws": 10,
//                     "wd": 260,
//                     "ic": "04d"
//                 },
//                 {
//                     "ts": "2017-09-02T17:00:00.000Z",
//                     "tp": 16,
//                     "pr": 1005,
//                     "hu": 59,
//                     "ws": 8,
//                     "wd": 270,
//                     "ic": "04d"
//                 },
//                 {
//                     "ts": "2017-09-02T16:00:00.000Z",
//                     "tp": 16,
//                     "pr": 1005,
//                     "hu": 59,
//                     "ws": 8,
//                     "wd": 260,
//                     "ic": "04d"
//                 },
//                 {
//                     "ts": "2017-09-02T15:00:00.000Z",
//                     "tp": 16,
//                     "pr": 1005,
//                     "hu": 59,
//                     "ws": 8,
//                     "wd": 260,
//                     "ic": "04d"
//                 },
//                 {
//                     "ts": "2017-09-02T14:00:00.000Z",
//                     "tp": 15,
//                     "pr": 1005,
//                     "hu": 67,
//                     "ws": 9,
//                     "wd": 260,
//                     "ic": "04d"
//                 },
//                 {
//                     "ts": "2017-09-02T13:00:00.000Z",
//                     "tp": 14,
//                     "pr": 1005,
//                     "hu": 71,
//                     "ws": 9,
//                     "wd": 260,
//                     "ic": "04d"
//                 },
//                 {
//                     "ts": "2017-09-02T12:00:00.000Z",
//                     "tp": 13,
//                     "pr": 1005,
//                     "hu": 82,
//                     "ws": 6,
//                     "wd": 260,
//                     "ic": "04d"
//                 },
//                 {
//                     "ts": "2017-09-02T11:00:00.000Z",
//                     "tp": 11,
//                     "pr": 1004,
//                     "hu": 87,
//                     "ws": 5,
//                     "wd": 260,
//                     "ic": "04d"
//                 },
//                 {
//                     "ts": "2017-09-02T10:00:00.000Z",
//                     "tp": 10,
//                     "pr": 1005,
//                     "hu": 87,
//                     "ws": 3,
//                     "wd": 220,
//                     "ic": "04d"
//                 },
//                 {
//                     "ts": "2017-09-02T09:00:00.000Z",
//                     "tp": 11,
//                     "pr": 1004,
//                     "hu": 87,
//                     "ws": 5,
//                     "wd": 260,
//                     "ic": "04n"
//                 },
//                 {
//                     "ts": "2017-09-02T08:00:00.000Z",
//                     "tp": 11,
//                     "pr": 1004,
//                     "hu": 87,
//                     "ws": 6,
//                     "wd": 260,
//                     "ic": "03n"
//                 },
//                 {
//                     "ts": "2017-09-02T07:00:00.000Z",
//                     "tp": 12,
//                     "pr": 1004,
//                     "hu": 87,
//                     "ws": 7,
//                     "wd": 250,
//                     "ic": "03n"
//                 },
//                 {
//                     "ts": "2017-09-02T06:00:00.000Z",
//                     "tp": 11,
//                     "pr": 1004,
//                     "hu": 87,
//                     "ws": 7,
//                     "wd": 250,
//                     "ic": "02n"
//                 },
//                 {
//                     "ts": "2017-09-02T05:00:00.000Z",
//                     "tp": 12,
//                     "pr": 1004,
//                     "hu": 87,
//                     "ws": 7,
//                     "wd": 260,
//                     "ic": "02n"
//                 },
//                 {
//                     "ts": "2017-09-02T04:00:00.000Z",
//                     "tp": 12,
//                     "pr": 1004,
//                     "hu": 87,
//                     "ws": 8,
//                     "wd": 250,
//                     "ic": "02n"
//                 },
//                 {
//                     "ts": "2017-09-02T03:00:00.000Z",
//                     "tp": 13,
//                     "pr": 1003,
//                     "hu": 87,
//                     "ws": 6,
//                     "wd": 260,
//                     "ic": "02n"
//                 },
//                 {
//                     "ts": "2017-09-02T02:00:00.000Z",
//                     "tp": 14,
//                     "pr": 1004,
//                     "hu": 93,
//                     "ws": 8,
//                     "wd": 250,
//                     "ic": "04n"
//                 }
//             ],
//                 "pollution": [
//                     {
//                         "ts": "2017-09-04T01:00:00.000Z",
//                         "aqius": 11,
//                         "mainus": "o3",
//                         "aqicn": 9,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 14,
//                             "aqius": 11,
//                             "aqicn": 9
//                         }
//                     },
//                     {
//                         "ts": "2017-09-04T00:00:00.000Z",
//                         "aqius": 10,
//                         "mainus": "o3",
//                         "aqicn": 8,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 13,
//                             "aqius": 10,
//                             "aqicn": 8
//                         }
//                     },
//                     {
//                         "ts": "2017-09-03T23:00:00.000Z",
//                         "aqius": 12,
//                         "mainus": "o3",
//                         "aqicn": 9,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 15,
//                             "aqius": 12,
//                             "aqicn": 9
//                         }
//                     },
//                     {
//                         "ts": "2017-09-03T22:00:00.000Z",
//                         "aqius": 11,
//                         "mainus": "o3",
//                         "aqicn": 9,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 14,
//                             "aqius": 11,
//                             "aqicn": 9
//                         }
//                     },
//                     {
//                         "ts": "2017-09-03T21:00:00.000Z",
//                         "aqius": 4,
//                         "mainus": "o3",
//                         "aqicn": 3,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 5,
//                             "aqius": 4,
//                             "aqicn": 3
//                         }
//                     },
//                     {
//                         "ts": "2017-09-03T20:00:00.000Z",
//                         "aqius": 9,
//                         "mainus": "o3",
//                         "aqicn": 7,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 11,
//                             "aqius": 9,
//                             "aqicn": 7
//                         }
//                     },
//                     {
//                         "ts": "2017-09-03T19:00:00.000Z",
//                         "aqius": 18,
//                         "mainus": "o3",
//                         "aqicn": 14,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 23,
//                             "aqius": 18,
//                             "aqicn": 14
//                         }
//                     },
//                     {
//                         "ts": "2017-09-03T18:00:00.000Z",
//                         "aqius": 22,
//                         "mainus": "o3",
//                         "aqicn": 18,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 28,
//                             "aqius": 22,
//                             "aqicn": 18
//                         }
//                     },
//                     {
//                         "ts": "2017-09-03T17:00:00.000Z",
//                         "aqius": 21,
//                         "mainus": "o3",
//                         "aqicn": 16,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 26,
//                             "aqius": 21,
//                             "aqicn": 16
//                         }
//                     },
//                     {
//                         "ts": "2017-09-03T16:00:00.000Z",
//                         "aqius": 20,
//                         "mainus": "o3",
//                         "aqicn": 16,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 25,
//                             "aqius": 20,
//                             "aqicn": 16
//                         }
//                     },
//                     {
//                         "ts": "2017-09-03T15:00:00.000Z",
//                         "aqius": 18,
//                         "mainus": "o3",
//                         "aqicn": 14,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 23,
//                             "aqius": 18,
//                             "aqicn": 14
//                         }
//                     },
//                     {
//                         "ts": "2017-09-03T14:00:00.000Z",
//                         "aqius": 18,
//                         "mainus": "o3",
//                         "aqicn": 14,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 23,
//                             "aqius": 18,
//                             "aqicn": 14
//                         }
//                     },
//                     {
//                         "ts": "2017-09-03T13:00:00.000Z",
//                         "aqius": 18,
//                         "mainus": "o3",
//                         "aqicn": 14,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 22,
//                             "aqius": 18,
//                             "aqicn": 14
//                         }
//                     },
//                     {
//                         "ts": "2017-09-03T12:00:00.000Z",
//                         "aqius": 18,
//                         "mainus": "o3",
//                         "aqicn": 14,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 23,
//                             "aqius": 18,
//                             "aqicn": 14
//                         }
//                     },
//                     {
//                         "ts": "2017-09-03T11:00:00.000Z",
//                         "aqius": 21,
//                         "mainus": "o3",
//                         "aqicn": 16,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 26,
//                             "aqius": 21,
//                             "aqicn": 16
//                         }
//                     },
//                     {
//                         "ts": "2017-09-03T10:00:00.000Z",
//                         "aqius": 22,
//                         "mainus": "o3",
//                         "aqicn": 18,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 28,
//                             "aqius": 22,
//                             "aqicn": 18
//                         }
//                     },
//                     {
//                         "ts": "2017-09-03T09:00:00.000Z",
//                         "aqius": 22,
//                         "mainus": "o3",
//                         "aqicn": 17,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 27,
//                             "aqius": 22,
//                             "aqicn": 17
//                         }
//                     },
//                     {
//                         "ts": "2017-09-03T08:00:00.000Z",
//                         "aqius": 22,
//                         "mainus": "o3",
//                         "aqicn": 17,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 27,
//                             "aqius": 22,
//                             "aqicn": 17
//                         }
//                     },
//                     {
//                         "ts": "2017-09-03T07:00:00.000Z",
//                         "aqius": 21,
//                         "mainus": "o3",
//                         "aqicn": 16,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 26,
//                             "aqius": 21,
//                             "aqicn": 16
//                         }
//                     },
//                     {
//                         "ts": "2017-09-03T06:00:00.000Z",
//                         "aqius": 22,
//                         "mainus": "o3",
//                         "aqicn": 17,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 27,
//                             "aqius": 22,
//                             "aqicn": 17
//                         }
//                     },
//                     {
//                         "ts": "2017-09-03T05:00:00.000Z",
//                         "aqius": 23,
//                         "mainus": "o3",
//                         "aqicn": 18,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 29,
//                             "aqius": 23,
//                             "aqicn": 18
//                         }
//                     },
//                     {
//                         "ts": "2017-09-03T04:00:00.000Z",
//                         "aqius": 26,
//                         "mainus": "o3",
//                         "aqicn": 20,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 32,
//                             "aqius": 26,
//                             "aqicn": 20
//                         }
//                     },
//                     {
//                         "ts": "2017-09-03T03:00:00.000Z",
//                         "aqius": 27,
//                         "mainus": "o3",
//                         "aqicn": 21,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 34,
//                             "aqius": 27,
//                             "aqicn": 21
//                         }
//                     },
//                     {
//                         "ts": "2017-09-03T02:00:00.000Z",
//                         "aqius": 24,
//                         "mainus": "o3",
//                         "aqicn": 19,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 30,
//                             "aqius": 24,
//                             "aqicn": 19
//                         }
//                     },
//                     {
//                         "ts": "2017-09-03T01:00:00.000Z",
//                         "aqius": 21,
//                         "mainus": "o3",
//                         "aqicn": 16,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 26,
//                             "aqius": 21,
//                             "aqicn": 16
//                         }
//                     },
//                     {
//                         "ts": "2017-09-03T00:00:00.000Z",
//                         "aqius": 18,
//                         "mainus": "o3",
//                         "aqicn": 14,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 23,
//                             "aqius": 18,
//                             "aqicn": 14
//                         }
//                     },
//                     {
//                         "ts": "2017-09-02T23:00:00.000Z",
//                         "aqius": 17,
//                         "mainus": "o3",
//                         "aqicn": 13,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 21,
//                             "aqius": 17,
//                             "aqicn": 13
//                         }
//                     },
//                     {
//                         "ts": "2017-09-02T22:00:00.000Z",
//                         "aqius": 16,
//                         "mainus": "o3",
//                         "aqicn": 13,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 20,
//                             "aqius": 16,
//                             "aqicn": 13
//                         }
//                     },
//                     {
//                         "ts": "2017-09-02T21:00:00.000Z",
//                         "aqius": 16,
//                         "mainus": "o3",
//                         "aqicn": 13,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 20,
//                             "aqius": 16,
//                             "aqicn": 13
//                         }
//                     },
//                     {
//                         "ts": "2017-09-02T20:00:00.000Z",
//                         "aqius": 17,
//                         "mainus": "o3",
//                         "aqicn": 13,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 21,
//                             "aqius": 17,
//                             "aqicn": 13
//                         }
//                     },
//                     {
//                         "ts": "2017-09-02T19:00:00.000Z",
//                         "aqius": 18,
//                         "mainus": "o3",
//                         "aqicn": 14,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 23,
//                             "aqius": 18,
//                             "aqicn": 14
//                         }
//                     },
//                     {
//                         "ts": "2017-09-02T18:00:00.000Z",
//                         "aqius": 21,
//                         "mainus": "o3",
//                         "aqicn": 16,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 26,
//                             "aqius": 21,
//                             "aqicn": 16
//                         }
//                     },
//                     {
//                         "ts": "2017-09-02T17:00:00.000Z",
//                         "aqius": 23,
//                         "mainus": "o3",
//                         "aqicn": 18,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 29,
//                             "aqius": 23,
//                             "aqicn": 18
//                         }
//                     },
//                     {
//                         "ts": "2017-09-02T16:00:00.000Z",
//                         "aqius": 23,
//                         "mainus": "o3",
//                         "aqicn": 18,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 29,
//                             "aqius": 23,
//                             "aqicn": 18
//                         }
//                     },
//                     {
//                         "ts": "2017-09-02T15:00:00.000Z",
//                         "aqius": 23,
//                         "mainus": "o3",
//                         "aqicn": 18,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 29,
//                             "aqius": 23,
//                             "aqicn": 18
//                         }
//                     },
//                     {
//                         "ts": "2017-09-02T14:00:00.000Z",
//                         "aqius": 23,
//                         "mainus": "o3",
//                         "aqicn": 18,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 29,
//                             "aqius": 23,
//                             "aqicn": 18
//                         }
//                     },
//                     {
//                         "ts": "2017-09-02T13:00:00.000Z",
//                         "aqius": 22,
//                         "mainus": "o3",
//                         "aqicn": 17,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 27,
//                             "aqius": 22,
//                             "aqicn": 17
//                         }
//                     },
//                     {
//                         "ts": "2017-09-02T12:00:00.000Z",
//                         "aqius": 20,
//                         "mainus": "o3",
//                         "aqicn": 16,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 25,
//                             "aqius": 20,
//                             "aqicn": 16
//                         }
//                     },
//                     {
//                         "ts": "2017-09-02T11:00:00.000Z",
//                         "aqius": 18,
//                         "mainus": "o3",
//                         "aqicn": 14,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 23,
//                             "aqius": 18,
//                             "aqicn": 14
//                         }
//                     },
//                     {
//                         "ts": "2017-09-02T10:00:00.000Z",
//                         "aqius": 14,
//                         "mainus": "o3",
//                         "aqicn": 11,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 18,
//                             "aqius": 14,
//                             "aqicn": 11
//                         }
//                     },
//                     {
//                         "ts": "2017-09-02T09:00:00.000Z",
//                         "aqius": 12,
//                         "mainus": "o3",
//                         "aqicn": 9,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 15,
//                             "aqius": 12,
//                             "aqicn": 9
//                         }
//                     },
//                     {
//                         "ts": "2017-09-02T08:00:00.000Z",
//                         "aqius": 14,
//                         "mainus": "o3",
//                         "aqicn": 11,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 17,
//                             "aqius": 14,
//                             "aqicn": 11
//                         }
//                     },
//                     {
//                         "ts": "2017-09-02T07:00:00.000Z",
//                         "aqius": 14,
//                         "mainus": "o3",
//                         "aqicn": 11,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 18,
//                             "aqius": 14,
//                             "aqicn": 11
//                         }
//                     },
//                     {
//                         "ts": "2017-09-02T06:00:00.000Z",
//                         "aqius": 16,
//                         "mainus": "o3",
//                         "aqicn": 13,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 20,
//                             "aqius": 16,
//                             "aqicn": 13
//                         }
//                     },
//                     {
//                         "ts": "2017-09-02T05:00:00.000Z",
//                         "aqius": 18,
//                         "mainus": "o3",
//                         "aqicn": 14,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 22,
//                             "aqius": 18,
//                             "aqicn": 14
//                         }
//                     },
//                     {
//                         "ts": "2017-09-02T04:00:00.000Z",
//                         "aqius": 15,
//                         "mainus": "o3",
//                         "aqicn": 12,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 19,
//                             "aqius": 15,
//                             "aqicn": 12
//                         }
//                     },
//                     {
//                         "ts": "2017-09-02T03:00:00.000Z",
//                         "aqius": 16,
//                         "mainus": "o3",
//                         "aqicn": 13,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 20,
//                             "aqius": 16,
//                             "aqicn": 13
//                         }
//                     },
//                     {
//                         "ts": "2017-09-02T02:00:00.000Z",
//                         "aqius": 20,
//                         "mainus": "o3",
//                         "aqicn": 16,
//                         "maincn": "o3",
//                         "o3": {
//                             "conc": 25,
//                             "aqius": 20,
//                             "aqicn": 16
//                         }
//                     }
//                 ]
//         }
//     }
// }