$(document).ready(function() {
    
    
    $("#search").on("click", function(event) {
        event.preventDefault();

    // ====================== converts input formart for AJAX call ====================================

        var query = $("#textInput").val();
      console.log(query);
     query = query.split(" ").join("%20");
     console.log(query)

     // =================================== Object we send the API =======================================
     var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://apidojo-kayak-v1.p.rapidapi.com/locations/search?where=${query}`,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "apidojo-kayak-v1.p.rapidapi.com",
            "x-rapidapi-key": "51948e1073mshb9e095b68967640p15c64ejsn35fc600c9a12"
        }
    }

    

    $.ajax(settings).done(function (response) {
        console.log(response);
        console.log(response[0].ap)
        console.log(response[0].cityname)
        console.log(response[0].country)
        console.log(response[0].region)
        console.log(response[0].utc)
        var airlineImage = $("<img>")
        var airlineImgUrl = response[0].destination_images.image_jpeg;
        $(airlineImage).attr("src", airlineImgUrl)
        $("#pictures").append(airlineImage)
        // ====================== NESTED AJAX CALL======================================
        
        console.log(response[0].ap);


        var origin = "PHX";
    var destination1 = response[0].ap;
    var departDate = "2020-3-20";
    var cabin = "e";
    var currency = "USD"
    var adults = "1"
    var bags = "0"

    var radius = "100"
var latitude = response[0].lat;
var longitude = response[0].lng;

var settings2 = {
	"async": true,
	"crossDomain": true,
	"url": `https://trailapi-trailapi.p.rapidapi.com/trails/explore/?radius=${radius}&lat=${latitude}&lon=${longitude}`,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com",
		"x-rapidapi-key": "51948e1073mshb9e095b68967640p15c64ejsn35fc600c9a12"
	}
}

$.ajax(settings2).done(function (response2) {
    console.log(response2);
    console.log(response2.data[0].city);
   var description = response2.data[0].description;
   $("#trails").html(`<p>Description: ${description}</p>`)
   var rating = response2.data[0].difficulty;
   var directions = response2.data[0].directions;
   $("#difficulty").append(`<p> ${rating}</p>`)
   $("#trails").append(`<p>Directions: ${directions}</p>`)
   var trailName = response2.data[0].name;
   $("#trail-name").prepend(`<p> ${trailName}</p>`)
   var score = response2.data[0].rating;
   $("#rating4-5").append(`<p> ${score}/5`)
   var trailThumbnail = response2.data[0].thumbnail;
//    $("#trails").append(`<img src="${trailThumbnail}"`)
   var trailImage = $("<img>")
        
        $(trailImage).attr("src", trailThumbnail)
        $("#trail-img").append(trailImage)


    
    
});

    var settings3 = {
        "async": true,
        "crossDomain": true,
        "url": `https://apidojo-kayak-v1.p.rapidapi.com/flights/create-session?origin1=${origin}&destination1=${destination1}&departdate1=${departDate}&cabin=${cabin}&currency=${currency}&adults=${adults}&bags=${bags}`,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "apidojo-kayak-v1.p.rapidapi.com",
            "x-rapidapi-key": "51948e1073mshb9e095b68967640p15c64ejsn35fc600c9a12"
        }
    }
    
    $.ajax(settings3).then(function (response3) {
        console.log(response3);
        console.log(response3.airportSummary);
        console.log(response3.baseUrl);
        console.log(response3.airports.values);
        console.log(response3.departDate);
        console.log(response3.tripset[0]);
        
        console.log(response3.tripset[0].cheapestProviderName);
        console.log(response3.tripset[0].displayLow);
        // console.log(response3.tripset[0].fareFamily.displayName);
        console.log(response3.tripset[0].shareURL);
       var displayFlight = $("#flights")
       var flightUrl = response3.tripset[0].shareURL;
       console.log(flightUrl);
       
       var baseUrl = response3.baseUrl;
       console.log(baseUrl);
       console.log(`${baseUrl}${flightUrl}`);
       
       let link = $("<a>");
        link.attr("href", `${baseUrl}${flightUrl}`);
        link.text("Book Flights!");
        link.attr("baseUri", "");
        console.log(link);
        $(displayFlight).append(link)
    });

  });
});
});