const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){

    res.sendFile(__dirname+"/index.html");
    
    });
    
    app.post("/", function(req, res){

        
//instead of writing the code inside the method, wiser to attach it to a const var.
const query = req.body.cityName
const appID = "0d2f1f5869ab7a048f6a60fb1d79aa54"
const unit = "metric"
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" +appID + "&units="+ unit

//https method to get url, and describe a response function from the API server. weather channel in this case.
https.get(url, function (response) {
    console.log(response.statusCode); //only logging the status code. possible to construct if statement here. 
    response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        console.log(weatherData);
        const temp = weatherData.main.temp
        const description = weatherData.weather[0].description
        const image = weatherData.weather[0].icon
        const imageUrl = "http://openweathermap.org/img/wn/" + image + "@2x.png"

        res.write("<p>The temperature in " + query + " is " + temp + " Celsius degrees <p>");
        res.write("<h1>and today you can see " + description + "</h1>");
        res.write("<img src=" + imageUrl + ">");

        res.send();
    });
});
});

app.listen(3000, function () {
    console.log("server is running on port 3000");
});
