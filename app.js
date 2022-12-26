const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");
require("dotenv").config();

app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

var myCity = "";
var myCountry = "";
var myTemp = "";
var myTempMin = "";
var myTempMax = "";
var myIcon = "";
var weatherDesc = "";
var today = new Date();
var options = {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
};
var day = today.toLocaleDateString("en-US", options);

app.get("/", function (req, res) {
  res.render("home", {
    myCity,
    myCountry,
    myIcon,
    myTemp,
    myTempMax,
    myTempMin,
    weatherDesc,
    day,
  });
});

app.post("/", function (req, res) {
  const api_key = "64ad822abb95aa9b3e16c4c272d33645";
  const city = req.body.cityname;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    api_key;
  https.get(url, function (response) {
    response.on("data", function (data) {
      var my_data = process.stdout.write(data);
      var my_data = JSON.parse(data);
      // console.log(req.body.cityname);
      // console.log(my_data.main.temp);
      // console.log(my_data.weather[0].description);
      // console.log(my_data.sys.country);
      // console.log(my_data.name);
      try {
        const icon = my_data.weather[0].icon;
        const icon_url = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        // res.write(
        //   "<h1>The temperature in " +
        //     city +
        //     " is (in Kelvin) " +
        //     my_data.main.temp +
        //     " </h1>"
        // );
        // res.write(
        //   "<p> the weather is like " + my_data.weather[0].description + "</p>"
        // );
        // res.write('<img src="' + icon_url + '" alt="">');
        myCity = my_data.name;
        myCountry = my_data.sys.country;
        myTemp = Math.floor(my_data.main.temp - 273);
        myTempMax = Math.floor(my_data.main.temp_max - 273);
        myTempMin = Math.floor(my_data.main.temp_min - 273);
        weatherDesc = my_data.weather[0].description;
        myIcon = icon_url;
        res.redirect("/");
      } catch (error) {
        myCity = "Please Enter Correct City Name";
        myCountry = "";
        res.redirect("/");
      }
    });
  });
});

app.listen(3000, function () {
  console.log("server started at 3000");
});
