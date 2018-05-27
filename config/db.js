const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/PostsDB", (err, database) => {
  if (err) {
    return console.log(err);
  }
  console.log("mongodb is working");
});

module.exports = mongoose;
