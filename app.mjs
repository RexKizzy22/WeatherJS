// Import npm modules
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import ejs from "ejs";
import ejsLint from "ejs-lint";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
// Set EJS to use the async keyword
ejsLint("home", {async: true});

// Get weather function
async function getWeather(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.KEY}&units=imperial`
  );

  const responseData = await response.json();

  return responseData;
}

app.get("/", (req, res) => {
  const firstCity = "Lagos";
  // Get weather data
  getWeather(firstCity)
    .then(result => {
      res.render("home", {result: result});
    })
    .catch(err => console.log(err));

});

app.post("/", (req, res) => {
  // Get new city
  const newCity = req.body.changeCity;
  console.log(newCity);
  // Get weather data
  getWeather(newCity)
    .then(result => {
      res.render("home", {result: result});
    })
    .catch(err => console.log(err));
});


app.listen(3000, () => {
  console.log("Successfully running on port 3000");
});
