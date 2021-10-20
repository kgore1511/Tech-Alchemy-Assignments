const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.SERVER_PORT;
var app = express();
app.use(express.json());
app.use("/user", require("./routes/userRouter"));
app.use(require("./routes/newsRouter"));
app.use(require("./routes/weatherRouter"));
mongoose.connect(
  process.env.URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
  }
);

app.listen(port, () => {
  console.log("server is running on port " + port);
});

module.exports = app;
