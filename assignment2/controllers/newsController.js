const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.NEWS_API);
const redis = require("redis");
const redisPort = process.env.REDIS_PORT;
const client = redis.createClient(redisPort);
client.on("error", (err) => {
  console.log(err);
});
const newsController = {
  getNews: async (req, res) => {
    // To query /v2/top-headlines
    // All options passed to topHeadlines are optional, but you need to include at least one of them
    try {
      var searchKeyword = req.query.search || "bitcoin";
      client.get(searchKeyword, async (err, topNews) => {
        if (err) throw err;
        if (topNews) {
          res.status(200).send(JSON.parse(topNews));
        } else {
          var news = await newsapi.v2.topHeadlines({
            q: searchKeyword,
          });
          var arr = [];
          var item = {};
          var items = news.articles;
          for (var x = 0; x < news.totalResults; x++) {
            item = {
              headline: items[x].title,
              link: items[x].urlToImage,
            };
            arr[x] = item;
          }
          var newsResponse = {
            count: news.totalResults,
            data: arr,
          };
          client.setex("weather", 600, JSON.stringify(newsResponse));
          res.send(newsResponse);
        }
      });
    } catch (err) {
      res.send(err);
    }
  },
};
module.exports = newsController;
