const request = require("request");
const forecast = (lat, long, callback) => {
  //   console.log("----1---" + lat, long);
  const url = `http://api.weatherstack.com/current?access_key=cd8633f21465bd45ab3235c89c701743&query=${lat},${long}&units=m`;
  //   console.log("----2---" + url);
  request({ url, json: true }, (error, { body }) => {
    //ES6 object destructuring and shorthand (response , url)
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (body.error) {
      callback(`${response.body.error.info}`, undefined);
    } else {
      callback(
        undefined,

        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degreesout`
      );
    }
  });
};

module.exports = forecast;
