
const express = require ("express")
const https = require('https');
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html")
})

app.post("/",function(req,res){
  var query= req.body.input1
  const apiKey="20b2bb44416c2236f1942a8505ce38d8"
  const units= "metric"

  const url =" https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units
    https.get(url, function(response){
      response.on("data",function(data){
      weatherData= JSON.parse(data)
      // wheather=JSON.stringify(wheatherData)
      const temp=weatherData.main.temp
      const description=weatherData.weather[0].description
      const icon=weatherData.weather[0].icon
      
      res.write("<h1>The temperature in "+query+" is "+temp+" degrees calcius </h1>")
      res.write("<h1>The weather is currenty "+description+"</h1>")
      res.write('<img src="https://openweathermap.org/img/wn/'+ icon +'@2x.png">');
      
      
      
      })
   
  
  })


})
app.listen(3000,function(){
    console.log("server is running on port 3000")
})



