const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  id: { type: String },
  descriprion: { type: String },
  createdAt: { type: Date, default: Date.now },
  author: { type: String },
  photoLink: { type: String },
  tag: [String],
  like: [String],
  delete: { type: String, default: "false" },
});

Posts = mongoose.model("posts", locationSchema);

module.exports = Posts;
