const router = require("express").Router();
const newsController = require("../controllers/newsController");
const auth = require("../middleware/auth");
router.get("/news", auth, newsController.getNews);
module.exports = router;
