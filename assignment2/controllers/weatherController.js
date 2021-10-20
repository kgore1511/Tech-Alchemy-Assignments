const request = require("request");
const redis = require("redis");
const redisPort = process.env.REDIS_PORT;
const client = redis.createClient(redisPort);
var moment = require("moment");
client.on("error", (err) => {
  console.log(err);
});

const weatherController = {
  getWeather: async (req, res) => {
    var url = process.env.WEATHER_API;

    client.get("weather", async (err, weather) => {
      if (err) throw err;
      if (weather) {
        res.status(200).send(JSON.parse(weather));
      } else {
        request(url, function (error, response, body) {
          if (error) res.send(error.message);
          var data = JSON.parse(body);

          var arr = [];
          var json = {};

          for (var x = 1; x < data.list.length; x++) {
            d1 = new Date(data.list[x - 1].dt_txt);
            var d2 = new Date(data.list[x].dt_txt);
            if (d1.getDate() != d2.getDate()) {
              json = {
                date: moment(d2).format("ddd MMMM DD YYYY"),
                main: data.list[x].weather[0].main,
                temp: data.list[x].main.temp,
              };
              arr.push(json);
              d1 = d2;
            }
          }
          var weatherResponse = {
            count: arr.length,
            unit: "metic",
            location: "Indore",
            data: arr,
          };
          client.setex("weather", 600, JSON.stringify(weatherResponse));
          res.send(weatherResponse);
        });
      }
    });
  },
};
module.exports = weatherController;
