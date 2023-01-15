const express = require("express");
const app = express();
const path = require("path");
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){

    res.sendFile(__dirname+"/index.html");
   
});

app.post("/", function(req,res){
    
    
    const query = req.body.cityName;
    const apiKey = "53703229825eaa96f8b8670a3927599b";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    
    
    https.get(url, function(response){
        console.log(response);
        console.log(response.statusCode);
        
        
       response.on("data", function(data){
        const WeatherData = JSON.parse(data)
        
        
        var n1 = WeatherData.main.temp
       const WeatherDescription = WeatherData.weather[0].description
       const icon = WeatherData.weather[0].icon
       const ImageUrl = "http://openweathermap.org/img/wn/"+  icon +"@2x.png"
       res.write("<h1>The temperature of " +query + " is " +n1 + "</h1>");
        res.write("<h2>The weather is currently "+WeatherDescription+ "</h2>");
        res.write("<img src = "+ImageUrl+">");
        
        
       
       
        res.send();

    
       })
    })
});


app.listen(3000, function(){
    console.log("server has started");
})