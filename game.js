/////////Declare global variables here//////////////
var todayTemps;
var todayForecast;
var show;
var lon;
var lat;

var name;
var location;
var gender;
////////////////////////////////////////////////////

////////////////SIGN UP SCREEN//////////////////////

//------ functions ---------//
function goToIndex() {
  var url = "index.html";
  window.open(url);
}

function clearInput() {
  $("#name").val(" ");
  $("#cityState").val(" ");
}

$("#personalize").on("click", function(event) {
  goToIndex();

  name = $("#name").val();
  location = $("#cityState").val();

  if ($('#girl-check').is(":checked")) {
    gender = "girl";
  } else if ($('#boy-check').is(":checked")) {
    gender = "boy";
  } else {
    gender = "unknown";
  }
  console.log(name);
  console.log(location);
  console.log(gender);



});


////////////////WEATHER RESULTS PANEL//////////////////////


$("#today").on("click", function(event) {
  event.preventDefault();
  getClear();
  var city = $("#pac-input").val();
  console.log(city);
  $("#city-area").text(city);
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&units=imperial" + "&cnt=3" + "&APPID=166a433c57516f51dfab1f7edaed8413";
  // ajax call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log(response);
    $("#location").text(parseInt(response.list[0].temp.day) + "°");
    $("#forecast-desc").text(response.list[0].weather[0].main + ", " + response.list[0].weather[0].description);
    $("#air-desc").text(response.list[0].humidity + "%");
    // $("#humid").html("<img  src='tempsun.png'>");
    var icon = response.list[0].weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
    $(".icon").html("<img class=icons src='" + iconUrl + "'>");
    todayTemps = response.list[0].temp.day;
    todayForecast = response.list[0].weather[0].main;

    getDressed();

    // Added breezometer air quality api and sinked it to the response from the weather api
    var lon = response.city.coord.lon;
    var lat = response.city.coord.lat;
    console.log(lon);
    console.log(lat);
    var queryURLTwo = "https://api.breezometer.com/baqi/?lat=" + lat + "&lon=" + lon + "&key=fb9700086a3d410bb5256a0acc91cb88";
    $.ajax({
      url: queryURLTwo,
      method: "GET"
    }).done(function(response) {
      console.log(response);
      console.log(response.breezometer_aqi);
      console.log(response.random_recommendations.children);
      console.log(response.breezometer_color);
      $("#quality").text(response.breezometer_description);
      // $("#children").text("Parent Alert : " + response.random_recommendations.children + ".");
      $("#children").append("<h3 class='parent-font'>Parent Alert :</h3><h4 class='message-font'> " +  response.random_recommendations.children + "</h4>");
      // declaring variables for the air quality images
      var first = "http://www.colorhexa.com/800000.png";
      var second = "http://www.colorhexa.com/fe4600.png";
      var third = "http://www.colorhexa.com/fec500.png";
      var fourth = "http://html-color.org/DBFB4B.jpg";
      var fifth = "http://html-color.org/81DD38.jpg";
      var sixth = "http://www.colorhexa.com/009e3a.png";
      // Writing the if/else statement for the air quality output
      if (response.breezometer_aqi === 0) {
        $("#pollution").html("<img class=icons src='" + first + "'>");
      } else if (response.breezometer_aqi > 0 && response.breezometer_aqi <= 20) {
        $("#pollution").html("<img class=icons src='" + second + "'>");
      } else if (response.breezometer_aqi > 20 && response.breezometer_aqi <= 40) {
        $("#pollution").html("<img class=icons src='" + third + "'>");
      } else if (response.breezometer_aqi > 40 && response.breezometer_aqi <= 60) {
        $("#pollution").html("<img class=icons src='" + fourth + "'>");
      } else if (response.breezometer_aqi > 60 && response.breezometer_aqi <= 80) {
        $("#pollution").html("<img class=icons src='" + fifth + "'>");
      } else if (response.breezometer_aqi > 80 && response.breezometer_aqi <= 100) {
        $("#pollution").html("<img class=icons src='" + six + "'>");
      }


    });
  });
});
// Second Day Weather Tracker
$("#tmrw").on("click", function(event) {
  event.preventDefault();
  getClear();
  var city = $("#pac-input").val();
  console.log(city);
  $("#city-area").text(city);

  var queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&units=imperial" + "&cnt=3" + "&APPID=166a433c57516f51dfab1f7edaed8413";
  // ajax call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log(response);
    $("#location").text(parseInt(response.list[1].temp.day) + "°");
    $("#forecast-desc").text(response.list[1].weather[0].main + ", " + response.list[1].weather[0].description);
    $("#air-desc").text(response.list[1].humidity + "%");
    var icon = response.list[1].weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
    $(".icon").html("<img class=icons src='" + iconUrl + "'>");
    todayTemps = response.list[1].temp.day;
    getDressed();

    // Added breezometer air quality api and sinked it to the response from the weather api
    var lon = response.city.coord.lon;
    var lat = response.city.coord.lat;
    console.log(lon);
    console.log(lat);
    var queryURLTwo = "https://api.breezometer.com/baqi/?lat=" + lat + "&lon=" + lon + "&key=fb9700086a3d410bb5256a0acc91cb88";
    $.ajax({
      url: queryURLTwo,
      method: "GET"
    }).done(function(response) {
      console.log(response);
      console.log(response.breezometer_aqi);
      console.log(response.random_recommendations.children);
      $("#quality").text(response.breezometer_description);
      // $("#children").text("Parent Alert : " + response.random_recommendations.children + ".");
      $("#children").append("<h3 class='parent-font'>Parent Alert :</h3><h4 class='message-font'> " +  response.random_recommendations.children + "</h4>");
      // declaring variables for the air quality images
      var first = "http://www.colorhexa.com/800000.png";
      var second = "http://www.colorhexa.com/fe4600.png";
      var third = "http://www.colorhexa.com/fec500.png";
      var fourth = "http://html-color.org/DBFB4B.jpg";
      var fifth = "http://html-color.org/81DD38.jpg";
      var sixth = "http://www.colorhexa.com/009e3a.png";
      // Writing the if/else statement for the air quality output
      if (response.breezometer_aqi === 0) {
        $("#pollution").html("<img class=icons src='" + first + "'>");
      } else if (response.breezometer_aqi > 0 && response.breezometer_aqi <= 20) {
        $("#pollution").html("<img class=icons src='" + second + "'>");
      } else if (response.breezometer_aqi > 20 && response.breezometer_aqi <= 40) {
        $("#pollution").html("<img class=icons src='" + third + "'>");
      } else if (response.breezometer_aqi > 40 && response.breezometer_aqi <= 60) {
        $("#pollution").html("<img class=icons src='" + fourth + "'>");
      } else if (response.breezometer_aqi > 60 && response.breezometer_aqi <= 80) {
        $("#pollution").html("<img class=icons src='" + fifth + "'>");
      } else if (response.breezometer_aqi > 80 && response.breezometer_aqi <= 100) {
        $("#pollution").html("<img class=icons src='" + six + "'>");
      }
    });
  });
});

// Third Day Weather Tracker
$("#third").on("click", function(event) {
  event.preventDefault();
  getClear();
  var city = $("#pac-input").val();
  console.log(city);
  $("#city-area").text(city);
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&units=imperial" + "&cnt=3" + "&APPID=166a433c57516f51dfab1f7edaed8413";
  // ajax call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log(response);
    $("#location").text(parseInt(response.list[2].temp.day) + "°");
    $("#forecast-desc").text(response.list[2].weather[0].main + ", " + response.list[2].weather[0].description);
    $("#air-desc").text(response.list[2].humidity + "%");
    var icon = response.list[2].weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
    $(".icon").html("<img class=icons src='" + iconUrl + "'>");

    todayTemps = response.list[2].temp.day;
    getDressed();

    // Added breezometer air quality api and sinked it to the response from the weather api
    var lon = response.city.coord.lon;
    var lat = response.city.coord.lat;
    console.log(lon);
    console.log(lat);
    var queryURLTwo = "https://api.breezometer.com/baqi/?lat=" + lat + "&lon=" + lon + "&key=fb9700086a3d410bb5256a0acc91cb88";
    $.ajax({
      url: queryURLTwo,
      method: "GET"
    }).done(function(response) {
      console.log(response);
      console.log(response.breezometer_aqi);
      console.log(response.random_recommendations.children);
      $("#quality").text(response.breezometer_description);
      // $("#children").text("Parent Alert : " + response.random_recommendations.children + ".");
      $("#children").append("<h3 class='parent-font'>Parent Alert :</h3><h4 class='message-font'> " +  response.random_recommendations.children + "</h4>");
      // declaring variables for the air quality images
      var first = "http://www.colorhexa.com/800000.png";
      var second = "http://www.colorhexa.com/fe4600.png";
      var third = "http://www.colorhexa.com/fec500.png";
      var fourth = "http://html-color.org/DBFB4B.jpg";
      var fifth = "http://html-color.org/81DD38.jpg";
      var sixth = "http://www.colorhexa.com/009e3a.png";
      // Writing the if/else statement for the air quality output
      if (response.breezometer_aqi === 0) {
        $("#pollution").html("<img class=icons src='" + first + "'>");
      } else if (response.breezometer_aqi > 0 && response.breezometer_aqi <= 20) {
        $("#pollution").html("<img class=icons src='" + second + "'>");
      } else if (response.breezometer_aqi > 20 && response.breezometer_aqi <= 40) {
        $("#pollution").html("<img class=icons src='" + third + "'>");
      } else if (response.breezometer_aqi > 40 && response.breezometer_aqi <= 60) {
        $("#pollution").html("<img class=icons src='" + fourth + "'>");
      } else if (response.breezometer_aqi > 60 && response.breezometer_aqi <= 80) {
        $("#pollution").html("<img class=icons src='" + fifth + "'>");
      } else if (response.breezometer_aqi > 80 && response.breezometer_aqi <= 100) {
        $("#pollution").html("<img class=icons src='" + six + "'>");
      }
    });
  });
});


////////////////MAIN PANEL RESULTS//////////////////////

function getDressed() {

  var genderClothes = "girl";
  //build conditionals that displays the correct graphics

  if ((todayTemps > 80) && (genderClothes === "girl")) {
    $("#overall-results").text("It'll be a WARM, OVERCAST DAY for you. Be sure to dress in light, short-sleeved shirts and bottoms.");
    $("#background-img").css("background-image", 'url("images/sunnybackground.jpeg")');
    $("#character").append("<img id='gender' src='images/girl3-summer-02.png' height='500px' width='auto'>");

    $("#tops").append("<h4 class='text-center'> Choose a SHORT-SLEEVED top like this one: </h4>");
    $("#tops").append("<img class='text-center' src='images/boyTshirt1.png' height='120px' width='auto' ></div>");
    $("#bottoms").append("<h4 class='text-center'> Pick a pair of SHORTS like this one: </h4>");
    $("#bottoms").append("<img class='text-center' src='images/boyShorts1.png' height='120px' width='auto' ></div>");
    $("#accessories-1").append("<h4 class='text-center'> Protect yourself from the sun! </h4>");
    $("#accessories-1").append("<img class='text-center' src='images/girlHat1.png' height='120px' width='auto' ></div>");

  } else if ((todayTemps > 60) && (genderClothes === "girl")) {
    $("#overall-results").text("It'll be a COOLER DAY for you. Be sure to dress in layers, with a long sleeved shirt or a light jacket, with long pants.");

    $("#background-img").css("background-image", 'url("images/fallish.png")');
    $("#character").append("<img id='gender' src='images/girl3-spring-02.png' height='500px' width='auto'>");

    $("#tops").append("<h4 class='text-center'> Choose a LONG-SLEEVED top like this one: </h4>");
    $("#tops").append("<img class='text-center' src='images/girlShirt1.png' height='120px' width='auto' ></div>");
    $("#bottoms").append("<h4 class='text-center'> Pick a pair of PANTS like this one: </h4>");
    $("#bottoms").append("<img class='text-center' src='images/girlPants1.png' height='140px' width='auto' ></div>");
    $("#accessories-1").append("<h4 class='text-center'> Shield yourself from the cold! </h4>");
    $("#accessories-1").append("<img class='text-center' src='images/scarf1.png' height='120px' width='auto' ></div>");

  } else if ((todayTemps > 0) && (genderClothes === "girl")) {
    $("#overall-results").text("It will be COLD! Be sure to dress as warm as you can. Pick long-sleeved tops, long pants and throw on a scarf!");

    $("#background-img").css("background-image", 'url("images/winter.jpg")');
    $("#character").append("<img id='gender' src='images/girl3-winter-02.png' height='500px' width='auto'>");

    $("#tops").append("<h4 class='text-center'> Choose a SWEATER like this one: </h4>");
    $("#tops").append("<img class='text-center' src='images/girlShirt3.png' height='120px' width='auto' ></div>");
    $("#bottoms").append("<h4 class='text-center'> Pick a pair of PANTS like this one: </h4>");
    $("#bottoms").append("<img class='text-center' src='images/girlPants2.png' height='120px' width='auto' ></div>");
    $("#accessories-1").append("<h4 class='text-center'> Protect yourself from the freezing temps! </h4>");
    $("#accessories-1").append("<img class='text-center' src='images/scarf1.png' height='120px' width='auto'></div>");

  } else if ((todayTemps > 80) && (genderClothes === "boy")) {
  $("#overall-results").text("It'll be a WARM, OVERCAST DAY for you. Be sure to dress in light, short-sleeved shirts and bottoms.");
  $("#background-img").css("background-image", 'url("images/sunnybackground.jpeg")');
  $("#character").append("<img id='gender' src='images/boy1-summer.png' height='500px' width='auto'>");

  $("#tops").append("<h4 class='text-center'> Choose a SHORT-SLEEVED top like this one: </h4>");
  $("#tops").append("<img class='text-center' src='images/boyTshirt1.png' height='120px' width='auto' ></div>");
  $("#bottoms").append("<h4 class='text-center'> Pick a pair of SHORTS like this one: </h4>");
  $("#bottoms").append("<img class='text-center' src='images/boyShorts1.png' height='120px' width='auto' ></div>");
  $("#accessories-1").append("<h4 class='text-center'> Protect yourself from the sun! </h4>");
  $("#accessories-1").append("<img class='text-center' src='images/girlHat1.png' height='120px' width='auto' ></div>");

} else if ((todayTemps > 60) && (genderClothes === "boy")) {
  $("#overall-results").text("It'll be a COOLER DAY for you. Be sure to dress in layers, with a long sleeved shirt or a light jacket, with long pants.");

  $("#background-img").css("background-image", 'url("images/fallish.png")');
  $("#character").append("<img id='gender' src='images/boy2-spring-02.png' height='500px' width='auto'>");

  $("#tops").append("<h4 class='text-center'> Choose a LONG-SLEEVED top like this one: </h4>");
  $("#tops").append("<img class='text-center' src='images/girlShirt1.png' height='120px' width='auto' ></div>");
  $("#bottoms").append("<h4 class='text-center'> Pick a pair of PANTS like this one: </h4>");
  $("#bottoms").append("<img class='text-center' src='images/girlPants1.png' height='140px' width='auto' ></div>");
  $("#accessories-1").append("<h4 class='text-center'> Shield yourself from the cold! </h4>");
  $("#accessories-1").append("<img class='text-center' src='images/scarf1.png' height='120px' width='auto' ></div>");

} else if ((todayTemps > 0) && (genderClothes === "boy")) {
  $("#overall-results").text("It will be COLD! Be sure to dress as warm as you can. Pick long-sleeved tops, long pants and throw on a scarf!");

  $("#background-img").css("background-image", 'url("images/winter.jpg")');
  $("#character").append("<img id='gender' src='images/boy3-winter-02.png' height='500px' width='auto'>");

  $("#tops").append("<h4 class='text-center'> Choose a SWEATER like this one: </h4>");
  $("#tops").append("<img class='text-center' src='images/girlShirt3.png' height='120px' width='auto' ></div>");
  $("#bottoms").append("<h4 class='text-center'> Pick a pair of PANTS like this one: </h4>");
  $("#bottoms").append("<img class='text-center' src='images/girlPants2.png' height='120px' width='auto' ></div>");
  $("#accessories-1").append("<h4 class='text-center'> Protect yourself from the freezing temps! </h4>");
  $("#accessories-1").append("<img class='text-center' src='images/scarf1.png' height='120px' width='auto'></div>");
} else {
  console.log("Oops");
}
}


// Function to clear out the right side panel - the clothes choices - should the user want to try a different location
function getClear() {
  $("#tops").html(" ");
  $("#bottoms").html(" ");
  $("#accessories-1").html(" ");
  $("#character").html(" ");
  $("#children").html(" ");
}
