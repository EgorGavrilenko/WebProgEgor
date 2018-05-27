const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  username: String,
  password: String,
});

Passwords = mongoose.model("passwords", locationSchema);

module.exports = Passwords;
