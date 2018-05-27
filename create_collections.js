const fs = require("fs");
const bcrypt = require("bcryptjs");

const posts = JSON.parse(fs.readFileSync("./server/data/posts.json", "utf8"), (key, value) => {
  if (key === "createdAt") return new Date(value);
  return value;
});

const users = JSON.parse(fs.readFileSync("./server/data/users.json", "utf8"));

const mongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
mongoClient.connect(url, (err, client) => {
  const db = client.db("PostsDB");
  const collection = db.collection("posts");
  collection.insertMany(posts, (err, result) => {
    if (err) {
      return console.log(err);
    }
    console.log(result.ops);
    client.close();
  });
});

mongoClient.connect(url, (err, client) => {
  const db = client.db("PostsDB");
  const collection = db.collection("passwords");
  for (let i = 0; i < users.length; i++) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(users[i].password, salt, (err, hash) => {
        const newUser = {
          username: users[i].username,
          password: hash,
        };
        collection.insertOne(newUser, (err, result) => {
          if (err) {
            return console.log(err);
          }
          console.log(result.ops);
          client.close();
        });
      });
    });
  }
});
