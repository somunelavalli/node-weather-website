const request = require("request");
const geocode = (location, callback) => {
  //   console.log("----1----" + location);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1Ijoic29tdW5lbGF2YWxsaSIsImEiOiJja3N5YXZhamQyaHByMnVtZHN0M3VzNHRyIn0.LvP-zrHvDRreXu7khE00_Q&limit=1`;
  //   console.log("----2----" + url);
  request({ url, json: true }, (error, { body }) => {
    //ES6 object destructuring and shorthand (response , url)
    if (error) {
      callback("Unable to caonnect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        long: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
