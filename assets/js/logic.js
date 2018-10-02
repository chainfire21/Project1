


$("#add_location").on("click", function () {
    // In this case, the "this" keyword refers to the button that was clicked
    var city = $("#city").val();
    var state = $("#state").val();
    
    var queryURL = "http://api.airvisual.com/v2/city?city=" + city + "&state=" + state + "&country=USA&key=a94duGPQHHCF4FGeQ";
    console.log(queryURL);

     // // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response){
        console.log(response);
        var pollution = response.data.current.pollution.aqius;
        console.log(pollution);
    })

});
