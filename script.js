//
// function submit(){
// let web = "https://api.weatherbit.io/v2.0/current?&city=";
//
// let city = document.getElementById("city").value;
//
// let key = "&key=477bd6d8bdb84203ab5485442834cf3f";
//
// let url = web + city + key;
//
// console.log(url);
// }



var input = document.getElementById("city");
var input2 = document.getElementById("country");

input2.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("button").click();
  }
});

input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("button").click();
  }
});

function displayResults(data) {

/* this should be fixed so that it actually */
/* outputs the title of the movie the user  */
/* searchs for (enters into the input box)  */
let temp = data.data[0].temp;
let city = data.data[0].city_name;
let description = data.data[0].weather.description;
let datetime = data.data[0].datetime;
let country = data.data[0].country_code;
let icon = data.data[0].weather.icon;
let sunrise = (data.data[0].sunrise);
let sunset = (data.data[0].sunset);

   // Extract the hours and minutes
const [shours, sminutes] = sunrise.split(':').map(Number);

// Calculate the total hours (24-hour format)
const stotalHours = shours;

// Subtract 7 hours
let snewHours = stotalHours - 7;

// Handle negative hour values (e.g., when subtracting 7 from 02:00)
if (snewHours < 0) {
  snewHours += 24; // Adding 24 hours to get the correct time in 24-hour format
}

// Format the new hours and minutes
sunrise= `${snewHours < 10 ? '0' : ''}${snewHours}:${sminutes < 10 ? '0' : ''}${sminutes}`; 


  
  // Extract the hours and minutes
const [hours, minutes] = sunset.split(':').map(Number);

// Calculate the total hours (24-hour format)
const totalHours = hours;

// Subtract 7 hours
let newHours = totalHours - 7;

// Handle negative hour values (e.g., when subtracting 7 from 02:00)
if (newHours < 0) {
  newHours += 24; // Adding 24 hours to get the correct time in 24-hour format
}

// Format the new hours and minutes
sunset= `${newHours < 10 ? '0' : ''}${newHours}:${minutes < 10 ? '0' : ''}${minutes}`;
sunrise += "(PDT)";
sunset += "(PDT)";

// if(parseInt(sunset) > 12){
//   sunset = parseInt(sunset) - 12 + " pm";
// }else{
//   sunset = sunset + " am";
// }
// if(parseInt(sunrise) < 12){
//   sunrise = parseInt(sunrise) + " am";
// }else{
//   sunrise = parseInt(sunrise)-12 +" pm";
// }

if(icon == "c04d" || icon == "a01d" || icon == "a02d" || icon == "a03d" || icon == "a04d" || icon == "a05d" || icon == "a06d" || icon == "c03d" || icon == "c04d"){
  $("#background-video").attr("src", "allcloudy.mp4");
}
if(icon[3] == "n"){
  $("#background-video").attr("src", "night.mp4");
  // console.log(document.getElementById('background-video').value());
  icon = "c04d";
}
if(icon[0] == "r" || icon[0] == "f"){
  $("#background-video").attr("src", "rain.mp4");
}

if(icon == "c01d" || icon == "c02d"){
  $("#background-video").attr("src", "sunonly.mp4");
}
let picture = "https://www.weatherbit.io/static/img/icons/"+ icon +".png";
$("#resultSunrise").html("sunrise: " + sunrise);
$("#sunup").attr("src", "sunrise.jpeg");
$("#sundown").attr("src", "sunset.jpeg");
$("#resultSunset").html("sunset: "+sunset);
$("#resultTemp").html(temp + " °C");
$("#resultCity").html(city);
$("#resultDescription").html(description);
$("#resultDatetime").html(datetime);
$("#resultCountry").html(country);
$("#picture").attr("src", picture);


// let cast = data.Actors;
// let runtime = data.Runtime;
// let boxoffice = data.BoxOffice;
// let rating = data.Rated;

}

function displayResults2(_links){
  let image = _links.photos[0].image.mobile;
  $(".bg-image").css("background-image", "url('" + image + "')");
}
function submit(){

let baseURL = "https://api.weatherbit.io/v2.0/current?";
let key = "&key=" + "267fa4078cf74f97bdd2b1be0ebfedb9";
let city =  "&city=" + $("#city").val().toLowerCase();
let country = "&country=" + $("#country").val().toLowerCase();
let url = baseURL + city + country + key;

let imageUrl = `https://cors-anywhere.herokuapp.com/https://api.teleport.org/api/urban_areas/slug:${city}/images/`;


// let picurl = "https://api.teleport.org/api/urban_areas/slug:";
// let citypic = $("#city").val().toLowerCase() + "/images/";

// let urlpic = picurl + citypic;

$.get(url, function(data) {
$("#raw").html(JSON.stringify(data));
displayResults(data);
});

$.get(imageUrl, function(_links) {
$("#daw").html(JSON.stringify(_links));
displayResults2(_links);
});

}
