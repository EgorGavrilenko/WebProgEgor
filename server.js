const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const db = require("./config/db");
const POSTS = require("./config/PostsSchema");

const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("./passport");

app.use(cookieParser());
app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/getAllPosts", (req, res) => {
  POSTS.find((err, Posts) => {
    if (err) throw err;
    res.send(Posts);
  });
});

// const posts = JSON.parse(fs.readFileSync("./server/data/posts.json", "utf8"), (key, value) => {
//   if (key === "createdAt") return new Date(value);
//   return value;
// });

// console.log(posts);


function getSelectTimePeriod(time) {
  if (time === "last 24 hour") {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d;
  }
  if (time === "last week") {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d;
  }
  if (time === "last month") {
    const d = new Date();
    d.setMonth(d.getMonth() - 1);
    return d;
  }
  if (time === "last year") {
    const d = new Date();
    d.setMonth(d.getMonth() - 12);
    return d;
  }
}

app.get('/getPosts', (req, res) => {
  POSTS.count({},function(err,c){
    if(err){res.status(404).end();
      return;}
  let skip, top;
  if (req.query.skip !== undefined) {
    skip = req.query.skip;
  } else {
    skip = 0;
  }
  if (req.query.top !== undefined) {
    top = req.query.top;
  } else {
    top = posts.length;
  }
  if (skip > c) {
    res.status(404).end();
    return;
  }

  let arr = [],
    array = [];
  if (req.query.filterConfig !== undefined) {
    let filterConfig = {};
    if (req.query.filterConfig['author'] !== undefined)
      filterConfig.author = req.query.filterConfig['author'];
    if (req.query.filterConfig['createdAt'] !== undefined)
      filterConfig.createdAt = req.query.filterConfig['createdAt'];
    if (req.query.filterConfig['tag'] !== undefined) {
      filterConfig.tag = [];
      let i = 0;
      while (req.query.filterConfig['tag'][i] != undefined) {
        filterConfig.tag.push(req.query.filterConfig['tag'][i]);
        i++;
      }
    }

    POSTS.find({},function (err,PostsArray) {
      if(err){res.status(404).end();
        return;}
    arr = PostsArray.filter(function(val) {
      if (typeof filterConfig === 'object') {
        if ('author' in filterConfig) {
          if (!(filterConfig['author'] === val['author'])) return false;
        }
        if ('createdAt' in filterConfig) {
          if (
            !(
              Date.parse(val['createdAt']) >
              Date.parse(getSelectTimePeriod(filterConfig['createdAt']))
            )
          )
            return false;
        }
        if ('tag' in filterConfig) {
          if (filterConfig['tag'] instanceof Array) {
            let bool = false;
            for (let i = 0; i < filterConfig['tag'].length; i++) {
              for (let j = 0; j < val['tag'].length; j++) {
                if (val['tag'][j] === filterConfig['tag'][i]) bool = true;
              }
            }
            if (!bool) return false;
          } else {
            let bool = false;
            for (let i = 0; i < val['tag'].length; i++) {
              if (val['tag'][i] === filterConfig['tag']) bool = true;
            }
            if (!bool) return false;
          }
        }
      }
      if (val['delete'] === 'true') {
        return false;
      } else return true;
    });

    for (let i = skip, j = 0; i < arr.length && j < top; i++, j++) {
      array[j] = arr[i];
    }
    res.json(array);
    });
  } else {
    POSTS.find({},function (err,PostsArray) {
      if(err){res.status(404).end();
        return;}
      for (let i = skip, j = 0; i < c && j < top; i++)
      if (PostsArray[i]['delete'] === 'false') {
        array[j] = PostsArray[i];
        j++;
      } 
      res.json(array);
    });
  }
 
});
});

app.post("/getPost", (req, res) => {
  POSTS.findOne({ id: req.query.id }, (err, Post) => {
    if (err) {
      res.status(404).end();
      return;
    }
  res.json(Post);
  });
});

app.post("/addPost", (req, res) => {
  const p = {};
  if (req.query.photoLink !== undefined) {
    p.photoLink = `photo/${req.query.photoLink}`;
  } else {
    res.status(404).end();
    return;
  }
  if (req.query.author !== undefined) {
    p.author = req.query.author;
  } else {
    res.status(404).end();
    return;
  }
  if (req.query.descriprion !== undefined) {
    p.descriprion = req.query.descriprion;
  } else {
    p.descriprion = "";
  }
  p.tag = [];
  if (req.query.tag !== undefined) {
    let i = 0;
    while (req.query.tag[i] !== undefined) {
      p.tag.push(req.query.tag[i]);
      i++;
    }
  }
  p.createdAt = new Date();
  p.like = [];

  const stream = fs.createWriteStream(`./public/${p.photoLink}`);
  req.pipe(stream);
  stream.on("end", () => res.end());
  stream.on("error", err => console.log(err.message));
  POSTS.count((err, c) => {
    p.id = String(c + 1);
    POSTS.create(
      {
        id: p.id,
        descriprion: p.descriprion,
        createdAt: p.createdAt,
        author: p.author,
        photoLink: p.photoLink,
        tag: p.tag,
        like: p.like,
      },
      (err, Post) => {
        if (err) {
          res.status(404).end();
          return;
        }
        POSTS.findOne({ id: p.id }, (err, Post) => {
          if (err) {
            res.status(404).end();
            return;
          }
          console.log(`${p.author} add new post`);
          res.json(Post);
        });
      },
    );
  });
});

app.delete("/deletePost", (req, res) => {
  POSTS.findOneAndUpdate({ id: req.query.id }, { delete: "true" }, (err, Post) => {
    if (err) {
      res.status(404).end();
    }
    console.log(`${Post.author} delete post`);
    res.json(Post);
  });
});

app.put("/editPost", (req, res) => {
  p = {};
  if (req.query.descriprion !== undefined) {
    p.descriprion = req.query.descriprion;
  }
  if (req.query.tag !== undefined) {
    p.tag = [];
    let i = 0;
    while (req.query.tag[i] !== undefined) {
      p.tag.push(req.query.tag[i]);
      i++;
    }
  }
  p.createdAt = new Date();
  p.like = [];
  POSTS.findOneAndUpdate({ id: req.query.id }, p, (err, Post) => {
    if (err) {
      res.status(404).end();
      return;
    }
    console.log(`${Post.author} edit post`);
    res.json(Post);
  });
});



app.put("/addlike", (req, res) => {
  POSTS.findOneAndUpdate({ id: req.query.id }, { $push: { like: req.query.user } }, (err, Post) => {
    if (err) {
      res.status(404).end();
      return;
    }
    res.json(Post);
  });
});

app.put("/removelike", (req, res) => {
  POSTS.findOneAndUpdate({ id: req.query.id }, { $pull: { like: req.query.user } }, (err, Post) => {
    if (err) {
      res.status(404).end();
      return;
    }
    res.json(Post);
  });
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  console.log(`${req.user.username}  entered`);
  res.send(req.user.username);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).end();
}

app.get("/login", ensureAuthenticated, (req, res) => {
  res.send(req.user.username);
});

app.get("/logout", (req, res) => {
  console.log(`${req.user.username}  came out`);
  req.logout();
  res.end();
});

app.listen("3000", () => {
  console.log("Server is running");
});
