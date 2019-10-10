$(document).ready(function() {
  $("#search").on("click", function(event) {
    event.preventDefault();

        // ====================== converts input formart for AJAX call ====================================

    var query = $("#textInput").val();
    console.log(query);
    query = query.split(" ").join("%20");
    console.log(query);

    // =================================== Object we send the API =======================================
    var settings = {
      async: true,
      crossDomain: true,
      url: `https://apidojo-kayak-v1.p.rapidapi.com/locations/search?where=${query}`,
      method: "GET",
      headers: {
        "x-rapidapi-host": "apidojo-kayak-v1.p.rapidapi.com",
        "x-rapidapi-key": "51948e1073mshb9e095b68967640p15c64ejsn35fc600c9a12"
      }
    };

    $.ajax(settings).done(function(response) {
      console.log(response);
      console.log(response[0].ap);
      console.log(response[0].cityname);
      console.log(response[0].country);
      console.log(response[0].region);
      console.log(response[0].utc);
      var airlineImage = $("<img>");
      var airlineImgUrl = response[0].destination_images.image_jpeg;
      $(airlineImage).attr("src", airlineImgUrl);
      // ====================== NESTED AJAX CALL======================================
      
      console.log(response[0].ap);
      
      var origin = "PHX";
      var destination1 = response[0].ap;
      var departDate = "2020-3-20";
      var cabin = "e";
      var currency = "USD";
      var adults = "1";
      var bags = "0";
      
      var radius = "100";
      var latitude = response[0].lat;
      var longitude = response[0].lng;
      
      var settings2 = {
          async: true,
          crossDomain: true,
          url: `https://trailapi-trailapi.p.rapidapi.com/trails/explore/?radius=${radius}&lat=${latitude}&lon=${longitude}`,
          method: "GET",
          headers: {
              "x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com",
              "x-rapidapi-key": "51948e1073mshb9e095b68967640p15c64ejsn35fc600c9a12"
            }
        };
                      var settings3 = {
                          async: true,
                          crossDomain: true,
                          url: `https://apidojo-kayak-v1.p.rapidapi.com/flights/create-session?origin1=${origin}&destination1=${destination1}&departdate1=${departDate}&cabin=${cabin}&currency=${currency}&adults=${adults}&bags=${bags}`,
                          method: "GET",
                        headers: {
                            "x-rapidapi-host": "apidojo-kayak-v1.p.rapidapi.com",
                            "x-rapidapi-key": "51948e1073mshb9e095b68967640p15c64ejsn35fc600c9a12"
                        }
                    };
                    
                    Promise.all([$.ajax(settings2), $.ajax(settings3)]).then(function(responses) {
                        
                        //   $.ajax(settings2).done(function(response2) {
        for (var i = 0; i < 10; i++) {
            // =========================DYNAMIC CARD CREATION===============
            console.log(responses)
            let card = $("<div>");
            $(card).attr("class", "row shadow p-1 mb-1 bg-white rounded");
            
            let col = $("<div>");
            $(col).attr("class", "col-3");
            
            let trailImg = $("<div>");
            $(trailImg).attr("id", `trail-img${[i]}`);
            $(trailImg).attr("alt", `image`);
            
            let col7 = $("<div>");
            $(col7).attr("class", "col-7");
            
            let thing = $("<div>");
            $(thing).attr("class", "card mb-3");
            
            let cardbody = $("<div>");
            $(cardbody).attr("class", "card-body");
            
            let h5 = $("<h5>");
            $(h5).attr("class", "card-title");
            $(h5).attr("id", `trail-name${[i]}`);
            
            let br = $("<br>");
            
            let aDiff = $("<a>");
            $(aDiff).attr("class", "card-text");
            $(aDiff).attr("id", `difficulty${[i]}`);
            
            let aRate = $("<a>");
          $(aRate).attr("class", "card-text");
          $(aRate).attr("id", `rating4-5${[i]}`);

          // =============Explore Button===============
        //   let col2 = $("<div>");
        //   $(col2).attr("class", "col-2");
          
        //   let aSmlExp = $("<a>");
        //   $(aSmlExp).attr("href", "search-explore.html");
        //   $(aSmlExp).attr("id", `smaller-explore-btn${[i]}`);
        //   $(aSmlExp).attr("class", "btn btn-outline-secondary");
        //   $(aSmlExp).attr("role", "button");
        //   $(aSmlExp).text("explore");
        //   let icon = $("<i>");
        //   $(icon).attr("class", "fas fa-biking");
        //   $(aSmlExp).append(icon);
        //   $(col2).append(aSmlExp);
          
          $(cardbody).append(h5);
          $(cardbody).append(br);
          $(cardbody).append(aDiff);
          $(cardbody).append(aRate);
          $(thing).append(cardbody);
          $(col7).append(thing);
          
          $(col).append(trailImg);
          
          $(card).append(col);
          $(card).append(col7);
        //   $(card).append(col2);
          
          // =================== Accordion feature==================================
          // =================header Section ====================================
          let accordion = $("<div>");
          $(accordion).attr("id", `accordion${[i]}`);
          $(accordion).attr("class", "accordion");
          let accordCard = $("<div>");
          $(accordCard).attr("class", "card");
          let accordCardHead = $("<div>");
          $(accordCardHead).attr("class", "card-header");
          $(accordCardHead).attr("id", `headingOne${[i]}`);
          let h5mb = $("<h5>");
          $(h5mb).attr("class", "mb-0");
          let accordButton = $("<button>");
          $(accordButton).attr("class", "btn btn-outline-secondary my-2 my-sm-0");
          $(accordButton).attr("data-toggle", "collapse");
          $(accordButton).attr("data-target", `#collapseOne${[i]}`);
          $(accordButton).attr("aria-expanded", "true");
          $(accordButton).attr("aria-controls", `collapseOne${[i]}`);
          $(accordButton).text("Trail Description  ");
          let iconSign2 = $("<i>");
          iconSign2.attr("class", "fas fa-binoculars");
          $(accordButton).append(iconSign2)
          
          $(h5mb).append(accordButton);
          $(accordCardHead).append(h5mb);
          $(accordion).append(accordCardHead);
          // =================== EXPANDING SECTION =====================
          let accordBody = $("<div>");
          $(accordBody).attr("id", `collapseOne${[i]}`);
          $(accordBody).attr("class", "collapse");
          $(accordBody).attr("aria-labelledby", `headingOne${[i]}`);
          $(accordBody).attr("data-parent", `#accordion${[i]}`);
          let accCardBody = $("<div>");
          $(accCardBody).attr("class", "card-body");
          $(accCardBody).text(`Description: ${responses[0].data[i].description}`);

          $(accordBody).append(accCardBody);
          $(accordion).append(accordBody);
          $(card).append(accordion);
          
          //   $("#box-Containers").append(card);
          // =============================New Accordion Experiment======================
          let accordion2 = $("<div>");
          $(accordion2).attr("id", `accordiontwo${[i]}`);
          $(accordion2).attr("class", "accordion");
          let accordCard2 = $("<div>");
          $(accordCard2).attr("class", "card");
          let accordCardHead2 = $("<div>");
          $(accordCardHead2).attr("class", "card-header");
          $(accordCardHead2).attr("id", `headingtwo${[i]}`);
          let h5mb2 = $("<h5>");
          $(h5mb2).attr("class", "mb-0");
          let accordButton2 = $("<button>");
          $(accordButton2).attr("class", "btn btn-outline-secondary my-2 my-sm-0");
          $(accordButton2).attr("data-toggle", "collapse");
          $(accordButton2).attr("data-target", `#collapsetwo${[i]}`);
          $(accordButton2).attr("aria-expanded", "true");
          $(accordButton2).attr("aria-controls", `collapsetwo${[i]}`);
          $(accordButton2).text("Directions  ");
          let iconSign1 = $("<i>");
            iconSign1.attr("class", "fas fa-map-signs");
            $(accordButton2).append(iconSign1)
            
            $(h5mb2).append(accordButton2);
            $(accordCardHead2).append(h5mb2);
            $(accordion2).append(accordCardHead2);
            // =================== EXPANDING SECTION =====================
          let accordBody2 = $("<div>");
          $(accordBody2).attr("id", `collapsetwo${[i]}`);
          $(accordBody2).attr("class", "collapse");
          $(accordBody2).attr("aria-labelledby", `headingtwo${[i]}`);
          $(accordBody2).attr("data-parent", `#accordiontwo${[i]}`);
          let accCardBody2 = $("<div>");
          $(accCardBody2).attr("class", "card-body");
          $(accCardBody2).text(`Description: ${responses[0].data[i].directions}`);
          
          $(accordBody2).append(accCardBody2);
          $(accordion2).append(accordBody2);
          $(card).append(accordion2);
          
          // =============================== KAJAK ACCORDION ==========================
          
          // =============================New Accordion Experiment======================
          let accordion3 = $("<div>");
             $(accordion3).attr("id", `accordionthree${[i]}`);
             $(accordion3).attr("class", "accordion");
             let accordCard3 = $("<div>");
             $(accordCard3).attr("class", "card");
             let accordCardHead3 = $("<div>");
             $(accordCardHead3).attr("class", "card-header");
             $(accordCardHead3).attr("id", `headingthree${[i]}`);
             let h5mb3 = $("<h5>");
             $(h5mb3).attr("class", "mb-0");
             let accordButton3 = $("<button>");
             $(accordButton3).attr("class", "btn btn-outline-secondary my-3 my-sm-0");
             $(accordButton3).attr("data-toggle", "collapse");
             $(accordButton3).attr("data-target", `#collapsethree${[i]}`);
             $(accordButton3).attr("aria-expanded", "true");
             $(accordButton3).attr("aria-controls", `collapsethree${[i]}`);
             $(accordButton3).text("Flights  ");
             let iconSign = $("<i>");
             iconSign.attr("class", "fas fa-plane");
             $(accordButton3).append(iconSign)
             
             $(h5mb3).append(accordButton3);
             $(accordCardHead3).append(h5mb3);
             $(accordion3).append(accordCardHead3);
             // =================== EXPANDING SECTION =====================
             let accordBody3 = $("<div>");
             $(accordBody3).attr("id", `collapsethree${[i]}`);
             $(accordBody3).attr("class", "collapse");
             $(accordBody3).attr("aria-labelledby", `headingthree${[i]}`);
             $(accordBody3).attr("data-parent", `#accordionthree${[i]}`);
             let accCardBody3 = $("<div>");
             $(accCardBody3).attr("class", "card-body");
             let flightSum = $("<p>");
             if (responses[1].error == true){flightSum.text("No Major Airports found")}else{
             flightSum.text(`Flight Summary: ${responses[1].airportSummary}`)};
             let cities = $("<p>");
            //  if (responses[1].error == true){cities.text("")}else{
            //  cities.text(`Cities:${responses[1].airports.values}`)};
             let lowPrice = $("<p>");
            //  This is where the price is displayed
            if (responses[1].error == true){lowPrice.text("")}
            else{
            if (responses[1].tripset[0].displayLow < 0) {
                lowPrice.text(`Lowest Available Price: click link to view lowest price`)
            }else{
             lowPrice.text(`Lowest Available Price:${responses[1].tripset[0].displayLow}`)}}
             let airline = $("<p>");
             if (responses[1].error == true){airline.text("")}else{
             airline.text(`Airline:${responses[1].tripset[0].cheapestProviderName}`)}
             $(lowPrice).append(airline);
             $(cities).append(lowPrice);
             $(flightSum).append(cities);
             $(accCardBody3).append(flightSum);
             //  $(accCardBody3).html(`Flight Summary: ${responses[1].airportSummary}<br> Cities:${responses[1].airports.values}<br>  Lowest Available Price:${responses[1].tripset[0].displayLow}<br> Airline:${responses[1].tripset[0].cheapestProviderName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`);
             $(accCardBody3).append(airlineImage);
             
             $(accordBody3).append(accCardBody3);
             $(accordion3).append(accordBody3);
             $(card).append(accordion3);
             
             
             $("#box-Containers").append(card);
             
             // =======================Original card display================
             console.log(responses[0]);
          console.log(responses[0].data[i].city);
          var description = responses[0].data[i].description;
          $(`#trails${i}`).html(`<p>Description: ${description}</p>`);
          var rating = responses[0].data[i].difficulty;
          var directions = responses[0].data[i].directions;
          $(`#difficulty${i}`).append(`<p>Difficulty: ${rating}</p>`);
          $(`#trails${i}`).append(`<p>Directions: ${directions}</p>`);
          var trailName = responses[0].data[i].name;
          $(`#trail-name${i}`).prepend(`<p>Trail Name: ${trailName}</p>`);
          var score = responses[0].data[i].rating;
          $(`#rating4-5${i}`).append(`<p>User Rating: ${score}/5`);
          var trailThumbnail = responses[0].data[i].thumbnail;
          //    $("#trails").append(`<img src="${trailThumbnail}"`)
          var trailImage = $("<img>");

          $(trailImage).attr("src", trailThumbnail);
          $(`#trail-img${i}`).append(trailImage);

        //   
          console.log(responses[1]);
          console.log(responses[1].airportSummary);
          console.log(responses[1].baseUrl);
          console.log(responses[1].airports.values);
          console.log(responses[1].departDate);
          console.log(responses[1].tripset[0]);
    
          console.log(responses[1].tripset[0].cheapestProviderName);
          console.log(responses[1].tripset[0].displayLow);
          // console.log(responses[1].tripset[0].fareFamily.displayName);
          console.log(responses[1].tripset[0].shareURL);
          var displayFlight = $("#flights");
          var flightUrl = responses[1].tripset[0].shareURL;
          console.log(flightUrl);
    
          var baseUrl = responses[1].baseUrl;
          console.log(baseUrl);
          console.log(`${baseUrl}${flightUrl}`);
    
          let link = $("<a>");
          link.attr("href", `${baseUrl}${flightUrl}`);
          link.text("Book Flights!");
          link.attr("baseUri", "");
          link.attr("target", "_blank")
          console.log(link);
          $(accCardBody3).append(link);
        }
      });


     
    });
  });
});