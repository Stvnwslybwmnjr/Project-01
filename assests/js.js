$(document).ready(function () {


    $("#search").on("click", function (event) {
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
                for (var i = 0; i < 10; i++) {

                    // =========================DYNAMIC CARD CREATION===============
                    let card = $("<div>");
                    $(card).attr("class", "row shadow p-1 mb-1 bg-white rounded");

                    let col = $("<div>");
                    $(col).attr("class", "col-3");

                    let trailImg = $("<div>");
                    $(trailImg).attr("id", `trail-img${[i]}`);
                    $(trailImg).attr("alt", `image`);

                    let col7 = $("<div>");
                    $(col7).attr("class", "col-7");

                    let thing = $("<div>")
                    $(thing).attr("class", "card mb-3")

                    let cardbody = $("<div>")
                    $(cardbody).attr("class", "card-body")

                    let h5 = $("<h5>")
                    $(h5).attr("class", "card-title")
                    $(h5).attr("id", `trail-name${[i]}`)

                    let br = $("<br>")
                    let aDiff = $("<a>")
                    $(aDiff).attr("class", "card-text")
                    $(aDiff).attr("id", `difficulty${[i]}`)

                    let aRate = $("<a>")
                    $(aRate).attr("class", "card-text");
                    $(aRate).attr("id", `rating4-5${[i]}`);

                    // =============Explore Button===============
                    let col2 = $("<div>");
                    $(col2).attr("class", "col-2 btn-explore");

                    let aSmlExp = $("<a>");
                    $(aSmlExp).attr("href", "search-explore.html");
                    $(aSmlExp).attr("id", `smaller-explore-btn${[i]}`);
                    $(aSmlExp).attr("class", "btn btn-outline-secondary");
                    $(aSmlExp).attr("role", "button");
                    $(aSmlExp).text("explore");

                    let icon = $("<i>");
                    $(icon).attr("class", "fas fa-biking");
                    $(aSmlExp).append(icon);
                    $(col2).append(aSmlExp);
                    $(cardbody).append(h5)
                    $(cardbody).append(br)
                    $(cardbody).append(aDiff);
                    $(cardbody).append(aRate);
                    $(thing).append(cardbody)
                    $(col7).append(thing)
                    $(col).append(trailImg);
                    $(card).append(col);
                    $(card).append(col7);
                    $(card).append(col2);
                    $("#box-Containers").append(card);

                    // =======================Original card display================
                    console.log(response2);
                    console.log(response2.data[i].city);
                    var description = response2.data[i].description;
                    $(`#trails${i}`).html(`<p>Description: ${description}</p>`)
                    var rating = response2.data[i].difficulty;
                    var directions = response2.data[i].directions;
                    $(`#difficulty${i}`).append(`<p>Difficulty: ${rating}</p>`)
                    $(`#trails${i}`).append(`<p>Directions: ${directions}</p>`)
                    var trailName = response2.data[i].name;
                    $(`#trail-name${i}`).prepend(`<p> ${trailName}</p>`)
                    var score = response2.data[i].rating;
                    $(`#rating4-5${i}`).append(`<p>Rating: ${score}/5`)
                    var trailThumbnail = response2.data[i].thumbnail;
                    //    $("#trails").append(`<img src="${trailThumbnail}"`)
                    var trailImage = $("<img>")

                    $(trailImage).attr("src", trailThumbnail)
                    $(`#trail-img${i}`).append(trailImage)

                }
            });


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