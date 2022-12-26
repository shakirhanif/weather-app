const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");

app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("home", { my_var: "this var" });
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
      const icon = my_data.weather[0].icon;
      const icon_url = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(
        "<h1>The temperature in " +
          city +
          " is (in Kelvin) " +
          my_data.main.temp +
          " </h1>"
      );
      res.write(
        "<p> the weather is like " + my_data.weather[0].description + "</p>"
      );
      res.write('<img src="' + icon_url + '" alt="">');
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("server started at 3000");
});
