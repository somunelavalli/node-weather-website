const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();

// console.log(__dirname);
// console.log(__filename);

//Define Paths for Express Config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
//Setup static directory to serve
app.use(express.static(publicDirectory));

//From handle bar

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather Info",
    name: "Nelavalli",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Nelavalli",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Nelavalli",
    helpText: "This is Some helpful Text",
  });
});

// //app.com
// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to Home Page</h1>");
// });

// //app.com/help
// app.get("/help", (req, res) => {
//   res.send([{ name: "Somu Nelavalli" }, { name: "Sathi Nelavalli" }]);
// });

// //app.com/about
// app.get("/about", (req, res) => {
//   res.send("<h1>Welcom to About page</h1>");
// });

//app.com/weather
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide the location details",
    });
  }

  geocode(req.query.address, (error, { lat, long, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(lat, long, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      // console.log(forecastData, location, req.query.address);
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Nelavalli",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Nelavalli",
    errorMessage: "Page Not Found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port No 3000");
});
